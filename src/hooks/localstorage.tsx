import { useCallback, useEffect, useState } from "react";

import debounce from "lodash/debounce";

export function getItemFromLocalstorage<T>(key: string): null | T {
  const item = window?.localStorage.getItem(key);

  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error("Failed to parse localStorage item:", error);
      return null; // or handle as appropriate
    }
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

  const debouncedHandleEvent = useCallback(() => {
    const debouncedFunction = debounce(() => {
      const item = getItemFromLocalstorage<T>(key);
      setInnerValue(item);
    }, 200);
    debouncedFunction();
  }, [key, setInnerValue]);

  useEffect(() => {
    debouncedHandleEvent();

    window?.addEventListener("storage", handleEvent);
    window?.addEventListener(eventName, handleEvent);

    return () => {
      window?.removeEventListener("storage", handleEvent);
      window?.removeEventListener(eventName, handleEvent);
    };
  }, [key, handleEvent, debouncedHandleEvent]);

  return [value, setValue(key, setInnerValue)];
}

export default useLocalStorage;
