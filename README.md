

#### **What is Concurrent Rendering?**

**Concurrent rendering** is a feature in React 18+ that helps keep your app **smooth and responsive** — even when there’s a lot of work (like rendering 30,000 items).

It lets React pause work that's not urgent (like loading a big list) so it can first do urgent things (like typing in an input box).

---

### **Key Hooks and Functions**

#### 1. `startTransition(callback)`

* Marks the code inside as **non-urgent**.
* React will **pause or delay** it if the user does something more important (like typing).
* No loading feedback is provided automatically.
* Good for background updates.

**Example use:**
Update a big list silently without blocking the input.

---

#### 2. `useTransition()`

* A React hook that gives you:

  * `isPending`: true when the background work is running.
  * `startTransition(callback)`: like above, but tied to this loading state.
* Lets you **show loading indicators** during a transition.

**Example use:**
Update a list and show "Loading..." while it's happening.

---

### **In Your Component**

* **Urgent update:**
  `setText(value)` updates the input box immediately.

* **Global background update:**
  `startTransition(() => setList(globalList))`
  This runs quietly. You won’t see a loading message.

* **Local background update (with feedback):**
  `startLocalTransition(() => setList(localList))`
  This runs in the background **and shows** a loading message (`isPending`).

* **Important:**
  The last `setList` call wins — so only the **local list (30,000 items)** is shown in the UI.

---

### **Why Use These?**

* Avoids UI freezing when handling large data.
* Keeps typing fast and responsive.
* Lets you control what the user sees during slow updates.

