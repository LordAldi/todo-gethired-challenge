import { ReactComponent as Info } from "../../media/modal-information-icon.svg";
const InfoModal = ({ text }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg flex px-8 py-5  `}
      data-cy="modal-information"
    >
      <Info data-cy="modal-information-icon" />
      <p data-cy="modal-information-title" className="pl-3">
        {text}
      </p>
    </div>
  );
};

export default InfoModal;
