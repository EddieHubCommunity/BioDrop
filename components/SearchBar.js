import { useEffect, useRef } from "react";

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      placeholder="Search user by name or tags, e.g., open source, reactjs"
      ref={inputRef}
      className="border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4 block w-full"
      name="keyword"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
