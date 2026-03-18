import { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";

function TaskModal({ task, onClose }) {
  const [taskDesc, setTaskDesc] = useState("");

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
          : fromDate && fromDate.toDateString() === today.toDateString()
            ? "inprogress"
            : fromDate && fromDate > today
              ? "planned"
              : "inprogress";

  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [changeTitle, setChangeTitle] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  useEffect(() => {
    setTaskDesc(currentTask?.desc || "");
  }, [currentTask]);
  useEffect(() => {
    setTaskTitle(currentTask?.title || "");
  }, [currentTask]);
  if (!task) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* HLAVIČKA */}
        <div className="modal-header">
          <span>Ve sloupci: {taskInColumn?.title}</span>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        {changeTitle ? (
          <div className="modal-input">
            <input
              className="modal-title-input"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <button
              className="btn-save"
              onClick={() => {
                dispatch({
                  type: "RENAME_TASK",
                  payload: { taskId: task.id, newTitle: taskTitle },
                });
                setChangeTitle(false);
              }}
            >
              Uložit
            </button>
            <button
              className="btn-cancel"
              onClick={() => setChangeTitle(false)}
            >
              Zrušit
            </button>
          </div>
        ) : (
          <h2 onClick={() => setChangeTitle(true)} className="modal-title">
            {currentTask.title || "Přidej název..."}{" "}
          </h2>
        )}

        <div className="modal-body">
          {/* PRIORITA */}
          <div className="modal-section">
            <p className="modal-section-label">Priorita</p>
            <div className="label-buttons">
              <button
                className={`label-btn high ${taskLabel === "high" ? "active" : ""}`}
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
                Vysoká
              </button>
              <button
                className={`label-btn medium ${taskLabel === "medium" ? "active" : ""}`}
                style={{
                  opacity: taskLabel && taskLabel !== "medium" ? 0.3 : 1,
                }}
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
                Normální
              </button>
              <button
                className={`label-btn low ${taskLabel === "low" ? "active" : ""}`}
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
                Nízká
              </button>
            </div>
          </div>

          {/* TERMÍN */}
          <div className="modal-section">
            <p className="modal-section-label">Termín</p>
            <div className="deadline-inputs">
              <input
                className="deadline-input"
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
                className="deadline-input"
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
            </div>
          </div>

          {/* SPLNĚNO */}
          <div className="modal-section">
            <label className="done-row">
              <input
                type="checkbox"
                checked={currentTask.done}
                onChange={() =>
                  dispatch({
                    type: "TOGGLE_DONE",
                    payload: { taskId: currentTask.id },
                  })
                }
              />
              <p>
                {deadlineStatus && (
                  <span className={`deadline-badge ${deadlineStatus}`}>
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
              </p>
            </label>
          </div>

          {/* POPIS */}
          <div className="modal-section">
            <p className="modal-section-label">Popis</p>
            {changeDesc ? (
              <>
                <textarea
                  className="modal-textarea"
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                />
                <div className="modal-desc-actions">
                  <button
                    className="btn-save"
                    onClick={() => {
                      dispatch({
                        type: "UPDATE_DESCRIPTION",
                        payload: { taskId: task.id, desc: taskDesc },
                      });
                      setChangeDesc(false);
                    }}
                  >
                    Uložit
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => {
                      setTaskDesc(currentTask?.desc || "");
                      setChangeDesc(false);
                    }}
                  >
                    Zrušit
                  </button>
                </div>
              </>
            ) : (
              <p className="modal-desc" onClick={() => setChangeDesc(true)}>
                {taskDesc || "Klikni pro přidání popisu..."}
              </p>
            )}
          </div>

          {/* KOMENTÁŘE */}
          <div className="modal-section">
            <p className="modal-section-label">Komentáře</p>

            {/* Přidat komentář */}
            <div className="comment-add">
              <textarea
                className="modal-textarea"
                placeholder="Napište komentář..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                className="btn-save"
                onClick={() => {
                  if (commentText.trim()) {
                    dispatch({
                      type: "ADD_COMMENT",
                      payload: { taskId: currentTask.id, text: commentText },
                    });
                    setCommentText("");
                  }
                }}
              >
                Odeslat
              </button>
            </div>

            {/* Seznam komentářů */}
            <div className="modal-comments">
              {currentTask.comments?.map((c) =>
                editingCommentId === c.id ? (
                  // Editace komentáře
                  <div key={c.id} className="comment-item">
                    <textarea
                      className="modal-textarea"
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                    />
                    <div className="comment-actions">
                      <button
                        className="btn-save"
                        onClick={() => {
                          dispatch({
                            type: "EDIT_COMMENT",
                            payload: {
                              taskId: currentTask.id,
                              commentId: c.id,
                              newText: editingCommentText,
                            },
                          });
                          setEditingCommentId(null);
                          setEditingCommentText("");
                        }}
                      >
                        Uložit
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => setEditingCommentId(null)}
                      >
                        Zrušit
                      </button>
                    </div>
                  </div>
                ) : (
                  // Zobrazení komentáře
                  <div key={c.id} className="comment-item">
                    <p className="comment-text">{c.text}</p>
                    <p className="comment-meta">
                      {new Date(c.date).toLocaleDateString()}
                    </p>
                    <div className="comment-actions">
                      <button
                        className="btn-cancel"
                        onClick={() => {
                          setEditingCommentId(c.id);
                          setEditingCommentText(c.text);
                        }}
                      >
                        Upravit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          if (window.confirm("Opravdu smazat?")) {
                            dispatch({
                              type: "DELETE_COMMENT",
                              payload: {
                                commentId: c.id,
                                taskId: currentTask.id,
                              },
                            });
                          }
                        }}
                      >
                        Smazat
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
