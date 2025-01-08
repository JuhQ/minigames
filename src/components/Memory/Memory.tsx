import { useEffect, useState } from "react";

import Box from "./Box";
import Reveal from "./Reveal";
import { generateRandomHex } from "./utils copy";
import { getColumnCount } from "./utils";
import shuffle from "lodash/shuffle";
import times from "lodash/times";
import useLocalStorage from "../../hooks/localstorage";
import yesno from "../../utils/yesno";

interface Storage {
  [i: number]: {
    start: Date;
    end?: Date;
  };
}

const defaultSize = 6;

const Memory = (): JSX.Element => {
  const [level, setLevel] = useState<number>(3);
  const [size, setSize] = useState<number>(6);
  const [grid, setGrid] = useState<string[]>([]);
  const [columnCount, setColumnCount] = useState<number>(2);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [selections, setSelections] = useState<number[]>([]);
  const [win, setWin] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [localstorageValue, setLocalstorageValue] =
    useLocalStorage<Storage>("memory");

  useEffect(() => {
    setSize(defaultSize);
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    const colors = times(size)
      .map(generateRandomHex)
      .flatMap((color) => [color, color]);

    setGrid(shuffle(colors));
  }, [size]);

  useEffect(() => {
    if (initialLoad && !localstorageValue) {
      setLocalstorageValue({ [level]: { start: new Date() } });
    }
  }, [initialLoad, localstorageValue, setLocalstorageValue, level]);

  useEffect(() => {
    if (initialLoad && localstorageValue) {
      const maxLevel = Math.max(...Object.keys(localstorageValue).map(Number));

      setLevel(maxLevel);
      setSize(maxLevel * 2);
    }
  }, [initialLoad, localstorageValue, setLevel, setSize]);

  useEffect(() => {
    if (win && localstorageValue && !localstorageValue?.[level].end) {
      const data: Storage = {
        ...localstorageValue,
        [level]: { ...localstorageValue[level], end: new Date() },
      };

      setLocalstorageValue(data);
    }
  }, [win, level, localstorageValue, setLocalstorageValue]);

  useEffect(() => {
    setColumnCount(getColumnCount(level));
  }, [level]);

  useEffect(() => {
    const isWin = revealed.length === size;
    setWin(isWin);
  }, [revealed, size, level]);

  const handleSelection = (color: string, i: number) => {
    if (selectedItem !== i && !revealed.includes(color)) {
      if (color === selectedColor) {
        setRevealed([...revealed, color]);
      }

      if (selections.length < 2) {
        setSelections([...selections, i]);
      } else {
        setSelections([i]);
      }

      if (!selectedColor.length) {
        setSelectedItem(i);
        setSelectedColor(color);
      } else {
        setSelectedItem(null);
        setSelectedColor("");
      }
    }
  };

  const handleNext = () => {
    const data: Storage = {
      ...localstorageValue,
      [level + 1]: { start: new Date() },
    };

    setLocalstorageValue(data);
    setLevel(level + 1);
    setSize(size + 2);
    setSelectedColor("");
    setRevealed([]);
    setSelections([]);
    setWin(false);
  };

  const restartLevel = () => {
    setRevealed([]);
    setSelections([]);
    setSelectedColor("");
    setSelectedItem(null);
    setWin(false);

    const colors = times(size)
      .map(generateRandomHex)
      .flatMap((color) => [color, color]);

    setGrid(shuffle(colors));
  };

  return (
    <div className="min-h-[90vh] w-full mx-auto bg-red-50 rounded-md p-4 text-black">
      Level: {level} Win: {yesno(win)} Done:{" "}
      {((revealed.length / size) * 100).toFixed(2)}%
      <div>
        <div className={`grid grid-cols-${Math.min(columnCount, 12)} gap-1`}>
          {grid.map((color, i) => (
            <div key={`${color}-${i}`}>
              <Box
                onClick={() => handleSelection(color, i)}
                disabled={revealed.includes(color)}
                active={selections.includes(i)}
                color={color}
              />
            </div>
          ))}
        </div>
      </div>
      {win && (
        <button onClick={handleNext} className="m-4">
          Next level
        </button>
      )}
      <button onClick={restartLevel} className="m-4">
        Restart level
      </button>
      <div>
        {revealed.map((color) => (
          <Reveal key={color} color={color} />
        ))}
      </div>
      {/* Tailwind hack to get the classNames to dom */}
      <div className="grid grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12" />
    </div>
  );
};

export default Memory;
