// Plain JS file
self.onmessage = async function (e) {
  const { type, payload } = e.data;

  if (type === "FETCH_USERS") {
    try {
      // Simulate fetching 1M users (change to your actual API)
      const allUsers = [];

      for (let i = 0; i < 1000; i++) {
        const res = await fetch(`https://dummyjson.com/users?limit=100`);
        const data = await res.json();
        allUsers.push(...data.users);
      }

      // Example: filter users with age > 30
      const filtered = allUsers.filter((u) => u.age > 30);

      self.postMessage({ status: "success", users: filtered });
    } catch (error) {
      self.postMessage({ status: "error", message: error.message });
    }
  }
};
