export default function Taskcard({ task, draggableProps, dragHandleProps, innerRef }) {
  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: "12px 16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        marginBottom: 12,
        cursor: "grab",
        userSelect: "none",
        ...draggableProps.style,
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem", color: "#222" }}>{task.title}</h3>
      <p style={{ margin: 0, fontSize: "0.9rem", color: "#666", fontStyle: "italic" }}>
        {task.status}
      </p>
    </div>
  );
}