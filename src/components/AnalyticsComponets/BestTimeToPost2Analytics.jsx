import { IoLogoFacebook, IoLogoLinkedin } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";

const BestToPost2Analytics = () => {
  const bestTimeToPost = [
    {
      platform: "Instagram",
      times: ["Tuesday, 7:40 PM", "Sunday, 7:40 PM", "Thursday, 7:40 PM"],
      growth: ["+91%", "+91%", "+85%"],
      icon: <RiInstagramFill className="text-[#e440a5] text-2xl" />, 
    },
    {
      platform: "Facebook",
      times: ["Wednesday, 9:40 PM", "Tuesday, 10:30 PM", "Thursday, 7:40 PM"],
      growth: ["+78%", "+82%", "+76%"],
      icon: <IoLogoFacebook className="text-[#1877F2] text-2xl" />, 
    },
    {
      platform: "LinkedIn",
      times: ["Monday, 8:00 AM", "Wednesday, 12:30 PM", "Friday, 7:00 PM"],
      growth: ["+142%", "+118%", "+89%"],
      icon: <IoLogoLinkedin className="text-[#0077B5] text-2xl" />, 
    },
  ];

  return (
    <div className=" flex flex-col gap-2 rounded-lg ">
      <h1 className="font-bold text-lg">Best time to Post</h1>
    <div className="grid grid-cols-3 gap-4">
      {bestTimeToPost.map((item, index) => (
        <div key={index} className="bg-white/60 rounded-lg p-3 shadow">
          <div className="flex items-center gap-2">
            {item.icon}
            <h3 className="text-lg font-semibold">{item.platform}</h3>
          </div>
          <ul className="mt-2">
            {item.times.map((time, i) => (
              <li key={i} className="flex justify-between">
                <span>{time}</span>
                <span className="text-green-500 font-bold">{item.growth[i]}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
  );
};

export default BestToPost2Analytics;
