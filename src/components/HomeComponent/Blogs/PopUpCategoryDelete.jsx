const PopUpCategoryDelete = ({ heading, description, popUpOpener, deleteData }) => {
  const handleNo = () => popUpOpener(false);
  const handleYes = () => {
    deleteData();
    popUpOpener(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleNo}
    >
      <div
        className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] bg-white rounded-lg px-6 py-4 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-2 right-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
            onClick={handleNo}
            tabIndex={0}
          >
            X
          </button>
        </div>

        {/* Heading and Description */}
        <h1 className="text-lg font-semibold text-center">{heading}</h1>
        <p className="text-gray-600 text-center">{description}</p>

        {/* Confirmation Buttons */}
        <div className="w-full flex justify-center gap-4 flex-wrap mt-4">
          <button
            className="px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-200"
            onClick={handleYes}
            tabIndex={0}
          >
            Yes
          </button>
          <button
            className="px-6 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-200"
            onClick={handleNo}
            tabIndex={0}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpCategoryDelete;
