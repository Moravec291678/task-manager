import { useState } from "react";
import { emojis } from "../utils/emojis";
import { useTask } from "../context/TaskContext";

function BoardModal({ board, onClose }) {
  const { state, dispatch } = useTask();
  const [title, setTitle] = useState(board.title || "");
  const [emojisOpend, setEmojisOpened] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(board.icon || "");
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>Upravit nástěnku</span>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body board-modal-body">
          {emojisOpend ? (
            <div className="emoji-grid">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  className={`emoji-btn ${selectedEmoji === emoji ? "active" : ""}`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
              <button
                className="btn-cancel"
                onClick={(e) => {
                  e.stopPropagation();
                  setEmojisOpened(false);
                }}
              >
                ← Zpět
              </button>
            </div>
          ) : (
            <button
              className="emoji-trigger"
              onClick={(e) => {
                e.stopPropagation();
                setEmojisOpened(true);
              }}
            >
              <span>{selectedEmoji || "🙂"}</span>
              <span>Vybrat emoji</span>
            </button>
          )}
          <input
            className="boards-add-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="modal-desc-actions">
            <button
              className="btn-save"
              onClick={() => {
                dispatch({
                  type: "RENAME_BOARD",
                  payload: {
                    boardId: board.id,
                    newIcon: selectedEmoji,
                    newTitle: title,
                  },
                });
                onClose();
              }}
            >
              Uložit
            </button>
            <button className="btn-cancel" onClick={onClose}>
              Zrušit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardModal;
