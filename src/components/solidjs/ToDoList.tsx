import { createSignal, createEffect } from "solid-js";

export default function ToDoList() {
  const [todos, setTodos] = createSignal<string[]>([]);

  createEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(todos);
  });

  return (
    <div class="flex flex-col bg-neutral-800 rounded border border-neutral-700 p-3 items-center justify-center">
      <div class="flex flex-col gap-3 items-center justify-center w-full">
        <input
          class="w-full p-3 rounded border border-neutral-700 bg-neutral-900 text-neutral-100"
          type="text"
          placeholder="Add a new to do (press enter to add)"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              const current = e.currentTarget as HTMLInputElement;
              setTodos([...todos(), current.value]);
              localStorage.setItem("todos", JSON.stringify(todos()));
              e.currentTarget.value = "";
            }
          }}
        />
        {todos().length !== 0 && (
          <div class="flex flex-col gap-3 items-center justify-center w-full">
            {todos().map((todo) => (
              <div class="flex justify-between w-full items-center p-3 not-prose bg-neutral-900 rounded border-neutral-700 border">
                <p class="pl-2">{todo}</p>
                <button
                  class="hover:bg-opacity-50 transition bg-neutral-800 border-neutral-700 rounded border px-4 py-1"
                  onClick={() => {
                    setTodos(todos().filter((t) => t !== todo));
                    localStorage.setItem("todos", JSON.stringify(todos()));
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
