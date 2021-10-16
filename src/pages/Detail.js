import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import { ReactComponent as Edit } from "../media/todo-item-edit-button.svg";
import { ReactComponent as Back } from "../media/todo-back-button.svg";
import TaskCard from "../components/TaskCard";
import AddListItemModal from "../components/Modal/AddListItemModal";

const TaskData = {
  id: 194,
  title: "New Activity (EDIT)",
  created_at: "2021-10-13T03:50:38.000Z",
  todo_items: [
    {
      id: 183,
      title: "Azaz",
      activity_group_id: 194,
      is_active: 1,
      priority: "very-high",
    },
    {
      id: 136,
      title: "0092023312423820482301332174 5040",
      activity_group_id: 194,
      is_active: 0,
      priority: "high",
    },
  ],
};

const Detail = () => {
  const [title, setTitle] = useState("NewComment");
  const [editText, setEditText] = useState(false);
  const [show, setShow] = useState(false);
  const [showE, setShowE] = useState(false);
  const { id } = useParams();
  const [editData, setEditData] = useState({
    id: 0,
    title: "",
    activity_group_id: id,
    is_active: 1,
    priority: "very-high",
  });

  const node = useRef();

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
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

  return (
    <div>
      <div className="flex align-middle justify-between flex-wrap">
        <div className="flex items-center	">
          <Link to="/">
            <Back />
          </Link>

          {editText ? (
            <input
              ref={node}
              value={title}
              type="text"
              onBlurCapture={() => {
                console.log("CAPTUREEE");
              }}
              onChange={(e) => setTitle(e.target.value)}
              className="font-bold text-gray-900 text-4xl bg-transparent focus:outline-none border-b-2 border-gray-900 border-0"
            />
          ) : (
            <h1
              className="font-bold text-gray-900 text-4xl"
              onClick={() => {
                setEditText(true);
              }}
            >
              {title}
            </h1>
          )}
          <div
            className="ml-5 cursor-pointer"
            onClick={() => {
              setEditText(true);
            }}
          >
            <Edit />
          </div>
        </div>
        <AddButton onClick={() => setShow(true)} />
        <AddListItemModal show={show} setShow={setShow} />
      </div>
      <div className="grid grid-cols-1 gap-3 mt-10">
        {TaskData?.todo_items?.map((item) => (
          <TaskCard
            item={item}
            key={item.id}
            onEdit={(data) => {
              setEditData({ ...data });
              setShowE(true);
            }}
          />
        ))}
        <AddListItemModal
          editText
          data={editData}
          show={showE}
          setShow={setShowE}
        />
      </div>
    </div>
  );
};

export default Detail;
