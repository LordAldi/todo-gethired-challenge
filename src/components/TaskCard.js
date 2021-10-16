import Indicator from "./Indicator";
import { ReactComponent as Edit } from "../media/todo-item-edit-button.svg";
import { ReactComponent as Delete } from "../media/tabler_trash.svg";
import { useState } from "react";
import AddListItemModal from "./Modal/AddListItemModal";

const TaskCard = ({ item, onEdit }) => {
  const [active, setActive] = useState(item.is_active === 1);
  const [show, setShow] = useState(false);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex items-center justify-between transition-all duration-500 ease-in-out transform hover:scale-105">
      <div className="flex items-center">
        <input
          checked={!active}
          onChange={(e) => setActive(!e.target.checked)}
          type="checkbox"
          className="form-checkbox rounded-sm text-blue-400 focus:ring-blue-400 h-5 w-5 mr-5"
        />
        <Indicator priority={item.priority} />
        <p
          style={{ maxWidth: 250 }}
          className={`text-lg ml-4 break-words truncate ${
            !active && "line-through"
          }`}
        >
          {item.title}
        </p>
        <div
          className="ml-5 cursor-pointer"
          onClick={() =>
            onEdit({
              id: 183,
              title: "Azaz",
              activity_group_id: 194,
              is_active: 1,
              priority: "very-high",
            })
          }
        >
          <Edit />
        </div>
      </div>
      <div className="cursor-pointer">
        <Delete />
      </div>
    </div>
  );
};

export default TaskCard;
