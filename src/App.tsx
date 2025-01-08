import { Route, HashRouter as Router, Routes } from "react-router-dom";

import HangmanPage from "./pages/Hangman";
import Home from "./pages/Home";
import MemoryPage from "./pages/Memory";

function App() {
  return (
    <Router>
      <div className="min-h-screen container m-0 mx-auto dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hangman" element={<HangmanPage />} />
          <Route path="/memory" element={<MemoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
