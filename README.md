
# React Portal Modal Example

This project demonstrates how to use React Portals to render a modal component outside of the root DOM hierarchy. This is especially useful for UI elements like modals, tooltips, or dropdowns that need to overlay the main content without being affected by parent styles.

---

## Features

* Renders a modal using React Portal
* Allows modal toggle with simple state management
* Includes a styled overlay and close button
* Clean separation of components for modularity

---

## Folder Structure

* `App.js`: Main application component that controls modal visibility
* `Modal.js`: Reusable modal component rendered using ReactDOM.createPortal
* `index.css`: Contains styles for modal and overlay
* `index.html`: Includes both the main root and modal root DOM nodes

---

## Key Concepts

* **React Portals** allow rendering of a component into a different part of the DOM tree.
* **State management** is used to toggle the modal open or closed.
* **Separation of concerns** ensures the modal is self-contained and reusable.

---

## Setup Instructions

1. Install dependencies using your preferred package manager.
2. Run the development server.
3. Click the button to open the modal.
4. The modal is rendered outside the main app root using a separate DOM node.

---

## Use Case

This pattern is ideal for any UI component that needs to break out of the layout flow of its parent component, such as:

* Modals
* Tooltips
* Dropdown menus
* Notifications

