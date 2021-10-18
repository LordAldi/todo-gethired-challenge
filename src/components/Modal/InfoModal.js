import Modal from "./Modal";
import { ReactComponent as Info } from "../../media/modal-information-icon.svg";
const InfoModal = ({ show, setShow, text }) => {
  return (
    <Modal
      className="max-w-lg w-4/5 shadow-lg rounded-lg flex px-8 py-5"
      show={show}
      onClose={() => setShow(false)}
      datacy="modal-information"
    >
      <Info data-cy="modal-information-icon" />
      <p data-cy="modal-information-title" className="pl-3">
        {text}
      </p>
    </Modal>
  );
};

export default InfoModal;
