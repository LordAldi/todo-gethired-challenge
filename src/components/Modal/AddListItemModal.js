import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as Close } from "../../media/modal-add-close-button.svg";
import { ModalContext } from "./modalContext";
import useFetch from "../useFetch";

const AddListItemModal = ({
  edit = false,
  data = { id: 0, title: "", priority: "very-high" },
  group_id,
}) => {
  const { createTask, fetchTask } = useFetch();
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("very-high");
  const [loading, setLoading] = useState(false);
  const { setModal } = useContext(ModalContext);

  useEffect(() => {
    if (edit) {
      setName(data.title);
      setPriority(data.priority);
    }
  }, [data, edit]);
  const onSubmit = async (task) => {
    try {
      setLoading(true);
      await createTask(task);
      setLoading(false);
      setModal(false);
      await fetchTask(group_id);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div
      className=" max-w-4xl w-full bg-white shadow-lg rounded-lg flex flex-col  justify-start "
      data-cy="modal-add"
    >
      <div className="border-b-2 px-8 py-6 flex justify-between items-center">
        <h3 className="font-semibold text-lg" data-cy="modal-add-title">
          {edit ? "Edit" : "Tambah"} List Item
        </h3>

        <div
          onClick={() => setModal(false)}
          className="cursor-pointer"
          data-cy="modal-add-close-button"
        >
          <Close />
        </div>
      </div>
      <div className="border-b-2 px-8 pt-10 pb-6">
        <div className=" flex flex-col mb-6">
          <label
            className="text-xs font-semibold mb-2"
            data-cy="modal-add-name-title"
          >
            NAMA LIST ITEM
          </label>
          <input
            placeholder="Tambahkan nama list item"
            type="text"
            value={name}
            data-cy="modal-add-name-input"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="rounded-md px-4 py-3 text-base focus:ring-blue-400 w-96"
          />
        </div>
        <div className=" flex flex-col mb-6">
          <label
            className="text-xs font-semibold mb-2"
            data-cy="modal-add-priority-title"
          >
            PRIORITY
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-md px-4 py-3 text-base focus:ring-blue-400 w-48"
            data-cy="modal-add-priority-dropdown"
          >
            <option data-cy="modal-add-priority-item" value="very-high">
              Very High
            </option>
            <option data-cy="modal-add-priority-item" value="high">
              High
            </option>
            <option data-cy="modal-add-priority-item" value="normal">
              Medium
            </option>
            <option data-cy="modal-add-priority-item" value="low">
              Low
            </option>
            <option data-cy="modal-add-priority-item" value="very-low">
              Very Low
            </option>
          </select>
        </div>
      </div>
      <div className="px-10 py-4 flex justify-end">
        <button
          className={`px-10 py-4 ${
            loading || name === "" ? "bg-blue-200" : "bg-blue-400"
          }  rounded-full text-white `}
          disabled={loading || name === ""}
          data-cy="modal-add-save-button"
          onClick={() =>
            onSubmit({
              activity_group_id: group_id,
              title: name,
              priority: priority,
            })
          }
        >
          {loading ? <p>Loading...</p> : "Simpan"}
        </button>
      </div>
    </div>
  );
};

export default AddListItemModal;

// const onSubmit = () => {
//   setLoading(true);
//   if (edit) {
//     API.patch("/todo-items/" + data.id, {
//       activity_group_id: id,
//       title: name,
//       priority: priority,
//     })
//       .then(() => {
//         setLoading(false);
//         setShow(false);
//         reload();
//       })
//       .catch(() => setLoading(false));
//   } else {
//     API.post("/todo-items", {
//       activity_group_id: id,
//       title: name,
//       priority: priority,
//     })
//       .then(() => {
//         setLoading(false);
//         setShow(false);
//         reload();
//       })
//       .catch(() => setLoading(false));
//   }
// };
