import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import BoardsPage from "./pages/BoardsPage";
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Boards</Link>
        <Link to="/board/:1">Board Detail</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BoardsPage />}></Route>
        <Route path="/board/:id" element={<BoardPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
