import { act, createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
const initialState = {
  boards: [],
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
  tasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: String(Date.now()),
            title: action.payload.title,
            columnId: action.payload.columnId,
            desc: "",
            comments: [],
            label: "",
            deadline: { from: "", to: "" },
            done: false,
            order: state.tasks.filter((t) => {
              return t.columnId === action.payload.columnId;
            }).length,
          },
        ],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          return t.id === action.payload.taskId
            ? { ...t, desc: action.payload.desc }
            : t;
        }),
      };
    case "UPDATE_LABEL":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          return t.id === action.payload.taskId
            ? { ...t, label: action.payload.label }
            : t;
        }),
      };
    case "UPDATE_DEADLINE":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          return t.id === action.payload.taskId
            ? {
                ...t,
                deadline: { from: action.payload.from, to: action.payload.to },
              }
            : t;
        }),
      };
    case "TOGGLE_DONE":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          return t.id === action.payload.taskId
            ? {
                ...t,
                done: !t.done,
              }
            : t;
        }),
      };
    case "ADD_COMMENT":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          return t.id === action.payload.taskId
            ? {
                ...t,
                comments: [
                  ...t.comments,
                  {
                    id: Date.now(),
                    text: action.payload.text,
                    date: Date.now(),
                  },
                ],
              }
            : t;
        }),
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          return t.id === action.payload.taskId
            ? {
                ...t,
                comments: t.comments.filter(
                  (c) => c.id !== action.payload.commentId,
                ),
              }
            : t;
        }),
      };
    case "EDIT_COMMENT":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          return t.id === action.payload.taskId
            ? {
                ...t,
                comments: t.comments.map((c) => {
                  return c.id === action.payload.commentId
                    ? {
                        ...c,
                        text: action.payload.newText,
                        date: Date.now(),
                      }
                    : c;
                }),
              }
            : t;
        }),
      };
    case "ADD_COLUMN":
      return {
        ...state,
        columns: [
          ...state.columns,
          {
            id: String(Date.now()),
            title: action.payload.title,
            boardId: action.payload.boardId,
          },
        ],
      };
    case "DELETE_COLUMN":
      const deletedTasksIds = state.tasks
        .filter((t) => t.columnId === action.payload)
        .map((t) => t.id);
      return {
        ...state,
        columns: state.columns.filter((c) => c.id !== action.payload),
        tasks: state.tasks.filter((t) => !deletedTasksIds.includes(t.id)),
      };
    case "RENAME_COLUMN":
      return {
        ...state,
        columns: state.columns.map((c) =>
          c.id === action.payload.columnId
            ? { ...c, title: action.payload.title }
            : c,
        ),
      };
    case "ADD_BOARD":
      const newBoardId = String(Date.now());
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            id: newBoardId,
            icon: action.payload.emoji,
            lastOpened: new Date().toLocaleDateString(),
            title: action.payload.title,
          },
        ],
        columns: [
          ...state.columns,
          { title: "ToDo", id: String(Date.now() + 1), boardId: newBoardId },
          {
            title: "In Progress",
            id: String(Date.now() + 2),
            boardId: newBoardId,
          },
          { title: "Done", id: String(Date.now() + 3), boardId: newBoardId },
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
    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id === action.payload.taskId) {
            return { ...t, columnId: action.payload.newColumnId };
          } else {
            return t;
          }
        }),
      };
    case "REORDER_TASKS":
      const newTasks = state.tasks.filter((t) => {
        return t.columnId === action.payload.newColumnId;
      });
      const orderedTasks = newTasks.sort((a, b) => a.order - b.order);
      const removedTask = orderedTasks.splice(action.payload.sourceIndex, 1);
      orderedTasks.splice(action.payload.destinationIndex, 0, removedTask[0]);
      const reorderedTasks = orderedTasks.map((t, index) => {
        return { ...t, order: index };
      });
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.columnId === action.payload.newColumnId) {
            return reorderedTasks.find((r) => t.id === r.id);
          } else {
            return t;
          }
        }),
      };
    default:
      return state;
  }
}

export const TaskContext = createContext();
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("task")) || initialState,
  );
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(state));
  }, [state]);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
export function useTask() {
  return useContext(TaskContext);
}
