import { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";

function TaskModal({ task, onClose }) {
  const [taskDesc, setTaskDesc] = useState();

  const { dispatch, state } = useTask();
  const currentTask = state.tasks.find((t) => t.id === task.id);
  const [changeDesc, setChangeDesc] = useState(false);
  const taskInColumn = state.columns.find((c) => {
    return c.id === task.columnId;
  });
  const taskLabel = currentTask.label || "";
  const [deadline, setDeadline] = useState(
    currentTask.deadline || { from: "", to: "" },
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const fromDate = deadline.from ? new Date(deadline.from) : null;
  const toDate = deadline.to ? new Date(deadline.to) : null;
  const isDone = currentTask.done;

  const deadlineStatus = isDone
    ? "done"
    : !fromDate && !toDate
      ? null
      : toDate && toDate < today
        ? "overdue"
        : toDate && toDate.toDateString() === today.toDateString()
          ? "today"
          : fromDate && fromDate > today
            ? "planned"
            : "inprogress";

  useEffect(() => {
    setTaskDesc(currentTask?.desc || "");
  }, [task]);
  if (!task) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">Ve sloupci: {taskInColumn?.title}</div>
        <button onClick={onClose}>X</button>
        <h1>{task.title}</h1>
        <div className="modal-body">
          <p>PRIORITA</p>
          <button
            style={{ opacity: taskLabel && taskLabel !== "high" ? 0.3 : 1 }}
            onClick={() =>
              dispatch({
                type: "UPDATE_LABEL",
                payload: {
                  taskId: currentTask.id,
                  label: taskLabel === "high" ? "" : "high",
                },
              })
            }
          >
            Vysoka
          </button>
          <button
            style={{ opacity: taskLabel && taskLabel !== "medium" ? 0.3 : 1 }}
            onClick={() =>
              dispatch({
                type: "UPDATE_LABEL",
                payload: {
                  taskId: currentTask.id,
                  label: taskLabel === "medium" ? "" : "medium",
                },
              })
            }
          >
            Normalni
          </button>
          <button
            style={{ opacity: taskLabel && taskLabel !== "low" ? 0.3 : 1 }}
            onClick={() =>
              dispatch({
                type: "UPDATE_LABEL",
                payload: {
                  taskId: currentTask.id,
                  label: taskLabel === "low" ? "" : "low",
                },
              })
            }
          >
            Nizka
          </button>
          <p>Termin</p>
          <input
            type="date"
            value={deadline.from}
            max={deadline.to}
            onChange={(e) => {
              const newDeadline = { ...deadline, from: e.target.value };
              setDeadline(newDeadline);
              dispatch({
                type: "UPDATE_DEADLINE",
                payload: {
                  taskId: currentTask.id,
                  from: newDeadline.from,
                  to: newDeadline.to,
                },
              });
            }}
          />
          <input
            type="date"
            value={deadline.to}
            min={deadline.from}
            onChange={(e) => {
              const newDeadline = { ...deadline, to: e.target.value };
              setDeadline(newDeadline);
              dispatch({
                type: "UPDATE_DEADLINE",
                payload: {
                  taskId: currentTask.id,
                  from: newDeadline.from,
                  to: newDeadline.to,
                },
              });
            }}
          />
          {deadlineStatus && (
            <span
              style={{
                color:
                  deadlineStatus === "overdue"
                    ? "#ff6b6b"
                    : deadlineStatus === "today"
                      ? "#f5a623"
                      : deadlineStatus === "done"
                        ? "#4ecdc4"
                        : deadlineStatus === "inprogress"
                          ? "#4ecdc4"
                          : "#888",
              }}
            >
              {deadlineStatus === "overdue"
                ? "Po splatnosti"
                : deadlineStatus === "today"
                  ? "Dnes končí"
                  : deadlineStatus === "done"
                    ? "Splněno"
                    : deadlineStatus === "inprogress"
                      ? "Probíhá"
                      : "Naplánováno"}
            </span>
          )}
          <input
            type="checkbox"
            checked={currentTask.done}
            onChange={() => {
              dispatch({
                type: "TOGGLE_DONE",
                payload: { taskId: currentTask.id },
              });
            }}
          />{" "}
          <p>splneno</p>
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
              <button onClick={() => setChangeDesc(true)}>
                Upravit popisek
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
