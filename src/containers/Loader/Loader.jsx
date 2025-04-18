import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center w-full">
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
    </div>
  );
}

export default Loader;
