import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  EllipsisVertical,
  GripVertical,
  MoveDown,
  MoveUp,
  Trash2,
} from "lucide-react";
import { useState } from "react";

function Card({
  id,
  src,
  name,
  price,
  type,
  handleToTop,
  handleToBottom,
  handleRemove,
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleMenuClick = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="relative my-2 flex flex-row justify-between items-center bg-[#F7F7F7] border shadow-md rounded-lg p-2 gap-16"
      data-no-dnd="true"
    >
      <div className="relative flex flex-row justify-center items-center gap-3">
        <GripVertical className="text-[#7F7F7F] cursor-grabbing" />
        <img src={src} alt="" height={"75px"} width={"135px"} />
        <p>{name}</p>
      </div>
      <div className="relative flex flex-row justify-center items-center gap-3">
        <p>{price}</p>
        <div
          onClick={handleMenuClick}
          className="bg-[#DBFFCE] rounded-md px-2 py-0.5 border border-[#7E7E7E]"
        >
          {type}
        </div>
        <EllipsisVertical
          className="cursor-pointer z-10"
          onClick={handleMenuClick}
        />
        {isMenuVisible && (
          <div className="absolute -bottom-28 -right-32 bg-[#F7F7F7] rounded-lg flex flex-col justify-center items-start gap-2 p-2 z-50">
            <button
              onClick={() => {
                handleToTop(id);
                setIsMenuVisible((prev) => !prev);
              }}
              className="flex flex-row justify-center items-center gap-2 text-black"
            >
              <MoveUp /> Move To Top
            </button>
            <button
              onClick={() => {
                handleToBottom(id);
                setIsMenuVisible((prev) => !prev);
              }}
              className="flex flex-row justify-center items-center gap-2 text-black"
            >
              <MoveDown /> Move To Bottom
            </button>
            <button
              onClick={() => {
                handleRemove(id);
                setIsMenuVisible((prev) => !prev);
              }}
              className="flex flex-row justify-center items-center gap-2 text-[#FA2D2D]"
            >
              <Trash2 /> Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
