import { useCallback, useEffect, useState } from "react";

export function getItemFromLocalstorage<T>(key: string): null | T {
  const item = window?.localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return null;
}

const eventName = "localstorage-change";

function setValue<T>(key: string, setInnerValue: (newValue: T) => void) {
  return (newValue: T) => {
    window?.localStorage.setItem(key, JSON.stringify(newValue));
    window?.dispatchEvent(new Event(eventName));

    setInnerValue(newValue);
  };
}

function useLocalStorage<T>(key: string): [null | T, (newValue: T) => void] {
  const [value, setInnerValue] = useState<null | T>(
    getItemFromLocalstorage<T>(key),
  );

  const handleEvent = useCallback(() => {
    const item = getItemFromLocalstorage<T>(key);

    setInnerValue(item);
  }, [key, setInnerValue]);

  useEffect(() => {
    const item = getItemFromLocalstorage<T>(key);

    if (item) {
      setInnerValue(item);
    }

    window?.addEventListener("storage", handleEvent);
    window?.addEventListener(eventName, handleEvent);

    return () => {
      window?.removeEventListener("storage", handleEvent);
      window?.removeEventListener(eventName, handleEvent);
    };
  }, [key, handleEvent]);

  return [value, setValue(key, setInnerValue)];
}

export default useLocalStorage;
