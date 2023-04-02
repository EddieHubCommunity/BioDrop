import { useEffect, useRef } from "react";

import Input from "./form/input";

export default function SearchInput({ value, onChange }) {
  const inputRef = useRef();

  // Makes autofocus work on search input
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Input
      placeholder="Search user by name or tags, e.g., open source, reactjs"
      inputRef={inputRef}
      name="keyword"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
