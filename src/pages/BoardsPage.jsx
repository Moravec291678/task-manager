import { useTask } from "../context/TaskContext";
import BoardCard from "../components/BoardCard";
import { useState } from "react";
import { emojis } from "../utils/emojis";

function BoardsPage() {
  const { state, dispatch } = useTask();
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [emojisOpend, setEmojisOpened] = useState(false);
  return (
    <div className="boards-page">
      <h1 className="boards-page-title">Moje nástěnky</h1>
      <div className="boards-add">
        {emojisOpend ? (
          <div className="emoji-grid">
            {emojis.map((emoji) => {
              return (
                <button
                  key={emoji}
                  className={`emoji-btn ${selectedEmoji === emoji ? "active" : ""}`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </button>
              );
            })}
            <button className="btn-cancel" onClick={() => setEmojisOpened(false)}>← Zpět</button>
          </div>
        ) : (
          <button
            className="emoji-trigger"
            onClick={() => setEmojisOpened(true)}
          >
            <span>{selectedEmoji || "🙂"}</span>
            <span>Vybrat emoji</span>
          </button>
        )}

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
              dispatch({
                type: "ADD_BOARD",
                payload: { title: boardTitle, emoji: selectedEmoji },
              });
              setBoardTitle("");
              setEmojisOpened(false);
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
