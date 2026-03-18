import { useNavigate } from "react-router-dom";
function BoardCard({ board, onDelete, onEdit }) {
  const navigate = useNavigate();
  return (
    <div className="board-card">
      <div
        className="board-card-content"
        onClick={() => navigate(`/board/${board.id}`)}
      >
        <div className="board-card-top">
          <div className="board-wrapper">
            <span className="board-card-icon">{board.icon}</span>
            <h2 className="board-card-title">{board.title}</h2>
          </div>
          <button
            className="board-card-edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            ···
          </button>
        </div>
      </div>
      <div className="board-card-footer">
        <p className="board-card-date">{board.lastOpened}</p>
        <button
          className="btn-delete"
          onClick={() => {
            if (window.confirm("Opravdu smazat?")) return onDelete();
          }}
        >
          Smazat
        </button>
      </div>
    </div>
  );
}

export default BoardCard;
