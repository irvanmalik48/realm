import type { APIContext } from "astro";

export async function get({ request }: APIContext) {
  const url = new URL(request.url);

  const sizeParams = url.searchParams.get("size");
  const includeSpecialChars = url.searchParams.has("special");
  
  if (!sizeParams) {
    return new Response("I'm a teapot", {
      status: 418,
      statusText: "I'm a teapot",
      headers: { "content-type": "text/plain" },
    });
  }
  
  const size = parseInt(sizeParams!);

  if (isNaN(size)) {
    return new Response("I'm a teapot", {
      status: 418,
      statusText: "I'm a teapot",
      headers: { "content-type": "text/plain" },
    });
  }

  if (size < 6 || size > 512) {
    return new Response("I'm a teapot", {
      status: 418,
      statusText: "I'm a teapot",
      headers: { "content-type": "text/plain" },
    });
  }

  let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  
  if (includeSpecialChars) {
    charset += "!@#$%&*()_+~|?,./-=";
  }

  for (let i = 0; i < size; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  const res = {
    password: password,
    generatedAt: new Date(),
  }

  return new Response(JSON.stringify(res), {
    status: 200,
    statusText: "OK",
    headers: { "content-type": "text/plain" },
  });
}
