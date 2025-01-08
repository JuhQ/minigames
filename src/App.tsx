import { Route, HashRouter as Router, Routes } from "react-router-dom";

import React from "react";

const Home = React.lazy(() => import("./pages/Home"));
const HangmanPage = React.lazy(() => import("./pages/Hangman"));
const MemoryPage = React.lazy(() => import("./pages/Memory"));

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
