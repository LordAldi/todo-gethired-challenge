import { ReactComponent as Plus } from "../media/Plus.svg";

const AddButton = ({ onClick, datacy }) => {
  return (
    <button
      data-cy={datacy}
      onClick={onClick}
      className=" mt-3 sm:mt-0 bg-blue-400 hover:bg-blue-300  text-white py-3 px-7 rounded-full text-lg flex justify-center"
    >
      <Plus className="mr-4" />
      Tambah
    </button>
  );
};

export default AddButton;
