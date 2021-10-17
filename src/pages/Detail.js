import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import { ReactComponent as Edit } from "../media/todo-item-edit-button.svg";
import { ReactComponent as Back } from "../media/todo-back-button.svg";
import TaskCard from "../components/TaskCard";
import AddListItemModal from "../components/Modal/AddListItemModal";
import EmptyState from "../components/EmptyState";
import HashLoader from "react-spinners/HashLoader";
import API from "../API";

const Detail = () => {
  const [title, setTitle] = useState("");
  const [editText, setEditText] = useState(false);
  const [show, setShow] = useState(false);
  const [touch, setTouch] = useState(false);
  const [showE, setShowE] = useState(false);
  const { id } = useParams();
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
  useEffect(() => {
    setLoading(true);
    API.get(`/activity-groups/${id}`)
      .then((res) => {
        setTaskData([...res?.data.todo_items]);
        setTitle(res.data.title);
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
      console.log("masuk");
      updateTitle();
    }
  }, [editText, updateTitle, touch]);
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
      </div>
    </div>
  );
};

export default Detail;
