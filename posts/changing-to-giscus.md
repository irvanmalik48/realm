---
title: "Meet Giscus!"
date: "2021-11-15"
desc: "Yay, I got an Utterances replacement and I love it."
tag:
  - "javascript"
  - "next"
  - "giscus"
---

# Abstract

It's been a while since I used Utterances for blog comment system. Using GitHub Issues seems to be a nice idea for blog posts comment (or rather weird, I must say). But things get real nice when I was looking for Utterances replacement. Yes, I found **Giscus**. So, the concept of both Utterances and Giscus are the same (since both behave the same way tbh) but what makes the difference is that Utterances uses GitHub Issues while Giscus, on the other hand, uses GitHub Discussions. Using GitHub Discussions feels more natural and I actually prefer it over issues tracker since, well, _comments are always a discussion_. Also Giscus has some nice component library for React, Vue, and Svelte, check them out [here](https://github.com/giscus/giscus-component).

# Migrating Utterances Comments

You can just go and follow [this tutorial](https://docs.github.com/en/discussions/managing-discussions-for-your-community/moderating-discussions#converting-an-issue-to-a-discussion). As long as you keep the namings right, Giscus will just pick it.

# Implementation

> Be sure to get your needed values in <https://giscus.app> before proceeding. Also read stuffs there for better understanding on how shit works.

## Hacky Old-fashioned Way

Well, since I already have the hacky `<div>` injection method around (refer to [this post](https://www.irvanma.live/posts/blog/nextjs-utterances)) to get Utterances working, I can just change some code into, well, something like this:

```ts
import { Component, createRef } from "react";

export default class Comments extends Component {
  private box: React.RefObject<HTMLDivElement>;

  constructor(props: {} | any) {
    super(props);
    this.box = createRef();
  }

  componentDidMount(): void {
    let element: HTMLScriptElement = document.createElement("script");
    element.setAttribute("src", "https://giscus.app/client.js");
    element.setAttribute("crossorigin", "anonymous");
    element.setAttribute("async", "true");
    element.setAttribute("data-repo", "irvanmalik48/blog");
    element.setAttribute("data-repo-id", "my-data-repo-id");
    element.setAttribute("data-category", "Comments");
    element.setAttribute("data-category-id", "my-data-category-id");
    element.setAttribute("data-mapping", "pathname");
    element.setAttribute("data-reactions-enabled", "0");
    element.setAttribute("data-emit-metadata", "0");
    element.setAttribute("data-lang", "en");
    element.setAttribute("data-theme", "transparent_dark");
    this.box?.current?.appendChild(element);
  }

  render(): JSX.Element {
    return <div ref={this.box}></div>;
  }
}
```

and it works. Yeah, just like that.

## Component Library

But well, I don't like the idea of keeping that hacky way around so I opted in for the component library. I use Next.js so it's gonna be React. It's quite simple to implement, really, just need some little adjustments here and there. Here's what I do:

1. Yeet out old comments component.
2. Install `@giscus/react` from npm.

```bash
npm i @giscus/react
```

3. Watch anime.
4. Go back to VSCode and do some changes to the post layout so that now it looks like this:

```tsx
import DefaultLayout from "./default";
import Head from "next/head";
import { PostLayoutProps } from "../../interfaces/types";
import { Giscus } from "@giscus/react";

export default function PostLayout(props: PostLayoutProps): JSX.Element {
  return (
    <DefaultLayout
      title={props.title}
      description={props.description}
      tag={props.tag}
      date={props.date}
    >
      <Head>
        <meta key="words" name="keywords" content={props.tag} />
      </Head>
      <div className="container mt-3" style={{ marginBottom: "100px" }}>
        <section className="m-0 pt-5 pb-5 text-center">
          <div className="container">
            <p className="display-4 mb-0">{props.title}</p>
            <p className="lead text-muted mb-0">{props.date}</p>
          </div>
        </section>
        <article className="card floatcard-no-mt container px-4 pb-4">
          <h1>Table of Contents</h1>
          <div dangerouslySetInnerHTML={{ __html: props.content }} />
          <h1>Comments</h1>
          <Giscus
            repo="irvanmalik48/blog"
            repoId="my-repo-id"
            category="Comments"
            categoryId="my-category-id"
            mapping="pathname"
            reactionsEnabled="0"
            emitMetadata="0"
            theme="transparent_dark"
          />
        </article>
      </div>
    </DefaultLayout>
  );
}
```

Ok so, notice this tag right here:

```tsx
<Giscus
  repo="irvanmalik48/blog"
  repoId="my-repo-id"
  category="Comments"
  categoryId="my-category-id"
  mapping="pathname"
  reactionsEnabled="0"
  emitMetadata="0"
  theme="transparent_dark"
/>
```

That's the Giscus component. And yeah, just like that. It works really darn well.

# Wrapping Up

Okay, see you all in the next post. I will come back with more disturbing stuffs. Also, I need sleep.
