import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Static pages rendered from markdown. Drop a new .md file in
 * src/content/pages/ and it appears on the site and in the nav
 * automatically (set `nav: false` in frontmatter to hide it).
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    nav_title: z.string().optional(),
    nav: z.boolean().default(true),
  }),
});

/**
 * Homepage sections. One markdown file per section in src/content/home/;
 * which ones are shown, and in which order, is set in config.yaml
 * (home.sections).
 */
const home = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home' }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

/**
 * Open positions (internships, PhD, postdocs). One markdown file per
 * offer in src/content/positions/. The body is the full job offer.
 * Set `status: filled` to move an offer to the archive.
 */
const positions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/positions' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['internship', 'phd', 'postdoc']),
    status: z.enum(['open', 'filled']).default('open'),
    location: z.string().optional(),
    laboratory: z.string().optional(),
    duration: z.string().optional(),
    start: z.string().optional(),
    deadline: z.string().optional(),
    contact: z.string().optional(),
    contact_url: z.string().optional(),
    summary: z.string().optional(),
    files: z.array(z.string()).default([]),
  }),
});

export const collections = { pages, home, positions };
