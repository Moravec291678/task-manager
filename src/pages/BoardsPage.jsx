import { useTask } from "../context/TaskContext";
import BoardCard from "../components/BoardCard";

function BoardsPage() {
  const { state, dispatch } = useTask();
  return (
    <>
      {state.boards.map((b) => {
        return (
          <div key={b.id}>
            <BoardCard board={b}/>
          </div>
        );
      })}
    </>
  );
}

export default BoardsPage;
