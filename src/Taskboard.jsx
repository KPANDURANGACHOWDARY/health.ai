import { useEffect, useState } from "react";
import { fetchTasks, updateTask, createTask } from "./Taskservice";
import Taskcard from "./Taskcard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const statuses = ["todo", "in-progress", "done"];

export default function Taskboard() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("todo");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const task = tasks.find((t) => t._id === draggableId);
    const updatedTask = { ...task, status: destination.droppableId };
    await updateTask(updatedTask);

    // reorder tasks locally for UI
    let newTasks = tasks.filter((t) => t._id !== draggableId);
    newTasks.splice(destination.index, 0, updatedTask);
    setTasks(newTasks);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created = await createTask({ title: newTitle, status: newStatus });
    setTasks((prev) => [...prev, created]);
    setNewTitle("");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20,
        padding: 20,
        height: "100vh",
        backgroundColor: "#f4f5f7",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 15,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <h2
                  style={{
                    textTransform: "capitalize",
                    marginBottom: 15,
                    borderBottom: "2px solid #eee",
                    paddingBottom: 5,
                    fontSize: "1.25rem",
                    color: "#333",
                  }}
                >
                  {status}
                </h2>

                {status === "todo" && (
                  <form
                    onSubmit={handleAddTask}
                    style={{
                      marginBottom: 20,
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <input
                      placeholder="New task title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    />
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      style={{ borderRadius: 4, border: "1px solid #ccc", padding: 8 }}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                    >
                      Add
                    </button>
                  </form>
                )}

                {tasks
                  .filter((t) => t.status === status)
                  .map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <Taskcard
                          task={task}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}

                {provided.placeholder}
              </section>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}