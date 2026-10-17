import 'dotenv/config'

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'

import config from './payload.config.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const repoRoot = path.resolve(dirname, '../..')

function readRepoFile(...parts: string[]) {
  return fs.readFileSync(path.join(repoRoot, ...parts), 'utf8')
}

export async function seed() {
  const payload = await getPayload({ config })

  const existingProjects = await payload.find({
    collection: 'projects',
    where: { slug: { equals: 'aural' } },
    limit: 1,
  })

  const auralMarkdown = readRepoFile('src/content/projects/aural.md')

  const auralData = {
    slug: 'aural',
    shortTitle: 'Aural',
    card: {
      tag: 'Design systems',
      role: 'Senior Product Designer',
      title: "Designing a sensory identity for the world's largest audio series platform",
      metricValue: '200M+',
      metricLabel: 'Users on platform',
      readTime: '18min read',
      shipped: 'Dec 2023 – ongoing',
    },
    page: {
      dek: "Designing a Sensory Identity for the World's Largest Audio Series Platform",
      lead:
        'When I joined Pocket FM in December 2023, the platform was already operating at extraordinary scale. More than 200 million users. Hundreds of thousands of hours of original audio content. A payment model pioneering a genuinely new form of entertainment consumption.',
      role: 'Senior Product Designer',
      company: 'Pocket FM',
      timeline: 'Dec 2023 - Jun 2024',
      scope: 'Multi-sensory design system, global design language',
      platformScale: '200M+ users, 200B+ minutes of listening',
      stats: [
        { label: 'Users', value: '200M+' },
        { label: 'Listening time', value: '200B minutes' },
        { label: 'Languages', value: '100+' },
        { label: 'Category', value: 'Audio series' },
      ],
    },
    bodyMarkdown: auralMarkdown,
    layout: [],
  }

  if (existingProjects.docs[0]) {
    await payload.update({
      collection: 'projects',
      id: existingProjects.docs[0].id,
      data: auralData,
    })
    console.log('Updated project: aural')
  } else {
    await payload.create({
      collection: 'projects',
      data: auralData,
    })
    console.log('Created project: aural')
  }

  const noteSlug = 'the-measure-of-a-line'
  const existingNotes = await payload.find({
    collection: 'notes',
    where: { slug: { equals: noteSlug } },
    limit: 1,
  })

  const noteData = {
    slug: noteSlug,
    title: 'The measure of a line',
    summary:
      'How many characters a line can hold before the eye loses its way back, and a meter for setting that width by hand.',
    date: '03.10.2026',
    category: 'essay' as const,
    sections: [
      {
        type: 'p' as const,
        text: 'A line is a length, not a decoration. Too long and the eye drops to the next row in the wrong place. Too short and the rhythm breaks into a stack of fragments. This note is a dummy, written so the page has something to reflow while the meter moves.',
      },
      {
        type: 'p' as const,
        text: 'The useful range sits somewhere near sixty-six characters. That is a habit from print, not a law. This page opens at eighty, which is already a wide line, and the meter will let you pull it out to one hundred. On a phone the column is already narrow, and the same sentence takes more lines. The meter is here so you can feel that change instead of only reading about it.',
      },
      {
        type: 'p' as const,
        text: 'A hundred characters is a long trip for the eye. The return from the end of the line to the start of the next one gets less reliable, and a heading that felt compact at eighty starts to look stranded. That is worth seeing once, which is why the scale goes that far, and why the essay is long enough to show it.',
      },
      { type: 'h2' as const, text: 'What the meter does' },
      {
        type: 'p' as const,
        text: 'Drag the mark at the right edge of the column, or the ruler above the text. The number is the width in characters of the zero in this face. The words stay where they are. Only the line endings move.',
      },
      {
        type: 'p' as const,
        text: 'Set it wide and the note reads like a page. Set it narrow and it reads like a margin note. Either way the sentences are the same ones, already on the page. Nothing is added when the column grows, and nothing is removed when it shrinks.',
      },
      { type: 'h2' as const, text: 'At the wide end' },
      {
        type: 'p' as const,
        text: 'Pull the measure toward one hundred and the paragraphs flatten. Lines hold more words than a comfortable glance can carry, and the gap between the start of one line and the start of the next becomes the thing you notice. Wide measure is useful for tables, code, and a proof that the column can actually get that wide. It is a poor place to leave an essay.',
      },
      {
        type: 'p' as const,
        text: 'Eighty is the resting width because it still feels like a page and not a banner. You can read a sentence without hunting for where it began. If you want the older print habit, drag back toward sixty-six and the same paragraphs pick up a quicker rhythm. The line endings change. The argument does not.',
      },
      { type: 'h2' as const, text: 'At the narrow end' },
      {
        type: 'p' as const,
        text: 'Take it down toward twenty and the essay becomes a stack. Words that sat together on one line now occupy three, and a heading wraps even when the thought is short. That is the other lesson of the meter: length is not only about comfort at the wide end. A column can also be so short that the sentence loses its shape.',
      },
      {
        type: 'p' as const,
        text: 'Between those ends is the work. Most of what I set for reading lives in that middle, close enough to sixty-six that the eye can return, wide enough that a paragraph does not shatter. Eighty is a step past that habit, on purpose, so the default already shows a longer line than the textbook measure.',
      },
      { type: 'h2' as const, text: 'What it leaves alone' },
      {
        type: 'p' as const,
        text: 'Nothing arrives late. The paragraph is already written. Changing the measure does not introduce the text, hide it, or send it down the page word by word. It only decides how far each line is allowed to run.',
      },
      {
        type: 'p' as const,
        text: 'A blog page is mostly this: a title, a date, and a column of type. The rest of the site can stay sharp and quiet. This page is the place where the column itself is the control. Leave it at eighty, or take it to one hundred and watch the same words occupy fewer lines. Then bring it back. The essay will still be the one you started.',
      },
    ],
  }

  if (existingNotes.docs[0]) {
    await payload.update({
      collection: 'notes',
      id: existingNotes.docs[0].id,
      data: noteData,
    })
    console.log(`Updated note: ${noteSlug}`)
  } else {
    await payload.create({
      collection: 'notes',
      data: noteData,
    })
    console.log(`Created note: ${noteSlug}`)
  }

  const listingNotes = [
    {
      slug: 'habit-loops',
      title: 'On habit loops and listener rituals',
      summary:
        'How repeated listening turns a product into a daily ritual, and what the interface should get out of the way.',
      date: '00.00.0000',
      category: 'essay' as const,
      sections: [],
    },
    {
      slug: 'design-systems',
      title: 'What a design system owes the next designer',
      summary:
        'The parts a system has to leave behind so the next person can extend it without starting over.',
      date: '00.00.0000',
      category: 'systems' as const,
      sections: [],
    },
    {
      slug: 'motion-restraint',
      title: 'Motion with restraint on product surfaces',
      summary:
        'Where motion earns its place on a product surface, and where a still frame is the clearer choice.',
      date: '00.00.0000',
      category: 'process' as const,
      sections: [],
    },
    {
      slug: 'handoff',
      title: 'Handoff notes that survive the first sprint',
      summary:
        'Notes written so engineering can ship the first sprint without guessing what the design meant.',
      date: '00.00.0000',
      category: 'product' as const,
      sections: [],
    },
  ]

  for (const note of listingNotes) {
    const existing = await payload.find({
      collection: 'notes',
      where: { slug: { equals: note.slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({ collection: 'notes', id: existing.docs[0].id, data: note })
      console.log(`Updated note: ${note.slug}`)
    } else {
      await payload.create({ collection: 'notes', data: note })
      console.log(`Created note: ${note.slug}`)
    }
  }

  const playgroundItems = [
    { title: 'Motion study 01', date: '00.00.0000', featured: true },
    { title: 'Type ramp test', date: '00.00.0000', featured: true },
    { title: 'Shader grid', date: '00.00.0000', featured: true },
    { title: 'Layout generator', date: '00.00.0000', featured: true },
    { title: 'Palette stress test', date: '00.00.0000', featured: false },
    { title: 'Icon grid explorer', date: '00.00.0000', featured: false },
    { title: 'Scroll choreography', date: '00.00.0000', featured: false },
    { title: 'Prototype shell', date: '00.00.0000', featured: false },
  ]

  const existingPlayground = await payload.find({ collection: 'playground', limit: 100 })
  if (existingPlayground.docs.length === 0) {
    for (const item of playgroundItems) {
      await payload.create({ collection: 'playground', data: item })
      console.log(`Created playground: ${item.title}`)
    }
  } else {
    console.log(`Skipped playground seed (${existingPlayground.docs.length} items already exist)`)
  }

  const testimonials = [
    {
      name: 'Niteesh Yadav',
      role: 'AVP of design Pocket FM | Ex',
      logoAlt: 'Meta',
      logoLayout: 'mark' as const,
      quote:
        'Satyam’s exceptional contributions to the design system have truly set him apart. Satyam’s proactive collaboration with developers to resolve issues, along with his independent initiatives to enhance the quality of design within our team, demonstrate his commitment to excellence. He consistently upholds visual and overall experience benchmarks across all his work, making a significant impact on our projects.',
    },
    {
      name: 'Neeru Yadav',
      role: 'Senior product designer Pocket FM | Ex',
      logoAlt: 'Loop Health',
      logoLayout: 'wordmark' as const,
      quote:
        'Satyam played a key role in the Android revamp, showing strong ownership and proactive problem-solving across both flow-level and system-level issues. He was highly responsive, often joining calls to unblock teams in real time. His ability to quickly align context and drive solutions improved both execution speed and overall quality.',
    },
    {
      name: 'Divya Bhatia',
      role: 'Lead product designer Pocket FM | Ex',
      logoAlt: 'Ola Electric',
      logoLayout: 'wordmark' as const,
      quote:
        'Kudos to Satyam for handling stuff proactively and getting up-to-speed so quickly. It feels so amazing to have been surrounded by such enthusiastic designers.',
    },
  ]

  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 100 })
  if (existingTestimonials.docs.length === 0) {
    for (const item of testimonials) {
      await payload.create({ collection: 'testimonials', data: item })
      console.log(`Created testimonial: ${item.name}`)
    }
  } else {
    console.log(
      `Skipped testimonials seed (${existingTestimonials.docs.length} items already exist)`,
    )
  }

  await payload.updateGlobal({
    slug: 'about',
    data: {
      story: [
        { text: 'I started with my hands.' },
        {
          text: 'Sketching, painting, illustrations. Making things before I understood why making things mattered. Freelance work came next, pitch decks and marketing assets, digital work that paid but did not yet ask the most interesting question: what does the person on the other end actually do with this?',
        },
        {
          text: 'Product design answered that question. Not perfectly, but honestly. It put me in the same room as the people I was designing for and showed me the gap between what I intended and what they actually did. That gap never gets smaller. It just gets more interesting.',
        },
        {
          text: 'I have designed features that shipped cleanly and got used in ways I never anticipated. I have watched people navigate screens I spent weeks on and find paths I did not know existed. Observation is still the sharpest tool I have. Not research as a phase in a process. Observation as a permanent condition of paying attention.',
        },
      ],
      beliefs: [
        {
          title: 'Earn your place',
          accent: 'orange',
          body: 'Every element on a screen has to justify its existence. If it is not doing something real for the person using it, it is decoration. Knowing when to stop is as important as knowing what to add.',
        },
        {
          title: 'Read the gap',
          accent: 'pink',
          body: 'The most useful thing I do is observe the distance between what I designed and what people actually do. That gap is where the real design problem lives. It never fully closes. It just gets more specific.',
        },
        {
          title: 'Own the outcome',
          accent: 'teal',
          body: 'Design does not end at the handoff. It ends when you know whether the thing you built actually worked. I am not interested in delivering screens. I am interested in whether the problem got solved.',
        },
        {
          title: 'Meaning over mechanics',
          accent: 'purple',
          body: 'People do not return to a product for what it gives them. They return for what it means to them. I design for that deeper reason, not the surface one.',
        },
      ],
      experience: [
        {
          company: 'Pocket FM',
          roles: [
            {
              role: 'Senior Product Designer',
              duration: 'Apr 2025 - Present',
              isCurrent: true,
              note: 'Shipped two experiments to full rollout with measurable impact. Pocket Blockbuster for You drove +5% new LDAU shows, +3% activated shows and +2% playtime in the USA. The Unified Streaks experience delivered +10.89% LDAU days and +9.15% playtime in the USA, with +5.11% LDAU days in India and positive ARPU movement in both markets.',
            },
            {
              role: 'Product Designer',
              duration: 'Dec 2023 - Apr 2025',
              note: 'Helped shape the Aural Design System, a 125+ component library that gave the product a distinct identity. Contributed to Pocket Toons, which crossed 10K downloads in three months, and worked on features that drove up to 4% conversion growth and 3% ARPU uplift across India and the US.',
            },
          ],
        },
        {
          company: 'Hubilo',
          roles: [
            {
              role: 'Product Designer',
              duration: 'Jan 2023 - Dec 2023',
              note: 'Designed Hubilo Broadcast Studio 3.0 from the ground up, creating seamless experiences for organizers, speakers and attendees in real-time virtual sessions. Drove a 40.49% increase in adoption across webinars, virtual and hybrid events through research-led, user-centered design.',
            },
            {
              role: 'Associate Product Designer',
              duration: 'Jan 2022 - Jan 2023',
              note: 'Improved login and onboarding flows across virtual and hybrid event experiences to drive users toward the pricing page, balancing product-led growth with business impact.',
            },
          ],
        },
      ],
      awards: [
        {
          company: 'Pocket Star',
          duration: 'Dec 2025',
          badgeAlt: 'Pocket Star award badge',
        },
        {
          company: 'High Achiever',
          duration: 'Sept 2024',
          badgeAlt: 'High Achiever award badge',
        },
      ],
      closing: [
        {
          text: 'A team that believes designers are not the execution layer. A problem that is genuinely hard. An environment where the question is never “did design deliver the screens” but always “did we build the right thing.”',
        },
        { text: "If that sounds like where you are, let's talk." },
      ],
    },
  })
  console.log('Updated about page')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      footer: {
        email: 'shekharsinha.satyam61@gmail.com',
        status: 'Available for the right problem',
        response: 'Under 24 hours',
        based: 'Bengaluru, IN',
      },
    },
  })
  console.log('Updated site settings')
  console.log('Seed complete.')
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === filename

if (isDirectRun) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
