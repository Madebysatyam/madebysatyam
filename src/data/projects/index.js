import { AURAL_PROJECT } from "./aural.js";

export const PROJECTS = [AURAL_PROJECT];

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug) ?? null;
}

export function getProjectCard(project) {
  return {
    id: project.id,
    href: `/projects/${project.slug}`,
    ...project.card,
  };
}
