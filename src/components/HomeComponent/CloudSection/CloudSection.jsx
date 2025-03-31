import Image from "next/image";
const CloudSection = ({ bottom, left, opacity = 1, width = "100vw" }) => {
    return (
      <div
        className="clouds hidden md:block lg:block animate-cloudMove absolute z-0"
        style={{ bottom: `${bottom}%`, left: `${left}%`, opacity, width }}
      >
        <Image
          src="/images/homeImages/cloud.png"
          width={1024}
          height={1024}
          alt="cloud"
          className="w-full h-auto z-20"
        />
      </div>
    );
  };
  

export default CloudSection;
