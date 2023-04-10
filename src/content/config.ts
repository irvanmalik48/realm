import { z, defineCollection } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

const lyrics = defineCollection({
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    date: z.string(),
  }),
});

const diaries = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  posts: posts,
  lyrics: lyrics,
  diaries: diaries,
};
