import { useParams } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
  return (
    <div className="board-page">
      <h1 className="board-page-title">{board.title}</h1>
      <div className="columns">
        {columns.map((c) => {
          const columnTasks = state.tasks.filter((t) => t.columnId === c.id);
          return (
            <div className="column" key={c.id}>
              <h2 className="column-title">{c.title}</h2>
              <div className="column-tasks">
                {columnTasks.map((t) => (
                  <div className="task" key={t.id}>
                    <p className="task-title">{t.title}</p>
                    <button
                      className="btn-delete"
                      onClick={() =>
                        dispatch({ type: "DELETE_TASK", payload: t.id })
                      }
                    >
                      Smazat
                    </button>
                  </div>
                ))}
              </div>
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
    </div>
  );
}

export default BoardPage;
