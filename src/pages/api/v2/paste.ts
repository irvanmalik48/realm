import type { APIContext } from "astro";
import conn from "../../../db/conn";
import { nanoid } from "nanoid";

export async function post({ request }: APIContext) {
  const body = await request.json();
  const { content, lang } = body;
  const id = nanoid(10);

  const { data, error } = await conn
    .from("paste")
    .insert({
      id,
      content,
      lang,
    })
    .select();

  if (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: "Internal Server Error",
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 201,
    statusText: "Created",
    headers: { "content-type": "application/json" },
  });
}

export async function get({ request }: APIContext) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("I'm a teapot", {
      status: 418,
      statusText: "I'm a teapot",
      headers: { "content-type": "text/plain" },
    });
  }

  const { data, error } = await conn.from("paste").select().eq("id", id);

  if (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: "Internal Server Error",
      headers: { "content-type": "application/json" },
    });
  }

  if (!data) {
    return new Response("Not found", {
      status: 404,
      statusText: "Not found",
      headers: { "content-type": "text/plain" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    statusText: "OK",
    headers: { "content-type": "application/json" },
  });
}
