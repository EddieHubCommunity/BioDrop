import { abbreviateNumber } from "../services/utils/abbreviateNumbers";
import Badge from "./Badge";

export default function Tag({ name, total, selected, onClick }) {
  return (
    <Badge content={abbreviateNumber(total)} display={!!total}>
      <div
        onClick={onClick}
        className={`flex flex-row p-1 m-2 rounded-lg text-sm font-mono border-2 cursor-pointer shadow-none ${
          selected
            ? "hover:border-white bg-orange-600 text-white"
            : "hover:border-orange-600"
        }`}
      >
        {name}
      </div>
    </Badge>
  );
}
