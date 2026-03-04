const initialState = {
  boards: [
    {
      title: "Work",
      icon: "Url",
      lastOpened: "Pred 18 minutami",
      id: "board1",
    },
    {
      title: "School",
      icon: "Url",
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
  ],
};
