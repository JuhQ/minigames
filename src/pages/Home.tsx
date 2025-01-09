import { Link } from "react-router-dom";

const games = [
  { name: "Hangman", path: "/hangman" },
  { name: "Memory", path: "/memory" },
];

// TODO: add playwright test
function Home() {
  return (
    <div>
      <p className="mb-4">minigames is cool, indeed</p>

      <h2 className="text-2xl font-bold">List of games</h2>

      <ul>
        {games.map((game) => (
          <li key={game.name}>
            <Link to={game.path}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
