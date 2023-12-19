import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import Input from "../form/Input";
import { ReactSortable } from "react-sortablejs";
import Notification from "@components/Notification";

export default function TagsInput({
  tags,
  onTagAdd,
  onTagRemove,
  inputRef,
  setTags,
  showNotification,
  setShowNotification,
}) {
  const maxLength = 32;
  const handleKeyUp = (e) => {
    const inputValue = inputRef.current.value;
    if (inputValue.length >= maxLength && e.key !== "Backspace") {
      // '=' sign because in 32 char ',' sign does't count
      setShowNotification({
        show: true,
        type: "error",
        message: "Tag",
        additionalMessage: "Tag limit exceeded",
      });
      return;
    }

    if (e.key === "Comma" || inputValue.endsWith(",") || e.key === "Enter") {
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
      e.key === "Backspace" &&
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
      className="flex items-center gap-x-1 text-sm p-1 font-mono border rounded-md line-clamp-1 hover:cursor-move"
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
      <Notification
        show={showNotification.show}
        type={showNotification.type}
        onClose={() =>
          setShowNotification({ ...showNotification, show: false })
        }
        message={showNotification.message}
        additionalMessage={showNotification.additionalMessage}
      />
      <label htmlFor="tags">Tags</label>
      <div className="flex-1 basis-1/5 my-2">
        <Input
          name="tags"
          className="w-full text-sm rounded-md font-mono outline-none dark:bg-primary-high focus:ring-0 focus:border-tertiary-medium focus:outline-0 p-1 hover:border-tertiary-medium p-2"
          ref={inputRef}
          type="text"
          placeholder="type tag..."
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
      </div>
      {tagItems.length > 0 && (
        <ReactSortable
          tag="ul"
          list={tags}
          setList={setTags}
          swap
          role="list"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 border-primary-medium-low mt-3 border-2 transition-all duration-250 ease-linear rounded px-6 py-2 mb-2 w-full dark:bg-primary-high focus-within:border-tertiary-medium hover:border-tertiary-medium"
        >
          {tagItems}
        </ReactSortable>
      )}
    </>
  );
}
