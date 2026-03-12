import { useParams } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { useState } from "react";

function BoardPage() {
  const { state, dispatch } = useTask();
  const { id } = useParams();
  const board = state.boards.find((b) => b.id === id);
  const columns = state.columns.filter((c) => c.boardId === id);
  const [inputs, setInputs] = useState({});
  return (
    <>
      <h1>{board.title}</h1>
      {columns.map((c) => {
        const columnTasks = state.tasks.filter((t) => {
          return t.columnId === c.id;
        });
        return (
          <div key={c.id}>
            <h2>{c.title}</h2>
            {columnTasks.map((t) => {
              return (
                <div key={t.id}>
                  <p>{t.title}</p>
                  <button
                    onClick={() =>
                      dispatch({ type: "DELETE_TASK", payload: t.id })
                    }
                  >
                    Smazat
                  </button>
                </div>
              );
            })}
            <input
              type="text"
              value={inputs[c.id] || ""}
              onChange={(e) => setInputs({ ...inputs, [c.id]: e.target.value })}
            />
            <button
              onClick={() => {
                setInputs({ ...inputs, [c.id]: "" });
                dispatch({
                  type: "ADD_TASK",
                  payload: { title: inputs[c.id], columnId: c.id },
                });
              }}
            >
              Pridat
            </button>
          </div>
        );
      })}
    </>
  );
}

export default BoardPage;
