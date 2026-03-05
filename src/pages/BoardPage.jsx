import { useParams } from "react-router-dom";
import { useTask } from "../context/TaskContext";

function BoardPage() {
  const { state, dispatch } = useTask();
  const { id } = useParams();
  const board = state.boards.find((b) => b.id === id);

  return (
    <>
      <h1>{board.title}</h1>
    </>
  );
}

export default BoardPage;
