import emptyStateActImg from "../media/activity-empty-state.png";

const EmptyStateAct = ({ onClick }) => {
  return (
    <div className="flex justify-center mt-28">
      <img
        onClick={onClick}
        src={emptyStateActImg}
        alt="Empty"
        data-cy="activity-empty-state"
      />
    </div>
  );
};

export default EmptyStateAct;
