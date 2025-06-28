

# React Web Worker Calculator and User Fetcher

This project demonstrates how to use **Web Workers** in a **React (Vite)** application to offload both **CPU-heavy tasks** and **data fetching/filtering** to background threads. It includes two interactive components:

* **Calculator**: Computes prime numbers using a Web Worker
* **User List**: Fetches and filters users (age > 30) using a Web Worker

---

## Features

* Web Worker for offloading CPU-intensive computation (prime numbers)
* Web Worker for fetching and filtering user data without blocking UI
* Smooth component switching without losing background tasks or state
* Clean and scalable component structure
* Uses functional components and hooks only

---

## Folder Structure

```
src/
├── components/
│   ├── Calculator.jsx       # Prime number calculator
│   └── UserList.jsx         # Fetches and filters user list
├── workers/
│   ├── heavyTaskWorker.js   # Calculates prime numbers
│   └── userWorker.js        # Fetches and filters users by age
├── App.jsx                  # Root component with toggle
└── main.jsx
```

---

## Components Overview

### 1. Calculator

* Input a number (limit) and calculate all prime numbers up to that limit
* Uses a Web Worker to prevent UI blocking during calculation
* Keeps the result even when user navigates away and back

### 2. User List

* Button to fetch user data in the background
* Filters users where age > 30 inside the Web Worker
* Displays filtered user list after completion
* Handles loading and error states

---

## How It Works

### Web Worker Integration

* Workers are created using `new Worker(new URL(..., import.meta.url))`, which is the correct Vite method
* Communication between main thread and worker is done via `postMessage` and `onmessage`
* Workers are terminated after task completion to free resources
* Simple in-memory cache (in Calculator) allows state to persist across unmount/remount

---

## How to Use

1. Install dependencies

   `npm install`

2. Start development server

   `npm run dev`

3. Navigate between components using the provided buttons

4. In Calculator, enter a number and click "Calculate"

5. In User List, click "Fetch Users" to get a filtered list

---

## Technical Stack

* React (with hooks)
* Vite
* Web Workers (classic type)
* JavaScript (no external libraries)

---

## Requirements

* Node.js v16 or later
* Modern browser (Chrome, Firefox, Edge)



