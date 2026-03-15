import { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";

function TaskModal({ task, onClose }) {
  const [taskDesc, setTaskDesc] = useState();

  const { dispatch, state } = useTask();
  const currentTask = state.tasks.find((t) => t.id === task.id);
  const [changeDesc, setChangeDesc] = useState(false);
  useEffect(() => {
    setTaskDesc(currentTask?.desc || "");
  }, [task]);
  if (!task) return null;

  return (
    <div className="overlay">
      <h1>{task.title}</h1>

      {changeDesc ? (
        <>
          <textarea
            name=""
            id=""
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          ></textarea>
          <button
            onClick={() => {
              dispatch({
                type: "UPDATE_DESCRIPTION",
                payload: { taskId: task.id, desc: taskDesc },
              });
              setChangeDesc(false);
            }}
          >
            Ulozit popisek
          </button>
          <button
            onClick={() => {
              setTaskDesc(currentTask?.desc || "");
              setChangeDesc(false);
            }}
          >
            X
          </button>
        </>
      ) : (
        <>
          <p>{taskDesc}</p>
          <button onClick={() => setChangeDesc(true)}>Upravit popisek</button>
          <button onClick={onClose}>X</button>
        </>
      )}
    </div>
  );
}

export default TaskModal;
