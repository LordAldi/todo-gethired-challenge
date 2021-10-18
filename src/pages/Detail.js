import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import { ReactComponent as Edit } from "../media/todo-item-edit-button.svg";
import { ReactComponent as Back } from "../media/todo-back-button.svg";
import { ReactComponent as Sort } from "../media/tabler_arrows-sort.svg";
import { ReactComponent as SortI } from "../media/sort-selection-icon.svg";
import { ReactComponent as SortI1 } from "../media/sort-selection-icon (1).svg";
import { ReactComponent as SortI2 } from "../media/sort-selection-icon (2).svg";
import { ReactComponent as SortI3 } from "../media/sort-selection-icon (3).svg";
import { ReactComponent as SortI4 } from "../media/sort-selection-icon (4).svg";
import { ReactComponent as Selected } from "../media/sort-selection-selected.svg";
import TaskCard from "../components/TaskCard";
import AddListItemModal from "../components/Modal/AddListItemModal";
import EmptyState from "../components/EmptyState";
import HashLoader from "react-spinners/HashLoader";
import API from "../API";
import DeleteModal from "../components/Modal/DeleteModal";
import InfoModal from "../components/Modal/InfoModal";

const SortItem = [
  { Icon: SortI, title: "Terbaru" },
  { Icon: SortI1, title: "Terlama" },
  { Icon: SortI4, title: "A-Z" },
  { Icon: SortI3, title: "Z-A" },
  { Icon: SortI2, title: "Belum Selesai" },
];

const Detail = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [editText, setEditText] = useState(false);
  const [show, setShow] = useState(false);
  const [touch, setTouch] = useState(false);
  const [showE, setShowE] = useState(false);
  const [showI, setShowI] = useState(false);
  const [editData, setEditData] = useState({
    id: 0,
    title: "",
    activity_group_id: id,
    is_active: 1,
    priority: "very-high",
  });
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [showD, setShowD] = useState(false);
  const [showS, setShowS] = useState(false);
  const [sort, setSort] = useState("Terbaru");
  useEffect(() => {
    setLoading(true);
    API.get(`/activity-groups/${id}`)
      .then((res) => {
        setTaskData([...res?.data.todo_items]);
        setTitle(res.data.title);
        setSort("Terbaru");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [id, refetch]);
  const updateTitle = useCallback(() => {
    API.patch(`/activity-groups/${id}`, { title });
  }, [title, id]);
  const node = useRef();

  const sortData = (param, n) => {
    const arr = [...n];
    if (param === "Terbaru") {
      arr.sort((a, b) => (a.id === b.id ? 0 : a.id > b.id ? -1 : 1));
    }
    if (param === "Terlama") {
      arr.sort((a, b) => (a.id === b.id ? 0 : a.id < b.id ? -1 : 1));
    }
    if (param === "A-Z") {
      arr.sort((a, b) =>
        a.title === b.title ? 0 : a.title < b.title ? -1 : 1
      );
    }
    if (param === "Z-A") {
      arr.sort((a, b) =>
        a.title === b.title ? 0 : a.title > b.title ? -1 : 1
      );
    }
    if (param === "Belum Selesai") {
      arr.sort((a, b) =>
        a.is_active === b.is_active ? 0 : a.is_active > b.is_active ? -1 : 1
      );
    }
    setTaskData([...arr]);
  };
  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }

    setEditText(false);
  };

  useEffect(() => {
    if (editText) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editText]);

  useEffect(() => {
    if (!editText && touch) {
      updateTitle();
    }
  }, [editText, updateTitle, touch]);
  return (
    <div>
      <div className="flex align-middle justify-between flex-wrap">
        <div className="flex items-center	">
          <Link to="/" data-cy="todo-back-button">
            <Back />
          </Link>

          {editText ? (
            <input
              ref={node}
              value={title}
              type="text"
              onBlurCapture={() => {
                updateTitle();
              }}
              onChange={(e) => {
                if (!touch) setTouch(true);
                setTitle(e.target.value);
              }}
              className="font-bold text-gray-900 text-4xl bg-transparent focus:outline-none border-b-2 border-gray-900 border-0"
            />
          ) : (
            <h1
              className="font-bold text-gray-900 text-4xl"
              onClick={() => {
                setEditText(true);
              }}
              data-cy="todo-title"
            >
              {title}
            </h1>
          )}
          <div
            className="ml-5 cursor-pointer"
            data-cy="todo-title-edit-button"
            onClick={() => {
              setEditText(true);
            }}
          >
            <Edit />
          </div>
        </div>
        <div className="flex items-center relative ">
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
                    sortData(item.title, taskData);
                  }}
                >
                  <div className="flex items-center">
                    <item.Icon
                      className="mr-3"
                      data-cy="sort-selection-selected"
                    />
                    <p data-cy="sort-selection-title">{item.title}</p>
                  </div>
                  <div>
                    {sort === item.title && (
                      <Selected data-cy="sort-selection-selected" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <AddButton onClick={() => setShow(true)} datacy="todo-add-button" />
        </div>

        <AddListItemModal
          show={show}
          setShow={setShow}
          reload={() => setRefetch(refetch + 1)}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 mt-10">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <HashLoader color="#60A5FA" loading={true} size={150} />
          </div>
        ) : taskData?.length === 0 ? (
          <EmptyState onClick={() => setShow(true)} />
        ) : (
          taskData?.map((item) => (
            <TaskCard
              item={item}
              key={item.id}
              onEdit={(data) => {
                setEditData({ ...data });
                setShowE(true);
              }}
              onDelete={(data) => {
                setEditData({ ...data });
                setShowD(true);
              }}
            />
          ))
        )}
        <AddListItemModal
          edit
          data={editData}
          show={showE}
          setShow={setShowE}
          reload={() => setRefetch(refetch + 1)}
        />
        <DeleteModal
          show={showD}
          data={editData}
          setShow={setShowD}
          item="Activity"
          reload={() => {
            setRefetch(refetch + 1);
            setShowI(true);
          }}
        />
        <InfoModal
          show={showI}
          setShow={setShowI}
          text="Activity berhasil dihapus"
        />
      </div>
    </div>
  );
};

export default Detail;
