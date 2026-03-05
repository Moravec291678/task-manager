import { useNavigate } from "react-router-dom";
function BoardCard({ board }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/board/${board.id}`)}>
      <img src={board.icon} alt={board.title} />
      <h2>{board.title}</h2>
      <p>{board.lastOpened}</p>
    </div>
  );
}

export default BoardCard;
