
# Redux in React JS

## Overview

This project demonstrates how to implement a simple counter application using **Redux** in **React JS**. It showcases the core concepts of Redux such as `store`, `actions`, and `reducers` integrated with a functional React component.

---

## Features

### 1. Global State Management with Redux

The counter value is managed globally using Redux, making it accessible and consistent across the application.

### 2. Increment / Decrement Functionality

Users can increment or decrement the counter by clicking the respective buttons. These actions trigger Redux actions which update the global state.

### 3. Increment by Custom Amount

An input field allows users to enter a specific value to increment the counter by that amount, using the `incrementByAmount` action.

### 4. Reset Counter

A dedicated Reset button is provided to reset the counter to its initial state using the `reset` action.

### 5. Tailwind CSS Styling

The entire UI is styled using Tailwind CSS to ensure a clean, modern, and responsive design.

---

## Project Structure

* `counterSlice.js`: Contains Redux logic including state, reducers, and action creators.
* `Counter.jsx`: React component that uses Redux hooks (`useSelector` and `useDispatch`) to read and dispatch actions.
* `store.js`: Configures the Redux store and combines reducers.
* `App.jsx`: Main application file rendering the Counter component.

---

## Technologies Used

* React JS (with Hooks)
* Redux Toolkit
* Tailwind CSS
* JavaScript (ES6+)

---

## How to Run the Project

1. Clone the repository
2. Install dependencies using `npm install`
3. Start the development server with `npm run dev` or `npm start`


---

## Learning Objectives

* Understand the use of Redux Toolkit with React
* Learn how to manage global state in a React app
* Practice clean UI design using Tailwind CSS
* Build an extendable structure for scalable Redux-based applications

