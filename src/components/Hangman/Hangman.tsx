import { useCallback, useEffect, useState } from "react";

import HangmanSvg from "./HangmanSvg";
import { catBreeds } from "./words";
import categories from "./utils";
import sample from "lodash/sample";
import yesno from "../../utils/yesno";

interface HandleSelectCategory {
  category: string;
  list: string[];
}

const fallbackWord = "cat";

const getRandomWord = (list: string[]): string =>
  (sample(list) as string)?.toLowerCase() ?? fallbackWord;

const Hangman = () => {
  const [word, setWord] = useState<string>("");
  const [words, setWords] = useState<string[]>(catBreeds);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Cat breeds");
  const [displayedWord, setDisplayedWord] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const resetGame = useCallback(() => {
    const randomWord = getRandomWord(words);
    setWord(randomWord);
    setDisplayedWord(randomWord.split("").map(() => "_"));
    setGuessedLetters(new Set());
    setIncorrectGuesses(0);
    setGameOver(false);
  }, [words]);

  const selectCategory = ({ category, list }: HandleSelectCategory) => {
    const randomWord = getRandomWord(list);
    setWords(list);
    setWord(randomWord);
    setDisplayedWord(randomWord.split("").map(() => "_"));
    setSelectedCategory(category);
    setGuessedLetters(new Set());
    setIncorrectGuesses(0);
    setGameOver(false);
  };

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase().trim();
      const isEnter = letter === "enter";

      if (isEnter) {
        resetGame();
      }

      const isValid =
        letter.length && !isEnter && !guessedLetters.has(letter) && !gameOver;

      if (isValid) {
        setGuessedLetters(new Set([...Array.from(guessedLetters), letter]));

        if (!word.includes(letter)) {
          setIncorrectGuesses(incorrectGuesses + 1);
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [guessedLetters, incorrectGuesses, word, gameOver, resetGame]);

  useEffect(() => {
    const newDisplayedWord = word
      .split("")
      .map((letter) => (guessedLetters.has(letter) ? letter : "_"));
    setDisplayedWord(newDisplayedWord);
    const correctGuesses = newDisplayedWord.filter((letter) => letter !== "_");

    if (correctGuesses.length === word.length && word.length > 0) {
      setGameOver(true);
    }
  }, [guessedLetters, word]);

  useEffect(() => {
    if (incorrectGuesses >= 6) {
      setGameOver(true);
    }
  }, [incorrectGuesses]);

  return (
    <div className="min-h-[90vh] m-4">
      <div className="p-2">
        This game requires keyboard to function, does not work on mobile.
      </div>
      <div className="text-xl">
        <div>Category: {selectedCategory}</div>
        <div>Guesses left: {6 - incorrectGuesses}</div>
        <div>Guessed Letters: {Array.from(guessedLetters).join(", ")}</div>
      </div>
      <div className="text-xl">
        <div>Word: {displayedWord.join(" ")}</div>
      </div>

      {gameOver && (
        <>
          <div>Win: {yesno(incorrectGuesses < 6)}</div>
          <div>Word was: {word}</div>
          <button onClick={resetGame}>Play Again</button>
        </>
      )}

      <div>
        <HangmanSvg incorrectGuesses={incorrectGuesses} />
      </div>

      <p className="m-4">
        <span className="mr-2">Select category:</span>
        {categories.map(([category, list]) => (
          <button
            key={category}
            onClick={() => selectCategory({ category, list })}
            className="mr-2"
          >
            {category}
          </button>
        ))}
      </p>
    </div>
  );
};

export default Hangman;
