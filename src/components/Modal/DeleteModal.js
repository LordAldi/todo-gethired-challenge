import React, { useState } from "react";
import Modal from "./Modal";
import { ReactComponent as Delete } from "../../media/modal-delete-icon.svg";
import API from "../../API";
import HashLoader from "react-spinners/HashLoader";

const DeleteModal = ({
  item,
  show,
  setShow,
  data,
  reload,
  activity = false,
}) => {
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    API.delete(`${activity ? "/activity-groups/" : "/todo-items/"}` + data.id)
      .then((res) => {
        setLoading(false);
        setShow(false);
        reload();
      })
      .catch(() => setLoading(false));
  };
  return (
    <Modal
      className="max-w-lg w-4/5 shadow-lg rounded-lg flex flex-col items-center px-6 py-8 md:px-12 md:py-16"
      show={show}
      onClose={() => setShow(false)}
      datacy="modal-delete"
    >
      <Delete data-cy="modal-delete-icon" />
      <div
        className="text-lg font-medium text-center mb-12"
        data-cy="modal-delete-title"
      >
        <p>Apakah anda yakin menghapus {item} </p>
        <p className="font-bold">"{data.title}"?</p>
      </div>
      <div className="flex justify-center">
        <button
          className=" px-6 py-2 md:px-12 md:py-3 bg-gray-200 rounded-full mr-5"
          onClick={() => setShow(false)}
          data-cy="modal-delete-cancel-button"
        >
          Batal
        </button>
        <button
          data-cy="modal-delete-confirm-button"
          onClick={() => onDelete()}
          disabled={loading}
          className={`px-6 py-2 md:px-12 md:py-3 ${
            loading ? "bg-red-200" : "bg-red-500"
          }  text-white rounded-full`}
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

export default DeleteModal;
