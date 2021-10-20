import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import { ReactComponent as Edit } from "../media/todo-item-edit-button.svg";
import { ReactComponent as Back } from "../media/todo-back-button.svg";

import TaskCard from "../components/TaskCard";
import AddListItemModal from "../components/Modal/AddListItemModal";
import EmptyState from "../components/EmptyState";
import API from "../API";
import { ModalContext } from "../components/Modal/modalContext";
import useFetch from "../components/useFetch";
import { ACTIONS, DataContext } from "../components/DataContext";
import SortButton from "../components/SortButton";

const Detail = () => {
  const { id } = useParams();
  const { dispatch, state } = useContext(DataContext);
  const { handleModal } = useContext(ModalContext);
  const { fetchTask } = useFetch();
  const [editText, setEditText] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    fetchTask(id);
  }, [fetchTask, id]);

  const updateTitle = useCallback(() => {
    API.patch(`/activity-groups/${id}`, { title: state.title });
  }, [id, state.title]);
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
      node.current.focus();
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

          <input
            ref={node}
            value={state.title}
            type="text"
            onBlurCapture={() => {
              updateTitle();
            }}
            onChange={(e) => {
              if (!touch) setTouch(true);
              dispatch({ type: ACTIONS.SET_TITLE, payload: e.target.value });
            }}
            className={`${
              editText ? "block" : "hidden"
            } font-bold text-gray-900 text-4xl bg-transparent focus:outline-none border-b-2 border-gray-900 border-0`}
          />

          <h1
            className={`${
              !editText ? "block" : "hidden"
            } font-bold text-gray-900 text-4xl`}
            onClick={() => {
              setEditText(true);
              node.current.focus();
            }}
            data-cy="todo-title"
          >
            {state.title}
          </h1>

          <div
            className="ml-5 cursor-pointer"
            data-cy="todo-title-edit-button"
            onClick={() => {
              setEditText(true);

              node.current.focus();
            }}
          >
            <Edit />
          </div>
        </div>
        <div className="flex items-center relative ">
          <SortButton />
          <AddButton
            onClick={() => handleModal(<AddListItemModal group_id={id} />)}
            datacy="todo-add-button"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 mt-10">
        {state.loading ? (
          <p>Loading...</p>
        ) : state.task?.length === 0 ? (
          <EmptyState
            onClick={() => handleModal(<AddListItemModal group_id={id} />)}
          />
        ) : (
          state.task?.map((item) => <TaskCard item={item} key={item.id} />)
        )}
      </div>
    </div>
  );
};

export default Detail;
