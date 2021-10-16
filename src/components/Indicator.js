const Indicator = ({ priority }) => {
  const getColor = () => {
    if (priority === "very-high") return "bg-red-600";
    if (priority === "high") return "bg-yellow-600";
    if (priority === "medium") return "bg-green-600";
    if (priority === "low") return "bg-blue-800";
    return "bg-purle-600";
  };
  return <div className={`rounded-full h-3 w-3 ${getColor()}`}></div>;
};

export default Indicator;
