
# React HOC Authentication Example

This is a simple React app demonstrating how to use a Higher-Order Component (HOC) to add authentication logic to any component.

---

## Features

- Toggle between Login and Logout
- Conditionally render a protected component (`Dashboard`)
- Reusable `withAuth` HOC for guarding access
- Styled with Tailwind CSS

---

## Concepts Used

- Higher-Order Components (HOCs)
- Props-based conditional logic
- Component composition
- State management with `useState`

---

## File Structure

```

src/
├── App.js                   # Main app with login toggle and protected 
├── components/
│   ├── Dashboard.js         # A protected component (UI only)
│   └── withAuth.js          # HOC that adds auth protection

````



## How It Works

### HOC: `withAuth.js`

```jsx
const withAuth = (WrappedComponent) => {
  return function AuthWrapper(props) {
    if (!props.user) {
      return <p>Access Denied. Please log in.</p>;
    }
    return <WrappedComponent {...props} />;
  };
};
```

### Usage in `App.js`

```jsx
const ProtectedDashboard = withAuth(Dashboard);
```

Now `ProtectedDashboard` will only render if the `user` prop is passed.

---

## Customization Ideas

* Replace dummy login with a real auth system
* Use React Context for global user state
* Add redirects or role-based guards
* Combine multiple HOCs (e.g., `withAuth`, `withLogger`, etc.)

---

## Author

Created by Nasir | React Developer

