import { useParams } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskModal from "../components/TaskModal";

function BoardPage() {
  const { state, dispatch } = useTask();
  const { id } = useParams();
  const board = state.boards.find((b) => b.id === id);
  const columns = state.columns.filter((c) => c.boardId === id);
  const [inputs, setInputs] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const [openMenu, setOpenMenu] = useState();
  const [renamingColumnId, setRenamingColumnId] = useState();
  const [renameColumnValue, setRenameColumnValue] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  if (!board) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Board nenalezen</h2>
        <Link to="/">Zpět na nástěnky</Link>
      </div>
    );
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.droppableId === result.destination.droppableId) {
      dispatch({
        type: "REORDER_TASKS",
        payload: {
          sourceIndex: result.source.index,
          destinationIndex: result.destination.index,
          newColumnId: result.source.droppableId,
        },
      });
    } else {
      dispatch({
        type: "MOVE_TASK",
        payload: {
          taskId: result.draggableId,
          newColumnId: result.destination.droppableId,
        },
      });
    }
  };

  return (
    <div className="board-page" onClick={() => setOpenMenu(null)}>
      <h1 className="board-page-title">{board.title}</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns">
          {columns.map((c) => {
            const columnTasks = state.tasks.filter((t) => t.columnId === c.id);
            return (
              <div className="column" key={c.id}>
                <div className="column-header">
                  {renamingColumnId === c.id ? (
                    <div className="column-rename">
                      <input
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            dispatch({
                              type: "RENAME_COLUMN",
                              payload: {
                                columnId: c.id,
                                title: renameColumnValue,
                              },
                            });
                            setRenamingColumnId(null);
                          }
                          if (e.key === "Escape") {
                            setRenamingColumnId(null);
                          }
                        }}
                        className="column-rename-input"
                        type="text"
                        value={renameColumnValue}
                        onChange={(e) => setRenameColumnValue(e.target.value)}
                      />
                      <button
                        className="btn-save"
                        onClick={() => {
                          dispatch({
                            type: "RENAME_COLUMN",
                            payload: {
                              columnId: c.id,
                              title: renameColumnValue,
                            },
                          });
                          setRenamingColumnId(null);
                        }}
                      >
                        Uložit
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => setRenamingColumnId(null)}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <h2 className="column-title">{c.title}</h2>
                  )}

                  <button
                    className="column-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === c.id ? null : c.id);
                    }}
                  >
                    ···
                  </button>

                  {openMenu === c.id && (
                    <div className="dropdown">
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setRenamingColumnId(c.id);
                          setRenameColumnValue(c.title);
                          setOpenMenu(null);
                        }}
                      >
                        Přejmenovat
                      </button>
                      <button
                        className="dropdown-item dropdown-item--danger"
                        onClick={() => {
                          if (window.confirm("Opravdu smazat?")) {
                            dispatch({ type: "DELETE_COLUMN", payload: c.id });
                            setOpenMenu(null);
                          }
                        }}
                      >
                        Smazat
                      </button>
                    </div>
                  )}
                </div>

                <Droppable droppableId={c.id}>
                  {(provided) => (
                    <div
                      className="column-tasks"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {[...columnTasks]
                        .sort((a, b) => a.order - b.order)
                        .map((t, index) => (
                          <Draggable
                            draggableId={String(t.id)}
                            index={index}
                            key={t.id}
                          >
                            {(provided) => (
                              <div
                                onClick={() => setSelectedTask(t)}
                                className="task"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <p className="task-title">{t.title}</p>
                                {t.label && (
                                  <div className={`task-label ${t.label}`} />
                                )}
                                <button
                                  className="btn-delete"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm("Opravdu smazat?")) {
                                      dispatch({
                                        type: "DELETE_TASK",
                                        payload: t.id,
                                      });
                                    }
                                  }}
                                >
                                  Smazat
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <div className="column-add">
                  <input
                    className="column-add-input"
                    type="text"
                    placeholder="Nový úkol..."
                    value={inputs[c.id] || ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, [c.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && inputs[c.id]) {
                        dispatch({
                          type: "ADD_TASK",
                          payload: { title: inputs[c.id], columnId: c.id },
                        });
                        setInputs({ ...inputs, [c.id]: "" });
                      }
                    }}
                  />
                  <button
                    className="btn-add"
                    onClick={() => {
                      if (inputs[c.id]) {
                        dispatch({
                          type: "ADD_TASK",
                          payload: { title: inputs[c.id], columnId: c.id },
                        });
                        setInputs({ ...inputs, [c.id]: "" });
                      }
                    }}
                  >
                    Přidat
                  </button>
                </div>
              </div>
            );
          })}

          {/* PŘIDAT SLOUPEC */}
          <div className="column-add-new">
            {showInput ? (
              <div className="column-add-new-form">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && columnTitle) {
                      dispatch({
                        type: "ADD_COLUMN",
                        payload: { title: columnTitle, boardId: id },
                      });
                      setColumnTitle("");
                      setShowInput(false);
                    }
                    if (e.key === "Escape") {
                      setColumnTitle("");
                      setShowInput(false);
                    }
                  }}
                  className="column-add-new-input"
                  type="text"
                  placeholder="Název sloupce..."
                  value={columnTitle}
                  onChange={(e) => setColumnTitle(e.target.value)}
                />
                <div className="column-add-new-actions">
                  <button
                    className="btn-add"
                    onClick={() => {
                      if (columnTitle) {
                        dispatch({
                          type: "ADD_COLUMN",
                          payload: { title: columnTitle, boardId: id },
                        });
                        setColumnTitle("");
                        setShowInput(false);
                      }
                    }}
                  >
                    Uložit
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => setShowInput(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="btn-add-column"
                onClick={() => setShowInput(true)}
              >
                + Přidat sloupec
              </button>
            )}
          </div>
        </div>
      </DragDropContext>

      {selectedTask && (
        <TaskModal onClose={() => setSelectedTask(null)} task={selectedTask} />
      )}
    </div>
  );
}

export default BoardPage;
