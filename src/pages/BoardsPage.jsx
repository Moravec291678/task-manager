import { useTask } from "../context/TaskContext";

function BoardsPage() {
  const { state, dispatch } = useTask();
  return (
    <>
      {state.boards.map((b) => {
        return (
          <div key={b.id}>
            <h1>{b.title}</h1>
          </div>
        );
      })}
    </>
  );
}

export default BoardsPage;
