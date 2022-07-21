import { HandlerContext } from "$fresh/server.ts";

const quotes = [
  "Balanced. As all things should be.",
  "Inner peace is what you should always consider seeking.",
  "Do what you want and do it well.",
  "Keep it simple, stupid.",
  "Hail to the chaos banner!",
  "Bow before the god of chaos.",
  "Change is about acceptance, not ignorance towards past.",
  "We all commit crimes. It's the intention that differs."
];

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const randomIndex = Math.floor(Math.random() * 8);
  const body = quotes[randomIndex];
  return new Response(JSON.stringify(body));
};
