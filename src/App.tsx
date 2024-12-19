import "./App.css";

import { Route, HashRouter as Router, Routes } from "react-router-dom";

import HangmanPage from "./pages/Hangman";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hangman" element={<HangmanPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
