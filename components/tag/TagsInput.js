import { useRef } from "react";
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import Input from "../form/Input";

export default function TagsInput({ tags, onTagAdd, onTagRemove }) {
  const inputRef = useRef(null);

  //key code
  const { comma, backspace } = {
    comma: 188,
    backspace: 8,
  };

  const handleKeyUp = (e) => {
    const inputValue = inputRef.current.value;
    if (e.keyCode === comma || inputValue.endsWith(",")) {
      const newTag = inputValue.trim().replace(/,/g, "");
      if (!newTag) {
        return;
      }
      onTagAdd(newTag);
      inputRef.current.value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (
      e.keyCode === backspace &&
      inputRef.current?.value === "" &&
      tags.length > 0
    ) {
      const removedTag = tags.pop();
      onTagRemove(removedTag);
      inputRef.current.value = removedTag;
    }
  };

  const tagItems = tags.map((tag, i) => (
    <li
      key={i}
      className="flex items-center gap-x-1 text-sm p-1 font-mono border rounded-md line-clamp-1"
    >
      <span>{tag}</span>
      <button
        type="button"
        className="inline-block text-center"
        onClick={() => onTagRemove(tag)}
      >
        <XMarkIcon
          aria-label={`remove ${tag} tag`}
          aria-hidden="false"
          className="w-4 h-4 hover:text-tertiary-medium"
        />
      </button>
    </li>
  ));

  return (
    <>
      <label htmlFor="tags">Tags</label>
      <ul
        role="list"
        className="flex flex-wrap items-center gap-x-4 gap-y-2 border-primary-medium-low mt-3 border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 w-full dark:bg-primary-high focus-within:border-tertiary-medium hover:border-tertiary-medium"
      >
        {tagItems}
        <li className="flex-1 basis-1/5">
          <Input
            name="tags"
            className="w-full text-sm rounded-md font-mono outline-none dark:bg-primary-high focus:ring-0 focus:border-tertiary-medium focus:outline-0 p-1 hover:border-tertiary-medium"
            ref={inputRef}
            type="text"
            placeholder="type tag..."
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
          />
        </li>
      </ul>
    </>
  );
}
