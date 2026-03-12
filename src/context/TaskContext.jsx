import { createContext, useContext, useReducer } from "react";
const initialState = {
  boards: [
    {
      title: "Work",
      icon: "💼",
      lastOpened: "Pred 18 minutami",
      id: "board1",
    },
    {
      title: "School",
      icon: "💼",
      lastOpened: "4 dny",
      id: "board2",
    },
  ],
  columns: [
    {
      title: "To Do",
      id: "col1",
      boardId: "board1",
    },
    {
      title: "In Progress",
      id: "col2",
      boardId: "board1",
    },
    {
      title: "Done",
      id: "col3",
      boardId: "board1",
    },
    {
      title: "To Do",
      id: "col4",
      boardId: "board2",
    },
    {
      title: "In Progress",
      id: "col5",
      boardId: "board2",
    },
    {
      title: "Done",
      id: "col6",
      boardId: "board2",
    },
  ],
  tasks: [
    {
      title: "Research competitors",
      id: "task1",
      columnId: "col1",
    },
    {
      title: "Write copy for landing page",
      id: "task2",
      columnId: "col1",
    },
    {
      title: "Set up analytics",
      id: "task3",
      columnId: "col1",
    },
    {
      title: "Research competitors",
      id: "task4",
      columnId: "col4",
    },
    {
      title: "Write copy for landing page",
      id: "task5",
      columnId: "col4",
    },
    {
      title: "Set up analytics",
      id: "task6",
      columnId: "col4",
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            title: action.payload.title,
            columnId: action.payload.columnId,
          },
        ],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case "ADD_BOARD":
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            id: Date.now(),
            icon: "💼",
            lastOpened: new Date().toLocaleDateString(),
            title: action.payload,
          },
        ],
      };
    case "DELETE_BOARD":
      const deletedColumnIds = state.columns
        .filter((c) => c.boardId === action.payload)
        .map((c) => c.id);
      return {
        ...state,
        boards: state.boards.filter((b) => b.id !== action.payload),
        columns: state.columns.filter((c) => c.boardId !== action.payload),
        tasks: state.tasks.filter(
          (t) => !deletedColumnIds.includes(t.columnId),
        ),
      };
    default:
      return state;
  }
}

export const TaskContext = createContext();
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
export function useTask() {
  return useContext(TaskContext);
}
