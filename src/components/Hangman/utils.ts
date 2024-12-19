import { catBreeds } from "./words";

type CategoryTuple = [string, string[]];

export const cleanWord = (word: string) =>
  word
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-zA-ZäåöÄÖÅ0-9]/g, "");

const categoryDb: CategoryTuple[] = [["Cat breeds", catBreeds]];

const categories: CategoryTuple[] = categoryDb.map(([category, list]) => [
  category,
  list.map(cleanWord)
]);

export default categories;
