import Moment from "react-moment";
import { Link } from "react-router-dom";
import { ReactComponent as Delete } from "../media/tabler_trash.svg";

const ActivityCard = ({ title, created, id }) => {
  return (
    <div className="bg-white shadow-lg  rounded-xl h-60 p-6 flex flex-col justify-between transition-all duration-500 ease-in-out transform hover:scale-105">
      <Link
        className="text-lg font-bold h-full cursor-pointer"
        to={`/detail/${id}`}
      >
        <h1>{title}</h1>
      </Link>
      <div className="flex justify-between">
        <Moment format="DD MMMM YYYY">{created}</Moment>
        <div className="cursor-pointer  transition-all duration-500 ease-in-out transform hover:scale-110 ">
          <Delete />
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;