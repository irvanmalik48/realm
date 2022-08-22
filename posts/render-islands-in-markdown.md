---
title: "Injecting Islands to Markdown in Fresh"
date: "2022-08-22"
desc: "Me when markdown not doing islands."
tag:
  - "blog"
  - "islands"
  - "fresh"
---

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Abstract](#abstract)
- [Making The Island](#making-the-island)
- [Making The Island Container Component](#making-the-island-container-component)
- [Implementing The Island](#implementing-the-island)
- [Testing](#testing)
- [Conclusion](#conclusion)

# Abstract

Let's get this straight. Yes, **you can put island in a page rendered from markdown in fresh** framework. Lemme show you how.

# Making The Island

So, in general, this blog uses `markdown-to-jsx` to render markdown files to JSX tags that Preact can render. It also provides you the ability to override a JSX tag present in the markdown file using the `overrides` option. In general, all components going there are rendered as static components. But we can still trick it to properly render an island component. So now, let's just have a counter. Let's just grab it from the fresh framework example and modify it using twind styles for a bit.

```tsx|islands/CounterLogic.tsx
/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@utils/twind.ts";

export default function CounterLogic(props: { start: number }) {
  let [count, setCount] = useState(props.start);
  return (
    <>
      <button
        className={tw`bg-dark-accent-semitrans text-dark-accent-solid p-3 rounded-xl w-[50px] h-[50px] text-center transition-all duration-200 ease-linear hover:bg-dark-accent-solid hover:rounded-3xl hover:text-dark-nav`}
        onClick={(e) => {
          e.preventDefault();
          setCount(--count);
        }}
      >
        -1
      </button>
      <p className={tw`font-bold text-2xl`}>{count}</p>
      <button
        className={tw`bg-dark-accent-semitrans text-dark-accent-solid p-3 rounded-xl w-[50px] h-[50px] text-center transition-all duration-200 ease-linear hover:bg-dark-accent-solid hover:rounded-3xl hover:text-dark-nav`}
        onClick={(e) => {
          e.preventDefault();
          setCount(++count);
        }}
      >
        +1
      </button>
    </>
  );
}
```

Notice that I put it in a JSX fragment instead of a standard `div` tag. We can override the JSX tag using the `overrides` option but it won't work since it's outputting a static component instead of an interactive island component. So here's the trick.

# Making The Island Container Component

Yes, **it actually works when it's inside a static component wrapping it**. So that's exactly what we going to do. We create a container for the island component to not lose the island characteristics. Here's what I wrote:

```tsx|components/Counter.tsx
/** @jsx h */
import { h } from "preact";
import { tw } from "@utils/twind.ts";
import CounterLogic from "@islands/CounterLogic.tsx";

export default function Counter(props: { start: number }) {
  return (
    <div
      className={tw`w-full flex flex-row justify-between items-center p-3 rounded-xl bg-dark-bg`}
    >
      <CounterLogic start={props.start} />
    </div>
  );
}
```

# Implementing The Island

And there you go! It should retain all characteristics of an island component and you can simply put it in markdown files! Now for the `overrides`:

```tsx|routes/posts/[slug].tsx
// code before
<Markdown
  class={tw`${tw(styles)} mb-5 w-full bg-dark-nav py-4 px-5 rounded-xl`}
  options={{
    overrides: {
      pre: PreBlock,
      Counter: Counter, // Counter component goes here
    },
  }}
>
  {data.md !== undefined ? data.md : ""}
</Markdown>;
// code after
```

And let's see the results!

# Testing

Down this text should be the island component properly functioning. Go give it a try!

<Counter start="5" />

Yes, it does work right? (unless you disallow any JS to be run to be fair).

# Conclusion

So yeah, I've just showed you how to properly render an island component inside a page rendered from markdown! Have a nice day and may this post help you!
