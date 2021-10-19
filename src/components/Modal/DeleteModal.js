import React, { useContext, useState } from "react";
import { ReactComponent as Delete } from "../../media/modal-delete-icon.svg";
import { ModalContext } from "./modalContext";
import InfoModal from "./InfoModal";
import useFetch from "../useFetch";

const DeleteModal = ({ data, activity = false, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { handleModal, setModal } = useContext(ModalContext);
  const { deleteActivity } = useFetch();
  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteActivity(data.id);
      setLoading(false);
      handleModal(<InfoModal text="Activity berhasil dihapus" />);
      setModal(true);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div
      className="bg-white shadow-lg rounded-lg flex flex-col  justify-center items-center px-8 py-5 md:px-12 md:py-16"
      data-cy="modal-delete"
    >
      <Delete data-cy="modal-delete-icon" />
      <div
        className="text-lg font-medium text-center mb-12"
        data-cy="modal-delete-title"
      >
        <p>Apakah anda yakin menghapus {activity ? "activity" : "List Item"}</p>
        <p className="font-bold">"{data.title}"?</p>
      </div>
      <div className="flex justify-center">
        <button
          className=" px-6 py-2 md:px-12 md:py-3 bg-gray-200 rounded-full mr-5"
          data-cy="modal-delete-cancel-button"
          onClick={() => setModal(false)}
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
          {loading ? <p>Loading...</p> : "Simpan"}
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
