import { useParams } from "react-router-dom";
import { useTask } from "../context/TaskContext";

function BoardPage() {
  const { state, dispatch } = useTask();
  const { id } = useParams();
  const board = state.boards.find((b) => b.id === id);
  const columns = state.columns.filter((c) => c.boardId === id);

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
              return <p key={t.id}>{t.title}</p>;
            })}
          </div>
        );
      })}
    </>
  );
}

export default BoardPage;
