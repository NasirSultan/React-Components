
# Render Props & Function Props in React

This project demonstrates two common patterns in React:

1. Function as Prop – Passing functions to child components
2. Render Props – Passing functions as children for more control

Also included: abstraction of shared behavior (like hover state) using render props.

---

## Folder Structure

```

src/
├── components/
│   ├── ParentWithPropFn.jsx
│   ├── ChildWithPropFn.jsx
│   ├── ParentWithRenderProp.jsx
│   ├── ChildWithRenderProp.jsx
│   └── SharedBehaviorDemo.jsx
└── App.jsx

````

---

## 1. Function as Prop

Parent passes a function to child for dynamic rendering.

```jsx
<Child renderFn={(text) => <p>{text}</p>} />
````

Child uses it like:

```jsx
{renderFn("From child")}
```

Use when the parent controls part of the child’s rendering.

---

## 2. Render Props

Pass a function as a child to get full control over rendering.

```jsx
<Child>
  {(data) => <p>{data}</p>}
</Child>
```

Child calls `children(data)`.

Good for reusable logic with custom rendering.

---

## 3. Abstracting Shared Behavior

`SharedBehaviorDemo.jsx` shows a reusable `Hoverable` component:

```jsx
<Hoverable>
  {(hovered) => <div>{hovered ? "On" : "Off"}</div>}
</Hoverable>
```

Useful for hover, toggle, tracking, etc.

---

## How to Run

1. Install dependencies
   `npm install`

2. Start the dev server
   `npm run dev`

