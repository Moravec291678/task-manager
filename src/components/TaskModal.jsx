function TaskModal({ task, onClose }) {
  if (!task) return null;
  return (
    <div className="overlay">
      <h1>{task.title}</h1>
      <button onClick={onClose}>X</button>
    </div>
  );
}

export default TaskModal;
