import { catBreeds } from "./words";

type CategoryTuple = [string, string[]];

const memo: { [key: string]: string } = {};

export const cleanWord = (word: string) => {
  if (typeof word !== "string") {
    throw new Error("Invalid input: word must be a string.");
  }

  if (memo[word]) {
    return memo[word];
  }

  const cleanedWord = word
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-zA-ZäåöÄÖÅ0-9]/g, "");

  memo[word] = cleanedWord;

  return cleanedWord;
};

const categoryDb: CategoryTuple[] = [["Cat breeds", catBreeds]];

const categories: CategoryTuple[] = categoryDb.map(([category, list]) => [
  category,
  list.map(cleanWord),
]);

export default categories;
