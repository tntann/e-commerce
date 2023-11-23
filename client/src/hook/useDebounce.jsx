import { useEffect, useState } from "react";

export default function useDebounce(initializeValue, delay) {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initializeValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [initializeValue, delay]);
  return debounceValue;
}
