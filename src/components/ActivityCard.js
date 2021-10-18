import Moment from "react-moment";
import { Link } from "react-router-dom";
import { ReactComponent as Delete } from "../media/tabler_trash.svg";

const ActivityCard = ({ title, created, id, onDelete }) => {
  return (
    <div
      className="bg-white shadow-lg  rounded-xl h-60 p-6 flex flex-col justify-between transition-all duration-500 ease-in-out transform hover:scale-105"
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
        <Moment format="DD MMMM YYYY" data-cy="activity-item-date">
          {created}
        </Moment>
        <div
          className="cursor-pointer  transition-all duration-500 ease-in-out transform hover:scale-110 "
          onClick={() => {
            onDelete({ id, title });
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
