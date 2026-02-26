import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { z } from "astro:schema";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      category: z.string().optional(),
      draft: z.boolean().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/portfolio" }),
  schema: ({ image }) => z.object({
    id: z.string(),
    image: image().optional(),
    title: z.string(),
    description: z.string(),
    fullDescription: z.string(),
    tags: z.array(z.string()),
    link: z.string().optional(),
    github: z.string().optional(),
    year: z.string(),
    features: z.array(z.string()),
  }),
});

export const collections = { blog, portfolio };
