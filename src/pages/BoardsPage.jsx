import { useTask } from "../context/TaskContext";
import BoardCard from "../components/BoardCard";
import { useEffect, useState } from "react";
import { emojis } from "../utils/emojis";
import BoardModal from "../components/BoardModal";
import toast from "react-hot-toast";
function BoardsPage() {
  const { state, dispatch } = useTask();
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [emojisOpened, setEmojisOpened] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);

  return (
    <div
      className="boards-page"
      onKeyDown={(e) => {
        if (e.key === "Escape" && emojisOpened) {
          setEmojisOpened(false);
        }
      }}
    >
      <h1 className="boards-page-title">Moje nástěnky</h1>
      <div className="boards-add">
        {emojisOpened ? (
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
            <button
              className="btn-cancel"
              onClick={() => setEmojisOpened(false)}
            >
              ← Zpět
            </button>
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && boardTitle) {
              dispatch({
                type: "ADD_BOARD",
                payload: { title: boardTitle, emoji: selectedEmoji },
              });
              toast.success("Nástěnka přidána!");
              setBoardTitle("");
              setEmojisOpened(false);
            }
            if (e.key === "Escape") {
              setBoardTitle("");
              setEmojisOpened(false);
            }
          }}
        />
        <button
          className="btn-add"
          onClick={() => {
            if (boardTitle) {
              dispatch({
                type: "ADD_BOARD",
                payload: { title: boardTitle, emoji: selectedEmoji },
              });
              toast.success("Nástěnka přidána!");
              setBoardTitle("");
              setEmojisOpened(false);
            }
          }}
        >
          Přidat
        </button>
      </div>

      {state.boards.length === 0 && (
        <div className="noBoards">
          <span>{selectedEmoji || "🙂"}</span>
          <h2>Zatím nemáš žádné nástěnky</h2>
          <p>Vytvoř první kliknutím na tlačítko Přidat</p>
        </div>
      )}
      <div className="boards-grid">
        {state.boards.map((b) => (
          <BoardCard
            onEdit={() => setEditingBoard(b)}
            key={b.id}
            board={b}
            onDelete={() => {
              dispatch({ type: "DELETE_BOARD", payload: b.id });
              toast.success("Nástěnka smazána!");
            }}
          />
        ))}
      </div>
      {editingBoard && (
        <BoardModal
          board={editingBoard}
          onClose={() => {setEditingBoard(null);}}
        />
      )}
    </div>
  );
}

export default BoardsPage;
