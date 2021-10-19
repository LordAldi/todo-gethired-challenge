import Indicator from "./Indicator";
import { ReactComponent as Edit } from "../media/todo-item-edit-button.svg";
import { ReactComponent as Delete } from "../media/tabler_trash.svg";
import { useState } from "react";
import API from "../API";
const TaskCard = ({ item, onEdit, onDelete }) => {
  const [active, setActive] = useState(item.is_active === 1);

  return (
    <div
      className="p-6 bg-white shadow-lg rounded-lg flex items-center justify-between"
      data-cy="todo-item"
    >
      <div className="flex items-center">
        <input
          data-cy="todo-item-checkbox"
          checked={!active}
          onChange={(e) => {
            setActive(!e.target.checked);
            API.patch(`/todo-items/${item.id}`, { is_active: !active ? 1 : 0 });
          }}
          type="checkbox"
          className="form-checkbox rounded-sm text-blue-400 focus:ring-blue-400 h-5 w-5 mr-5"
        />
        <Indicator priority={item.priority} />
        <p
          style={{ maxWidth: 250 }}
          className={`text-lg ml-4 break-words truncate ${
            !active && "line-through"
          }`}
          data-cy="todo-item-title"
        >
          {item.title}
        </p>
        <div
          className="ml-5 cursor-pointer"
          data-cy="todo-item-edit-button"
          onClick={() =>
            onEdit({
              ...item,
            })
          }
        >
          <Edit />
        </div>
      </div>
      <div
        className="cursor-pointer"
        onClick={() =>
          onDelete({
            ...item,
          })
        }
        data-cy="todo-item-delete-button"
      >
        <Delete />
      </div>
    </div>
  );
};

export default TaskCard;
