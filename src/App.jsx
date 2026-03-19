import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import BoardsPage from "./pages/BoardsPage";
import { TaskProvider } from "./context/TaskContext";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <nav className="navbar">
          <div className="navbar-logo">TaskManager</div>
          <div className="navbar-links">
            <Link className="navbar-link" to="/">
              Nástěnky
            </Link>
          </div>
        </nav>
        <main className="main-content">
          <Toaster position="bottom-right" />
          <Routes>
            <Route path="/" element={<BoardsPage />} />
            <Route path="/board/:id" element={<BoardPage />} />
          </Routes>
        </main>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
