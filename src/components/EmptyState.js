import emptyStateImg from "../media/todo-empty-state.png";

const EmptyState = () => {
  return (
    <div className="flex justify-center mt-28">
      <img src={emptyStateImg} alt="Empty" />
    </div>
  );
};

export default EmptyState;
