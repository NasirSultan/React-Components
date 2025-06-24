
# React Functional Error Boundary Example

This project demonstrates how to use **error boundaries** with **functional components** in React using the `react-error-boundary` library.

## Features

* Functional component-based React application
* Error handling using `react-error-boundary`
* Custom fallback UI
* Ability to reset the error boundary
* Simple and extendable project structure

## Technologies Used

* React
* Vite (for development server and bundling)
* `react-error-boundary`

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/react-functional-error-boundary.git
cd react-functional-error-boundary
npm install
```

## Running the App

Start the development server:

```bash
npm run dev
```

Then open your browser to:

```
http://localhost:5173
```

## Project Structure

```
/react-functional-error-boundary
├── /src
│   ├── /components
│   │   ├── BuggyComponent.jsx         # Simulates a crash
│   │   ├── ErrorFallback.jsx          # Custom fallback UI for errors
│   │   └── MainContent.jsx            # Component that uses the error boundary
│   ├── App.jsx                        # Root component
│   └── main.jsx                       # Entry point
├── index.html                         # Main HTML file
├── package.json
└── vite.config.js
```

## How It Works

1. The user clicks a button to render `BuggyComponent`.
2. `BuggyComponent` throws an error during render.
3. `react-error-boundary` catches the error and renders the fallback UI.
4. The user can click "Try again" to reset the component.

