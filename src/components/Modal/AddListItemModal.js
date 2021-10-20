import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as Close } from "../../media/modal-add-close-button.svg";
import { ModalContext } from "./modalContext";
import useFetch from "../useFetch";
import Indicator from "../Indicator";
const options = [
  { value: "very-high", label: "Very High" },
  { value: "high", label: "High" },
  { value: "normal", label: "Medium" },
  { value: "low", label: "Low" },
  { value: "very-low", label: "Very" },
];

const AddListItemModal = ({
  edit = false,
  data = { id: 0, title: "", priority: "very-high" },
  group_id,
}) => {
  const { createTask, editTask } = useFetch();
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("very-high");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { setModal } = useContext(ModalContext);

  useEffect(() => {
    if (edit) {
      setName(data.title);
      setPriority(data.priority);
    }
  }, [data, edit]);
  const onSubmit = async (task) => {
    try {
      console.log("task", task);
      setLoading(true);
      if (edit) {
        await editTask(task);
      } else {
        await createTask(task);
      }

      setLoading(false);
      setModal(false);
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
          <div className="relative">
            <button
              className="flex justify-start items-center rounded-md px-4 py-3 text-base focus:ring-blue-400  w-48 border-2"
              data-cy="modal-add-priority-dropdown"
              onClick={() => setShow(!show)}
            >
              <Indicator priority={priority} className="mr-3" /> {priority}
            </button>

            <div className={`${show ? "absolute" : "hidden"} bg-white`}>
              {options.map((opt) => (
                <div
                  data-cy="modal-add-priority-item"
                  className="flex justify-start items-center  px-4 py-3 text-base focus:ring-blue-400  w-48 border-2 m-0"
                  key={opt.value}
                  onClick={() => {
                    setPriority(opt.value);
                    setShow(false);
                  }}
                >
                  <Indicator priority={opt.value} className="mr-3" />
                  {opt.label}
                </div>
              ))}
            </div>
          </div>
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
              ...data,
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
