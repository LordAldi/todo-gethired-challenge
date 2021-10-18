import emptyStateImg from "../media/todo-empty-state.png";

const EmptyState = ({ onClick }) => {
  return (
    <div className="flex justify-center mt-28">
      <img
        onClick={onClick}
        src={emptyStateImg}
        alt="Empty"
        data-cy="todo-empty-state"
      />
    </div>
  );
};

export default EmptyState;
