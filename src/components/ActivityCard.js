import { useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Delete } from "../media/tabler_trash.svg";
import { ModalContext } from "./Modal/modalContext";
import DeleteModal from "./Modal/DeleteModal";
import dayjs from "dayjs";
const ActivityCard = ({ title, created, id }) => {
  const { handleModal } = useContext(ModalContext);
  const date = dayjs(created).format("DD MMMM YYYY");
  return (
    <div
      className="bg-white shadow-lg  rounded-xl h-60 p-6 flex flex-col justify-between "
      data-cy="activity-item"
    >
      <Link
        className="text-lg font-bold h-full cursor-pointer max-w-full"
        to={`/detail/${id}`}
      >
        <h1 className="truncate" data-cy="activity-item-title">
          {title}
        </h1>
      </Link>
      <div className="flex justify-between">
        <div data-cy="activity-item-date">{date}</div>
        <div
          className="cursor-pointer  "
          onClick={() => {
            handleModal(<DeleteModal activity data={{ id, title }} />);
          }}
          data-cy="activity-item-delete-button"
        >
          <Delete />
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
