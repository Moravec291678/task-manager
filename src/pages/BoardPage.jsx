import { useParams } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function BoardPage() {
  const { state, dispatch } = useTask();
  const { id } = useParams();
  const board = state.boards.find((b) => b.id === id);
  const columns = state.columns.filter((c) => c.boardId === id);
  const [inputs, setInputs] = useState({});
  if (!board) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Board nenalezen</h2>
        <Link to="/">Zpět na nástěnky</Link>
      </div>
    );
  }
  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    dispatch({
      type: "MOVE_TASK",
      payload: {
        taskId: result.draggableId,
        newColumnId: result.destination.droppableId,
      },
    });
  };
  return (
    <div className="board-page">
      <h1 className="board-page-title">{board.title}</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns">
          {columns.map((c) => {
            const columnTasks = state.tasks.filter((t) => t.columnId === c.id);
            return (
              <div className="column" key={c.id}>
                <h2 className="column-title">{c.title}</h2>
                <Droppable droppableId={c.id}>
                  {(provided) => (
                    <div
                      className="column-tasks"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {columnTasks.map((t, index) => (
                        <Draggable
                          draggableId={String(t.id)}
                          index={index}
                          key={t.id}
                        >
                          {(provided) => (
                            <div
                              className="task"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <p className="task-title">{t.title}</p>
                              <button
                                className="btn-delete"
                                onClick={() =>
                                  dispatch({
                                    type: "DELETE_TASK",
                                    payload: t.id,
                                  })
                                }
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
        </div>
      </DragDropContext>
    </div>
  );
}

export default BoardPage;
