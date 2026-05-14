// Mock API module for demo (replace with real API calls later)
let tasks = [
  { _id: "1", title: "Task 1", status: "todo" },
  { _id: "2", title: "Task 2", status: "in-progress" },
  { _id: "3", title: "Task 3", status: "done" },
];

// Simulate async delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const API = {
  get: async (endpoint) => {
    await delay(300);
    if (endpoint === "/tasks") {
      return { data: tasks };
    }
    throw new Error("Unknown endpoint");
  },
  post: async (endpoint, task) => {
    await delay(300);
    if (endpoint === "/tasks") {
      const newTask = { ...task, _id: String(tasks.length + 1) };
      tasks.push(newTask);
      return { data: newTask };
    }
    throw new Error("Unknown endpoint");
  },
  put: async (endpoint, updatedTask) => {
    await delay(300);
    if (endpoint.startsWith("/tasks/")) {
      const id = endpoint.split("/")[2];
      tasks = tasks.map((t) => (t._id === id ? updatedTask : t));
      return { data: updatedTask };
    }
    throw new Error("Unknown endpoint");
  },
};

export default API;