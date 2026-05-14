import API from "./Api";

export const fetchTasks = async () => {
  const { data } = await API.get("/tasks");
  return data;
};

export const createTask = async (task) => {
  const { data } = await API.post("/tasks", task);
  return data;
};

export const updateTask = async (task) => {
  const { data } = await API.put(`/tasks/${task._id}`, task);
  return data;
};