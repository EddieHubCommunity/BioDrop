import { useState } from "react";
import Avatar from "./Avatar";
import { classNames } from "@services/utils/classNames";

export default function AvatarGroup({
  items,
  itemsSize,
  className,
  borderedItems,
  itemsBorderColor,
  afterTruncate = 4,
}) {
  const [showAllItems, setShowAllItems] = useState(false);
  const displayedItems = showAllItems ? items : items.slice(0, afterTruncate);

  return (
    <ul
      className={classNames(
        "flex flex-wrap items-center",
        className,
        showAllItems && "gap-1.5",
      )}
    >
      {displayedItems.map((item) => (
        <li
          key={item.id}
          className={classNames("-ml-1", showAllItems && "ml-0")}
        >
          <Avatar
            size={itemsSize}
            href={item.href || undefined}
            alt={item.alt}
            src={item.image}
            isBordered={borderedItems}
            borderColor={itemsBorderColor}
          />
        </li>
      ))}
      {!showAllItems && items.length > afterTruncate && (
        <li>
          <button
            onClick={() => setShowAllItems(true)}
            className="text-xs ml-1 hover:underline"
          >
            {`+${items.slice(afterTruncate - 1, -1).length} more`}
          </button>
        </li>
      )}
    </ul>
  );
}
