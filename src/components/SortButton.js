import { useContext, useState } from "react";
import { ReactComponent as Sort } from "../media/tabler_arrows-sort.svg";
import { ReactComponent as SortI } from "../media/sort-selection-icon.svg";
import { ReactComponent as SortI1 } from "../media/sort-selection-icon (1).svg";
import { ReactComponent as SortI2 } from "../media/sort-selection-icon (2).svg";
import { ReactComponent as SortI3 } from "../media/sort-selection-icon (3).svg";
import { ReactComponent as SortI4 } from "../media/sort-selection-icon (4).svg";
import { ReactComponent as Selected } from "../media/sort-selection-selected.svg";
import { ACTIONS, DataContext } from "./DataContext";
import { sort } from "fast-sort";

const SortItem = [
  { Icon: SortI, title: "Terbaru" },
  { Icon: SortI1, title: "Terlama" },
  { Icon: SortI4, title: "A-Z" },
  { Icon: SortI3, title: "Z-A" },
  { Icon: SortI2, title: "Belum Selesai" },
];

const SortButton = () => {
  const [showS, setShowS] = useState(false);
  const [sortd, setSort] = useState("Terbaru");
  const { dispatch, state } = useContext(DataContext);

  const sortData = (param, n) => {
    let arr = [];
    if (param === "Terbaru") {
      arr = sort(n).desc((u) => u.id);
    }
    if (param === "Terlama") {
      arr = sort(n).asc((u) => u.id);
    }
    if (param === "A-Z") {
      arr = sort(n).asc((u) => u.title);
    }
    if (param === "Z-A") {
      arr = sort(n).desc((u) => u.title);
    }
    if (param === "Belum Selesai") {
      arr = sort(n).desc((u) => u.is_active);
    }
    dispatch({ type: ACTIONS.SET_TASK, payload: arr });
  };

  return (
    <>
      <button
        className="border-gray-300 border-2 rounded-full w-14 h-14 flex justify-center items-center mr-4"
        onClick={() => setShowS(!showS)}
        data-cy="todo-sort-button"
      >
        <Sort />
      </button>
      {showS && (
        <div
          data-cy="sort-parent"
          className="absolute top-full left-0 rounded-lg shadow-lg z-10 bg-white w-60"
        >
          {SortItem.map((item) => (
            <div
              data-cy="sort-selection"
              className="cursor-pointer px-5 py-4 border-b-2 border-gray-200 flex justify-between items-center"
              key={item.title}
              onClick={() => {
                setSort(item.title);
                sortData(item.title, [...state.task]);
              }}
            >
              <div className="flex items-center">
                <item.Icon className="mr-3" data-cy="sort-selection-selected" />
                <p data-cy="sort-selection-title">{item.title}</p>
              </div>
              <div>
                {sortd === item.title && (
                  <Selected data-cy="sort-selection-selected" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SortButton;
