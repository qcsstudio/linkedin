import SideBar from "@/components/common/SideBar";

const layout = ({ children }) => {
  return (
    <>
      <div className="mainContainer">
        <Navbar />
        <div className="lower">
          <div className="left">
            <SideBar/>
          </div>
          <div className="right">{children}</div>
        </div>
      </div>
    </>
  );
};

export default layout;
