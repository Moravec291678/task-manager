import { useTask } from "../context/TaskContext";
import BoardCard from "../components/BoardCard";
import { useState } from "react";

function BoardsPage() {
  const { state, dispatch } = useTask();
  const [boardTitle, setBoardTitle] = useState("");
  return (
    <div className="boards-page">
      <h1 className="boards-page-title">Moje nástěnky</h1>
      <div className="boards-add">
        <input
          className="boards-add-input"
          type="text"
          placeholder="Název nástěnky..."
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
        <button
          className="btn-add"
          onClick={() => {
            if (boardTitle) {
              dispatch({ type: "ADD_BOARD", payload: boardTitle });
              setBoardTitle("");
            }
          }}
        >
          Přidat
        </button>
      </div>
      <div className="boards-grid">
        {state.boards.map((b) => (
          <BoardCard
            key={b.id}
            board={b}
            onDelete={() => dispatch({ type: "DELETE_BOARD", payload: b.id })}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardsPage;