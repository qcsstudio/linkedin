// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React from "react";

// const Frame = () => {
//   // Form field data for mapping
//   const formFields = [
//     { id: "company", label: "Qcs Private Limited", type: "text" },
//     { id: "email", label: "Email", type: "email" },
//     { id: "phone", label: "Phone Number", type: "tel" },
//   ];

//   return (
//     <div className="bg-transparent flex flex-row justify-center w-full">
//       <div className="w-full max-w-[886px] space-y-3">
//         {formFields.map((field, index) => (
//           <div key={field.id} className="relative">
//             <Label
//               htmlFor={field.id}
//               className="absolute top-0 left-[25px] z-10 text-[13px] font-light text-[#2f2f2f] [font-family:'Outfit-Light',Helvetica]"
//             >
//               {field.label}
//             </Label>
//             <Card className="rounded-md border-0 shadow-none">
//               <CardContent className="p-0">
//                 <Input
//                   id={field.id}
//                   type={field.type}
//                   className={`w-full h-[52px] bg-white rounded-md border-0 pl-[26px] pt-[19px] ${index === 0 ? "text-[17px]" : "text-base"} font-light text-[#2f2f2f] [font-family:'Outfit-Light',Helvetica]`}
//                 />
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Frame;