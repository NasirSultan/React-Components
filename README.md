
**Understanding `ref` in React**

**What is `ref` in React and Why Use It**

In React, a `ref` (short for “reference”) is a special object that gives you **direct access to a DOM element or component instance**. React normally updates the UI using `state` and `props`, but sometimes you need to interact with the DOM manually — that’s when `ref` is used.

You might use a ref to:

* Focus an input field when a button is clicked
* Scroll to a specific element on the page
* Read or modify a DOM element's properties
* Measure layout or dimensions of an element

Without a `ref`, you cannot perform such direct DOM actions in React. This makes `ref` an important tool for handling low-level operations while still keeping most of your UI logic declarative.
