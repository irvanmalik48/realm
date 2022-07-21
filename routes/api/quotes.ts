import { HandlerContext } from "$fresh/server.ts";

const quotes = [
  "Balanced. As all things should be.",
  "Inner peace is what you should always consider seeking.",
  "Do what you want and do it well.",
  "Keep it simple, stupid.",
  "Hail to the chaos banner!",
  "Change is about acceptance, not ignorance towards past.",
  "We all commit crimes. It's the intention that differs.",
  "This is why we can't have nice things",
  "PSD is not my favorite file format",
  "I'm not a web developer. I'm a retard."
];

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const randomIndex = Math.floor(Math.random() * 10);
  const body = quotes[randomIndex];
  return new Response(JSON.stringify(body));
};
