---
title: "Implementing Blog Posts in Qwik"
publishDate: "21 Jul 2023"
description: "A documentary on how I add a blog post section in Qwik City."
tags: ["programming"]
---

## Abstract

Qwik is a pretty neat framework, yes. It sets up a new standard towards web development with its one-of-a-kind state-of-the-art resumability concept, allowing it to avoid any hydration by default as it just merely resume stuffs from the server (read more on their docs).

Even if it's good tho, I find it pretty hard for me to find references on how can I do something like automatic blog posts indexing (cause there's almost nothing, really). So, I decided to make one myself. It's not really that hard to do in Qwik and they, surprisingly, has some neat stuffs that can help us to do this.

> The code I'm about to show is 100% Vercel Edge Runtime compatible. It will work flawlessly on any kind of deployment integration you prefer. And do mind you that it is fast, really fast.

## Globbing the Posts

So first off, let me set some rules here before I start doing this. I want to make a blog post indexing that:

1. Requires me to strictly avoid using any kind of `node` dependencies including `fs` (Vercel Edge Runtime, yes).
2. Allows me to alleviate Qwik City's MDX native integration to the fullest.
3. Doesn't require me to do any kind of manual indexing (of course, what do you expect?).
4. Has a searching capability. In fact, I want to make it as fast as possible.
5. Can differentiate between draft and published posts and show/hide them correctly across environments.

So, to glob all the post metadata, we need to use `import.meta.glob`. This is actually a Vite feature that allows you to import multiple modules via a single line function call. To demonstrate, here's how it works:

```ts
const modules = import.meta.glob("./some-folder/*.ts");
```

Vite will return the modules import like this:

```js
const modules = {
	"./some-folder/one.js": () => import("./some-folder/one.js"),
	"./some-folder/two.js": () => import("./some-folder/two.js"),
	"./some-folder/three.js": () => import("./some-folder/three.js"),
	"./some-folder/four.js": () => import("./some-folder/four.js"),
	/* and so on and so forth */
};
```

### Making the asynchronous mapper

Alright, let's just cut the chase and start globbing the posts. First, I'm going to make an asynchronous mapping function. "Why?" you asked. See, glob meta imports provided by Vite (those `import()` statements generated) returns a Promise-based value. So, in order to process it, you'll need an asynchronous mapper that can return you proper Promise-based value to process later on, and I'll need that function later on, too, to be fair. Here's how it looks like:

```ts
/**
 * @param array the array to be mapped
 * @param callback the callback function to be called on each item of the array
 * @returns data of type U[]
 */
export async function asyncMap<T, U>(
	array: T[],
	callback: (item: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> {
	const results: U[] = [];

	for (let i = 0; i < array.length; i++) {
		results.push(await callback(array[i], i, array));
	}

	return results;
}
```

The purpose of this function is to apply the callback function to each item in the array asynchronously and return an array of the results. The function is defined with the `async` keyword, indicating that it returns a Promise-based value. The function signature specifies two generic types, `T` and `U`, which represent the types of the array elements and the callback function's return value, respectively.

Inside the function, a new array called `results` is initialized to store the results of applying the callback function to each item in the input array. A `for` loop is used to iterate over each item in the input array. On each iteration, the callback function is called with three arguments: the current item, its index, and the entire array. The `await` keyword is used to wait for the callback function to complete before pushing its result into the results array. Once all iterations are complete, the results array is returned as a Promise-based value, representing the asynchronous completion of the `asyncMap` function.

### The `useResource$` Hook

Alright, the mapper's done, time to continue to the actual resource grabbing. Qwik provides this hook called `useResource$` to help us create a computed value that is derived asynchronously and includes the state of the resource (loading, resolved, rejected) on top of the said value.

Usually, this hook is used to fetch data from external APIs within the component. But, we won't be using it for that purpose. Instead, we'll be using it to fetch the post metadata from the `import.meta.glob` function. Here's how it looks like:

```tsx
// ... some code

const postRes = useResource$(async (): Promise<Post[]> => {
	const modules = import.meta.glob("/src/routes/**/**/index.mdx");
	const posts = await asyncMap(Object.keys(modules), async (path) => {
		const data = (await modules[path]()) as DocumentHeadProps;

		return {
			title: data.head.title,
			desc: data.head.frontmatter.desc,
			date: data.head.frontmatter.date,
			permalink: data.head.frontmatter.permalink,
			tags: data.head.frontmatter.tags,
			draft: data.head.frontmatter.draft,
		};
	});

	return posts.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
});

// ... more code
```

This will make an asynchronously computed value that will return the post metadata alongside the state of the resource. Seems pretty neat, right?

## Making the `PostCard` child component

Well, we're not done yet. We still need to make a fuzzy search functionality and a component to display the posts. Let's say I want the component to be this way:

```tsx
// ... some code

const PostCard = component$((props: Post) => {
	return (
		<Link
			key={props.permalink}
			href={props.permalink}
			class={twMerge(
				"flex flex-col rounded-xl bg-neutral-900 p-5",
				"group relative transition hover:bg-neutral-800",
			)}
		>
			<h2 class="font-heading truncate text-xl font-medium">{props.title}</h2>
			<p class="mt-2 truncate text-neutral-300">{props.desc}</p>
			<p class="mt-2 text-sm text-neutral-300">{props.date}</p>
			{props.tags.length > 0 && (
				<div class="mt-2 flex flex-row flex-wrap">
					{props.tags.map((tag) => (
						<span
							key={tag}
							class={twMerge(
								"mr-2 bg-neutral-800 px-3 py-1 group-hover:bg-neutral-700",
								"rounded-full text-xs text-neutral-300 transition",
							)}
						>
							{tag}
						</span>
					))}
					{props.draft && (
						<span
							class={twMerge(
								"mr-2 bg-yellow-400 px-3 py-1 group-hover:bg-yellow-300",
								"rounded-full text-xs text-neutral-900 transition",
							)}
							title="This post is still a draft and will not be shown in production"
						>
							draft
						</span>
					)}
				</div>
			)}
		</Link>
	);
});

// ... more code
```

Let's just call it in the main route component return statement:

```tsx
// ... some code

return (
	<>
		<section class="relative mx-auto min-h-screen w-full max-w-4xl px-5 py-24">
			<h1 class="font-heading mt-24 w-full text-3xl font-medium md:text-5xl lg:text-6xl">
				Blog posts
			</h1>
			<p class="mt-5 text-lg text-neutral-300">All that I've written.</p>
			<Resource
				value={postRes}
				onResolved={(posts) => (
					<div class="flex flex-col gap-5">
						{import.meta.env.PUBLIC_ENV === "development" &&
							posts
								.filter((post) => post.draft)
								.map((post) => <PostCard key={post.permalink} {...post} />)}
						{posts
							.filter((post) => !post.draft)
							.map((post) => (
								<PostCard key={post.permalink} {...post} />
							))}
					</div>
				)}
			/>
			<p class="mt-10 text-center text-neutral-300">
				Every post is written in{" "}
				<a
					href="https://mdxjs.com/"
					class="underline underline-offset-2 transition hover:text-neutral-100"
				>
					MDX
				</a>{" "}
				and licensed under{" "}
				<a
					href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
					class="underline underline-offset-2 transition hover:text-neutral-100"
				>
					CC BY-NC-SA 4.0
				</a>
			</p>
		</section>
	</>
);

// ... more code
```

## Fuzzy Search Algorithm

Before we continue to the searching functionality, we need to make a function to search the posts. I'm going to use a fuzzy search algorithm to do this. Here's how it looks like:

```ts
import { Post } from "~/types/definitions";

/**
 * @param query string, the query to be searched
 * @param stack string, the string in which the query will be searched
 * @returns boolean, whether the query is found in the stack
 */
export function fuzzy(query: string, stack: string) {
	const queryLength = query.length;
	const stackLength = stack.length;

	if (queryLength > stackLength) {
		return false;
	}

	if (queryLength === stackLength) {
		return query === stack;
	}

	outer: for (let i = 0, j = 0; i < queryLength; i++) {
		let q = query.charCodeAt(i);
		while (j < stackLength) {
			if (stack.charCodeAt(j++) === q) {
				continue outer;
			}
		}
		return false;
	}

	return true;
}

/**
 * @param query string, the query to be searched
 * @param stack Post[], the array of posts in which the query will be searched
 * @returns Post[], the array of posts that contains the query
 */
export function searchPost(query: string, stack: Post[]) {
	const results: Post[] = [];

	const searchVars = stack.map((result) => {
		const searchableObject = {
			key: result.permalink,
			value: `${result.title} ${result.date} ${result.desc} ${result.tags.join(" ")}`.toLowerCase(),
		};

		return searchableObject;
	});

	const searched = searchVars.map((searchVar) => {
		const { key, value } = searchVar;

		return fuzzy(query, value) ? key : null;
	});

	searched.forEach((searchedVar) => {
		if (searchedVar) {
			const result = stack.find((post) => post.permalink === searchedVar);
			if (result) {
				results.push(result);
			}
		}
	});

	return results;
}
```

Not that hard, right? LMAO, yeah, lemme explain for a bit. The code defines two functions: fuzzy and searchPost.

The `fuzzy` function checks if a given `query` string is found within a `stack` string. It compares the characters of the `query` and `stack` strings and returns `true` if all characters in the query are found in the stack in the same order, and `false` otherwise.

The `searchPost` function searches for a query string within an array of `Post` objects called `stack`. It creates a new array called `results` to store the matching `Post` objects. It uses the `fuzzy` function to check if the query is found within the concatenated string of each `Post` object's properties. If a match is found, the corresponding Post object is added to the results array.

Finally, the `searchPost` function returns the results array containing the `Post` objects that contain the query.

## The Search Functionality

Now that we're all set up, let's continue to the searching functionality. The searching functionality shouldn't be that hard. It will just need a signal and something to track that signal inside the `useResource$` hook. In Qwik, we use the `useSignal` hook to create a signal and then, add an object prop with `track` as the variable into the callback function inside of the `useResource$` hook. Here's what it looks like:

```tsx
// ... some code

const searchingValue = useSignal<string>("");

const postRes = useResource$(async ({ track }): Promise<Post[]> => {
	const searchValue = track(() => searchingValue.value);
	const modules = import.meta.glob("/src/routes/**/**/index.mdx");
	const posts = await asyncMap(Object.keys(modules), async (path) => {
		const data = (await modules[path]()) as DocumentHeadProps;

		return {
			title: data.head.title,
			desc: data.head.frontmatter.desc,
			date: data.head.frontmatter.date,
			permalink: data.head.frontmatter.permalink,
			tags: data.head.frontmatter.tags,
			draft: data.head.frontmatter.draft,
		};
	});

	// Ignore if the search value is empty
	if (searchValue !== "") {
		return searchPost(searchValue.toLowerCase(), posts);
	}

	return posts.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
});

// ... more code
```

That `track` prop is used to track for any value changes inside the `searchingValue` signal. If the value changes, the `useResource$` hook will re-run the callback function and re-fetch the post metadata. Now, we need to make the input field to search the posts.

```tsx
// ... some code

return (
	<>
		<section class="relative mx-auto min-h-screen w-full max-w-4xl px-5 py-24">
			<h1 class="font-heading mt-24 w-full text-3xl font-medium md:text-5xl lg:text-6xl">
				Blog posts
			</h1>
			<p class="mt-5 text-lg text-neutral-300">All that I've written.</p>
			<input
				type="text"
				placeholder="Search posts..."
				class={twMerge(
					"mt-10 w-full rounded-full bg-neutral-900 px-5 py-3",
					"text-neutral-300 placeholder-neutral-400 focus:bg-neutral-800",
					"placeholder:italic focus:outline-none focus:ring-2",
					"my-5 transition focus:ring-cyan-500",
				)}
			/>
			<Resource
				value={postRes}
				onResolved={(posts) => (
					<div class="flex flex-col gap-5">
						{import.meta.env.PUBLIC_ENV === "development" &&
							posts
								.filter((post) => post.draft)
								.map((post) => <PostCard key={post.permalink} {...post} />)}
						{posts
							.filter((post) => !post.draft)
							.map((post) => (
								<PostCard key={post.permalink} {...post} />
							))}
					</div>
				)}
			/>
			<p class="mt-10 text-center text-neutral-300">
				Every post is written in{" "}
				<a
					href="https://mdxjs.com/"
					class="underline underline-offset-2 transition hover:text-neutral-100"
				>
					MDX
				</a>{" "}
				and licensed under{" "}
				<a
					href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
					class="underline underline-offset-2 transition hover:text-neutral-100"
				>
					CC BY-NC-SA 4.0
				</a>
			</p>
		</section>
	</>
);

// ... more code
```

Nice, everything's done. But wait... **how does the component update the signal?** Well, nice question. If you love Svelte, you're going to love this. We can bind the input's value into the signal by simply adding `bind:value` property inside the input element like this:

```tsx
// ... some code

<input
	type="text"
	placeholder="Search posts..."
	class={twMerge(
		"mt-10 w-full rounded-full bg-neutral-900 px-5 py-3",
		"text-neutral-300 placeholder-neutral-400 focus:bg-neutral-800",
		"placeholder:italic focus:outline-none focus:ring-2",
		"my-5 transition focus:ring-cyan-500",
	)}
	bind:value={searchingValue}
/>

// ... more code
```

It will automatically update the signal's value whenever the input's value changes.

## Finished Code

After all of that, we have created a blog post indexing that matches all of the requirements I've set up earlier. Quite a long journey, but it's worth it. Here's the finished code, by the way:

```tsx
import { Resource, component$, useResource$, useSignal } from "@builder.io/qwik";
import { Link, type DocumentHeadProps, type DocumentHead } from "@builder.io/qwik-city";
import { twMerge } from "tailwind-merge";
import { asyncMap } from "~/lib/asyncmap";
import type { Post } from "~/types/definitions";
import { searchPost } from "~/lib/fuzzy";

export default component$(() => {
	const searchingValue = useSignal<string>("");

	const postRes = useResource$(async ({ track }): Promise<Post[]> => {
		const searchValue = track(() => searchingValue.value);
		const modules = import.meta.glob("/src/routes/**/**/index.mdx");
		const posts = await asyncMap(Object.keys(modules), async (path) => {
			const data = (await modules[path]()) as DocumentHeadProps;

			return {
				title: data.head.title,
				desc: data.head.frontmatter.desc,
				date: data.head.frontmatter.date,
				permalink: data.head.frontmatter.permalink,
				tags: data.head.frontmatter.tags,
				draft: data.head.frontmatter.draft,
			};
		});

		if (searchValue !== "") {
			return searchPost(searchValue.toLowerCase(), posts);
		}

		return posts.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
	});

	return (
		<>
			<section class="relative mx-auto min-h-screen w-full max-w-4xl px-5 py-24">
				<h1 class="font-heading mt-24 w-full text-3xl font-medium md:text-5xl lg:text-6xl">
					Blog posts
				</h1>
				<p class="mt-5 text-lg text-neutral-300">All that I've written.</p>
				<input
					type="text"
					placeholder="Search posts..."
					class={twMerge(
						"mt-10 w-full rounded-full bg-neutral-900 px-5 py-3",
						"text-neutral-300 placeholder-neutral-400 focus:bg-neutral-800",
						"placeholder:italic focus:outline-none focus:ring-2",
						"my-5 transition focus:ring-cyan-500",
					)}
					bind:value={searchingValue}
				/>
				<Resource
					value={postRes}
					onResolved={(posts) => (
						<div class="flex flex-col gap-5">
							{import.meta.env.PUBLIC_ENV === "development" &&
								posts
									.filter((post) => post.draft)
									.map((post) => <PostCard key={post.permalink} {...post} />)}
							{posts
								.filter((post) => !post.draft)
								.map((post) => (
									<PostCard key={post.permalink} {...post} />
								))}
						</div>
					)}
				/>
				<p class="mt-10 text-center text-neutral-300">
					Every post is written in{" "}
					<a
						href="https://mdxjs.com/"
						class="underline underline-offset-2 transition hover:text-neutral-100"
					>
						MDX
					</a>{" "}
					and licensed under{" "}
					<a
						href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
						class="underline underline-offset-2 transition hover:text-neutral-100"
					>
						CC BY-NC-SA 4.0
					</a>
				</p>
			</section>
		</>
	);
});

const PostCard = component$((props: Post) => {
	return (
		<Link
			key={props.permalink}
			href={props.permalink}
			class={twMerge(
				"flex flex-col rounded-xl bg-neutral-900 p-5",
				"group relative transition hover:bg-neutral-800",
			)}
		>
			<h2 class="font-heading truncate text-xl font-medium">{props.title}</h2>
			<p class="mt-2 truncate text-neutral-300">{props.desc}</p>
			<p class="mt-2 text-sm text-neutral-300">{props.date}</p>
			{props.tags.length > 0 && (
				<div class="mt-2 flex flex-row flex-wrap">
					{props.tags.map((tag) => (
						<span
							key={tag}
							class={twMerge(
								"mr-2 bg-neutral-800 px-3 py-1 group-hover:bg-neutral-700",
								"rounded-full text-xs text-neutral-300 transition",
							)}
						>
							{tag}
						</span>
					))}
					{props.draft && (
						<span
							class={twMerge(
								"mr-2 bg-yellow-400 px-3 py-1 group-hover:bg-yellow-300",
								"rounded-full text-xs text-neutral-900 transition",
							)}
							title="This post is still a draft and will not be shown in production"
						>
							draft
						</span>
					)}
				</div>
			)}
		</Link>
	);
});

export const head: DocumentHead = {
	title: "Posts",
	meta: [
		{
			name: "description",
			content: "Posts I've made",
		},
		{
			name: "og:title",
			content: "Posts",
		},
		{
			name: "og:description",
			content: "Posts I've made",
		},
	],
};
```

## Wrapping Up

I guess that's it. I hope you find this article useful. If you have any questions, feel free to ask me on [Telegram](https://t.me/lappIand). I'll see you in the next article. Bye!
