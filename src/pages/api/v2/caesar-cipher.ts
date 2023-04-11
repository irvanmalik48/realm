import type { APIContext } from "astro";

const uppercase = () =>
  [...Array(26)].map(
    (_n, i) => `${String.fromCharCode(i + "A".charCodeAt(0))}`
  );
const lowercase = () =>
  [...Array(26)].map(
    (_n, i) => `${String.fromCharCode(i + "a".charCodeAt(0))}`
  );

const mod = (a: any, b: any) => {
  const c = a % b;
  return c < 0 ? c + b : c;
};

const cipher = (array: any, shift: any) => {
  const cipher: any = {};
  array.forEach((value: any, index: any) => {
    cipher[value] = array[mod(index + shift, array.length)];
  });
  return cipher;
};

const caesarCipher = (shift: any) => {
  return {
    ...cipher(uppercase(), shift),
    ...cipher(lowercase(), shift),
  };
};

const processCharacter = (cipher: any, character: any) =>
  cipher.hasOwnProperty(character) ? cipher[character] : character;

const cipherText = (text: any, shift: any) => {
  const caesar = caesarCipher(shift);
  return [...text].map((c) => processCharacter(caesar, c)).join("");
};

export async function get({ request }: APIContext) {
  const url = new URL(request.url);

  if (!url.searchParams.has("text")) {
    return new Response("I'm a teapot", {
      status: 418,
      statusText: "I'm a teapot",
      headers: { "content-type": "text/plain" },
    });
  }

  const text = url.searchParams.get("text");

  const res = {
    cipher: cipherText(text, 13),
    generatedAt: new Date(),
  };

  return new Response(JSON.stringify(res), {
    status: 200,
    statusText: "OK",
    headers: { "content-type": "text/plain" },
  });
}
