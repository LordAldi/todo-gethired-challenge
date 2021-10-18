import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { ReactComponent as Close } from "../../media/modal-add-close-button.svg";
import API from "../../API";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

const AddListItemModal = ({
  show,
  setShow,
  edit = false,
  data = { id: 0, title: "", priority: "very-high" },
  reload,
}) => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("very-high");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit) {
      setName(data.title);
      setPriority(data.priority);
    }
  }, [data, edit]);
  const { id } = useParams();

  const onSubmit = () => {
    setLoading(true);
    if (edit) {
      API.patch("/todo-items/" + data.id, {
        activity_group_id: id,
        title: name,
        priority: priority,
      })
        .then(() => {
          setLoading(false);
          setShow(false);
          reload();
        })
        .catch(() => setLoading(false));
    } else {
      API.post("/todo-items", {
        activity_group_id: id,
        title: name,
        priority: priority,
      })
        .then(() => {
          setLoading(false);
          setShow(false);
          reload();
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <Modal
      className="max-w-4xl w-4/5 shadow-lg rounded-lg"
      show={show}
      onClose={() => setShow(false)}
    >
      <div className="border-b-2 px-8 py-6 flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          {edit ? "Edit" : "Tambah"} List Item
        </h3>
        <div onClick={() => setShow(false)} className="cursor-pointer">
          <Close />
        </div>
      </div>
      <div className="border-b-2 px-8 pt-10 pb-6">
        <div className=" flex flex-col mb-6">
          <label className="text-xs font-semibold mb-2">NAMA LIST ITEM</label>
          <input
            placeholder="Tambahkan nama list item"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="rounded-md px-4 py-3 text-base focus:ring-blue-400"
          />
        </div>
        <div className=" flex flex-col mb-6">
          <label className="text-xs font-semibold mb-2">PRIORITY</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-md px-4 py-3 text-base focus:ring-blue-400 w-48"
          >
            <option value="very-high">Very High</option>
            <option value="high">High</option>
            <option value="normal">Medium</option>
            <option value="low">Low</option>
            <option value="very-low">Very Low</option>
          </select>
        </div>
      </div>
      <div className="px-10 py-4 flex justify-end">
        <button
          onClick={onSubmit}
          className={`px-10 py-4 ${
            loading || name === "" ? "bg-blue-200" : "bg-blue-400"
          }  rounded-full text-white `}
          disabled={loading || name === ""}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <HashLoader color="#ffffff" loading={true} size={15} />
            </div>
          ) : (
            "Simpan"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default AddListItemModal;
