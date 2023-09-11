---
title: "Pipe and Compose in JavaScript"
publishDate: "02 April 2023"
description: "JavaScript functional programming is pretty darn good."
tags: ["programming"]
---

## Introduction

Functional programming is a style of programming that focuses on the use of functions. It is a declarative style of programming, meaning that you write code that describes what you want to do, rather than how to do it. This is in contrast to imperative programming, which focuses on how to do something.

See, for example, the following imperative code:

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = [];

for (let i = 0; i < numbers.length; i++) {
	doubled.push(numbers[i] * 2);
}

console.log(doubled);
```

This code is imperative because it describes how to do something. It tells the computer to loop through the array, multiply each number by 2, and push the result into a new array. This is a good way to write code, but it is not the only way.

Now, let's look at the same code written in a functional style:

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);

console.log(doubled);
```

This code is functional because it describes what to do in a mathematical sense. It tells the computer to take an array of numbers, map it out, and return a new array of numbers that are each doubled.
See, this code trips out 4 lines of code.

Okay, so getting into the `pipe` and `compose` functions.

## What is it anyways? How does it work?

Say you want to apply a series of functions to a value. You could do this:

```js
function addOne(number) {
	return number + 1;
}

function double(number) {
	return number * 2;
}

function triple(number) {
	return number * 3;
}

const result = triple(double(addOne(1)));
```

This is fine, but it's not very flexible. What if you want to apply the different functions to a same value? You'd have to rewrite the code:

```js
const result = addOne(triple(double(2)));
```

What if you want to add more functions? You'd have to rewrite the code again:

```js
const result = addOne(triple(double(double(2))));
```

This is where `pipe` and `compose` come in. They allow you to apply a series of functions to a value without having to rewrite the code.

### Pipe

`pipe` takes a series of functions and returns a new function. When you call the new function, it will pass the value to the first function, then pass the result to the second function, and so on.

```js
function pipe(...fns) {
	return function piped(input) {
		return fns.reduce((prev, fn) => fn(prev), input);
	};
}
```

Let's look at an example:

```js
function addOne(number) {
	return number + 1;
}

function double(number) {
	return number * 2;
}

function triple(number) {
	return number * 3;
}

const piped = pipe(addOne, double, triple)(1);
console.log(piped);
```

This code will log `12` to the console. It works by passing the value `1` to `addOne`, then passing the result to `double`, then passing the result to `triple`.

### Compose

`compose` is similar to `pipe`, but it works in the opposite direction. It takes a series of functions and returns a new function. When you call the new function, it will pass the value to the last function, then pass the result to the second-to-last function, and so on.

```js
function compose(...fns) {
	return function composed(input) {
		return fns.reduceRight((prev, fn) => fn(prev), input);
	};
}
```

Let's look at an example:

```js
function addOne(number) {
	return number + 1;
}

function double(number) {
	return number * 2;
}

function triple(number) {
	return number * 3;
}

const composed = compose(triple, double, addOne)(1);

console.log(composed);
```

Both have a similar output, but the difference is that `pipe` starts with the first function and works its way to the last, while `compose` starts with the last function and works its way to the first.
If you one of those asynchronous developer who likes to use `async/await` then you can use `pipeAsync` and `composeAsync` functions.

### Asynchronous Pipe

```js
async function pipeAsync(...fns) {
	return async function piped(input) {
		return fns.reduce(async (prev, fn) => fn(await prev), input);
	};
}
```

### Asynchronous Compose

```js
async function composeAsync(...fns) {
	return async function composed(input) {
		return fns.reduceRight(async (prev, fn) => fn(await prev), input);
	};
}
```

## Conclusion

The `pipe` and `compose` functions are useful for applying a series of functions to a value. They allow you to write code that is more flexible and easier to read.
And surely it won't hurt knowing some functional programming, right? Until then!
