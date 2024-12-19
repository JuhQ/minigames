import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <p className="mb-4">minigames is cool, indeed</p>

      <h2 className="text-2xl font-bold">List of games</h2>

      <ul>
        <li>
          <Link to="/hangman">Hangman</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
