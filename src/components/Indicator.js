const Indicator = ({ priority }) => {
  const getColor = () => {
    if (priority === "very-high") return "bg-red-600";
    if (priority === "high") return "bg-yellow-600";
    if (priority === "normal") return "bg-green-600";
    if (priority === "low") return "bg-blue-600";
    return "bg-purple-600";
  };
  return (
    <div
      data-cy="todo-item-priority-indicator"
      className={`rounded-full h-3 w-3  ${getColor()}`}
    ></div>
  );
};

export default Indicator;
