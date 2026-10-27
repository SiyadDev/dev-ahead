import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const issues = defineCollection({
  // FIXTURE=worst swaps in worst-case issues for stress-testing the layout locally.
  loader: glob({
    pattern: '*.md',
    base: process.env.FIXTURE === 'worst' ? './src/content/fixtures/worst' : './src/content/issues',
  }),
  schema: z.object({
    title: z.string(),
    issue: z.number().int().positive(),
    date: z.coerce.date(),
    window: z.string(),
    summary: z.string(),
    // dev.to accepts at most 4 lowercase alphanumeric tags.
    tags: z.array(z.string().regex(/^[a-z0-9]+$/)).max(4).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { issues };
