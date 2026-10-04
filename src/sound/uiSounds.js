/**
 * Quiet interface sounds, synthesized in the browser.
 * Short clicks, horizontal-scroll ticks, a colour-wash swoosh, and sticker grab/drop.
 */

const PRESETS = {
  tap: {
    layers: [
      { kind: "noise", filter: "bandpass", frequency: 1680, q: 1.15, attack: 0.001, decay: 0.024, peak: 0.11 },
      { kind: "tone", wave: "sine", frequency: 740, attack: 0.002, decay: 0.045, peak: 0.04 },
    ],
  },
  lift: {
    layers: [
      { kind: "noise", filter: "bandpass", frequency: 2900, q: 1.4, attack: 0.001, decay: 0.018, peak: 0.07 },
      { kind: "tone", wave: "sine", frequency: 1180, attack: 0.003, decay: 0.07, peak: 0.045 },
    ],
  },
  tick: {
    layers: [
      { kind: "noise", filter: "bandpass", frequency: 4200, q: 2.1, attack: 0.001, decay: 0.012, peak: 0.07 },
      { kind: "tone", wave: "sine", frequency: 1480, attack: 0.001, decay: 0.028, peak: 0.028 },
    ],
  },
  arrive: {
    layers: [
      { kind: "noise", filter: "lowpass", frequency: 1400, q: 0.7, attack: 0.008, decay: 0.09, peak: 0.05 },
      { kind: "tone", wave: "sine", frequency: 392, glideTo: 588, glide: 0.12, attack: 0.01, decay: 0.16, peak: 0.045 },
      { kind: "tone", wave: "sine", frequency: 784, offset: 0.06, attack: 0.008, decay: 0.14, peak: 0.03 },
    ],
  },
  // Air wash timed to the 0.55s colour fill: body, a rising band, then a high hiss.
  // Peaks mid-sweep so it travels with the colour instead of clicking at the start.
  swoosh: {
    layers: [
      {
        kind: "noise",
        filter: "lowpass",
        frequency: 180,
        filterGlideTo: 980,
        glide: 0.4,
        q: 0.65,
        attack: 0.1,
        decay: 0.32,
        peak: 0.05,
      },
      {
        kind: "noise",
        filter: "bandpass",
        frequency: 480,
        filterGlideTo: 6200,
        glide: 0.52,
        q: 1.45,
        attack: 0.18,
        decay: 0.36,
        peak: 0.07,
      },
      {
        kind: "noise",
        filter: "highpass",
        frequency: 2200,
        filterGlideTo: 8600,
        glide: 0.46,
        q: 0.55,
        offset: 0.06,
        attack: 0.16,
        decay: 0.3,
        peak: 0.028,
      },
    ],
  },
  grab: {
    layers: [
      { kind: "noise", filter: "bandpass", frequency: 820, q: 0.85, attack: 0.004, decay: 0.07, peak: 0.09 },
      { kind: "tone", wave: "triangle", frequency: 210, glideTo: 460, glide: 0.08, attack: 0.004, decay: 0.11, peak: 0.055 },
    ],
  },
  drop: {
    layers: [
      { kind: "noise", filter: "lowpass", frequency: 640, q: 0.6, attack: 0.002, decay: 0.07, peak: 0.11 },
      { kind: "tone", wave: "sine", frequency: 360, glideTo: 130, glide: 0.1, attack: 0.002, decay: 0.12, peak: 0.05 },
    ],
  },
};

let context = null;
let master = null;
let noiseBuffer = null;
let primed = false;
let lastTickAt = 0;
let lastSwooshAt = 0;
let pendingSwooshAt = 0;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function noise() {
  if (noiseBuffer) return noiseBuffer;
  const seconds = 1;
  noiseBuffer = context.createBuffer(1, Math.floor(context.sampleRate * seconds), context.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

function getContext() {
  if (context) return context;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  context = new AudioCtx();
  master = context.createGain();
  master.gain.value = 0.42;

  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.knee.value = 10;
  compressor.ratio.value = 5;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.1;
  master.connect(compressor);
  compressor.connect(context.destination);
  return context;
}

function scheduleLayer(ctx, layer, when, amount) {
  const duration = (layer.offset ?? 0) + layer.attack + layer.decay + 0.05;
  const start = when + (layer.offset ?? 0);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, layer.peak * amount), start + layer.attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + layer.attack + layer.decay);
  gain.connect(master);

  if (layer.kind === "tone") {
    const osc = ctx.createOscillator();
    osc.type = layer.wave;
    osc.frequency.setValueAtTime(layer.frequency, start);
    if (layer.glideTo) {
      osc.frequency.exponentialRampToValueAtTime(layer.glideTo, start + (layer.glide ?? layer.decay));
    }
    osc.connect(gain);
    osc.start(start);
    osc.stop(start + duration);
    return;
  }

  const source = ctx.createBufferSource();
  source.buffer = noise();
  source.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = layer.filter;
  filter.frequency.setValueAtTime(layer.frequency, start);
  if (layer.filterGlideTo) {
    filter.frequency.exponentialRampToValueAtTime(layer.filterGlideTo, start + (layer.glide ?? layer.decay));
  }
  filter.Q.value = layer.q;
  source.connect(filter);
  filter.connect(gain);
  source.start(start);
  source.stop(start + duration);
}

export function primeUiSound() {
  if (prefersReducedMotion()) return;
  primed = true;
  const ctx = getContext();
  if (ctx?.state === "suspended") {
    void ctx.resume();
  }
  if (pendingSwooshAt && performance.now() - pendingSwooshAt < 700) {
    pendingSwooshAt = 0;
    playUiSound("swoosh", 0.9);
  }
}

export function playUiSound(name, amount = 1) {
  if (prefersReducedMotion()) return;
  if (!primed) {
    if (name === "swoosh") pendingSwooshAt = performance.now();
    return;
  }

  const preset = PRESETS[name];
  const ctx = getContext();
  if (!preset || !ctx) return;

  const now = performance.now();
  if (name === "tick") {
    if (now - lastTickAt < 48) return;
    lastTickAt = now;
  }
  if (name === "swoosh") {
    if (now - lastSwooshAt < 280) return;
    lastSwooshAt = now;
  }

  if (ctx.state === "suspended") {
    void ctx.resume();
  }

  const when = ctx.currentTime + 0.01;
  preset.layers.forEach((layer) => scheduleLayer(ctx, layer, when, amount));
}
