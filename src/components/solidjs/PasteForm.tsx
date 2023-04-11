import { createSignal } from "solid-js";

const supportedLanguages = [
  { name: "Bash", value: "bash" },
  { name: "C", value: "c" },
  { name: "C++", value: "cpp" },
  { name: "C#", value: "cs" },
  { name: "CSS", value: "css" },
  { name: "Diff", value: "diff" },
  { name: "Go", value: "go" },
  { name: "HTML", value: "html" },
  { name: "Java", value: "java" },
  { name: "JavaScript", value: "javascript" },
  { name: "JSX", value: "jsx" },
  { name: "JSON", value: "json" },
  { name: "Kotlin", value: "kotlin" },
  { name: "Markdown", value: "markdown" },
  { name: "PHP", value: "php" },
  { name: "Python", value: "python" },
  { name: "Ruby", value: "ruby" },
  { name: "Rust", value: "rust" },
  { name: "SQL", value: "sql" },
  { name: "Swift", value: "swift" },
  { name: "TypeScript", value: "typescript" },
  { name: "TSX", value: "tsx" },
  { name: "XML", value: "xml" },
];

export default function PasteForm(props: { url: string }) {
  const [pasteValue, setPasteValue] = createSignal("");
  const [pasteLanguage, setPasteLanguage] = createSignal("");
  const [pasteLink, setPasteLink] = createSignal<string | undefined>(undefined);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const paste = document.getElementById("paste") as HTMLTextAreaElement;
    const language = document.getElementById("language") as HTMLSelectElement;

    setPasteValue(paste.value);
    setPasteLanguage(language.value);

    const pasteData = {
      content: pasteValue(),
      lang: pasteLanguage(),
    };

    const jsonPasteData = JSON.stringify(pasteData);

    const response = await fetch("/api/v2/paste", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonPasteData,
    });

    console.log(response);

    const data = await response.json();

    setPasteLink(`${props.url}/${data[0].id}`);
  };

  return (
    <div class="p-4 bg-neutral-800 rounded border border-neutral-700 not-prose flex flex-col gap-5">
      <div class="border border-neutral-700 p-3 rounded">
        <label for="link" class="text-neutral-100">
          Paste Link
        </label>
        <div class="w-full flex gap-3">
          <pre
            class="w-full bg-neutral-900 border border-neutral-700 px-4 py-2 rounded"
            id="link"
          >
            <a href={pasteLink() ?? "#"} class="w-full block text-center">
              {pasteLink() ?? "Your link will appear here"}
            </a>
          </pre>
          <button
            class="bg-neutral-900 border border-neutral-700 w-fit px-4 py-2 rounded bg-opacity-20 hover:bg-opacity-100 transition"
            onClick={() => {
              navigator.clipboard.writeText(pasteLink() ?? "");
            }}
          >
            Copy
          </button>
        </div>
      </div>
      <div class="border border-neutral-700 p-3 rounded">
        <label for="language" class="text-neutral-100">
          Language
        </label>
        <select
          class="bg-neutral-900 focus:ring-red-400 ring-transparent focus:outline-none ring-2 appearance-none border border-neutral-700 w-full px-4 py-2 rounded bg-opacity-20 hover:bg-opacity-100 transition"
          name="language"
          id="language"
        >
          <option value="">Select your option... (default: Plain Text)</option>
          {supportedLanguages.map((language) => (
            <option value={language.value}>{language.name}</option>
          ))}
        </select>
      </div>
      <textarea
        placeholder="Please copy your code here"
        style={{ "overflow-wrap": "normal" }}
        id="paste"
        name="paste"
        class="resize-none scrollbar-thin scrollbar-track-neutral-700 scrollbar-thumb-neutral-800 scrollbar-corner-neutral-700 whitespace-pre overflow-scroll w-full bg-neutral-900 rounded border border-neutral-700 px-4 py-2 transition min-h-[350px] focus:ring-red-400 ring-transparent focus:outline-none ring-2 font-mono"
      />
      <button
        class="bg-neutral-900 border border-neutral-700 w-full px-4 py-2 rounded bg-opacity-20 hover:bg-opacity-100 transition"
        type="submit"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
