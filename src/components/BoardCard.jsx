import { useNavigate } from "react-router-dom";

function BoardCard({ board, onDelete }) {
  const navigate = useNavigate();
  return (
    <div className="board-card">
      <div
        className="board-card-content"
        onClick={() => navigate(`/board/${board.id}`)}
      >
        <span className="board-card-icon">{board.icon}</span>
        <h2 className="board-card-title">{board.title}</h2>
        <p className="board-card-date">{board.lastOpened}</p>
      </div>
      <button className="btn-delete" onClick={onDelete}>
        Smazat
      </button>
    </div>
  );
}

export default BoardCard;