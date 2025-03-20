import React ,{useState} from 'react';
import { LuDownload } from "react-icons/lu";


const PaymentHistory = () => {
    const [paymentHistory,setPaymentHistory] = useState([
        { date: 'Mar 01, 2025', amount: '$9', description: 'Starter Plan', status: 'Paid' },
        { date: 'Feb 01, 2025', amount: '$9', description: 'Starter Plan', status: 'Paid' },
        { date: 'Jan 01, 2025', amount: '$9', description: 'Starter Plan', status: 'Pending' },
        { date: 'Dec 01, 2024', amount: '$9', description: 'Starter Plan', status: 'Paid' },
        { date: 'Nov 01, 2024', amount: '$9', description: 'Starter Plan', status: 'Paid' },
        { date: 'Oct 01, 2024', amount: '$9', description: 'Starter Plan', status: 'Paid' },
      ])
  return (
   <>
   <div className="bg-white/40 rounded-lg p-6">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-semibold">Payment History</h2>
               <button className="bg-blue-600 text-white flex rounded-lg py-2 px-4 text-sm font-medium gap-3">
               <LuDownload /> <span>Download All</span>
               </button>
             </div>
   
               <table className="w-full bg-white/40 ">
               <thead>
                   <tr className="bg-white/40 divide-y divide-y-reverse divide-gray-300">
                     <th className="px-6 py-3 text-left text-base font-medium text-black ">Date</th>
                     <th className="px-6 py-3 text-left text-base font-medium text-black  ">Amount</th>
                     <th className="px-6 py-3 text-left text-base font-medium text-black  ">Description</th>
                     <th className="px-6 py-3 text-left text-base font-medium text-black  ">Status</th>
                     <th className="px-6 py-3 text-left text-base font-medium text-black  ">Receipt</th>
                   </tr>
                  </thead>
                
                 <tbody className="bg-white/40 divide-y divide-gray-200">
                   {paymentHistory.map((item, index) => (
                     <tr key={index}>
                       <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                       <td className="px-6 py-4 text-sm text-gray-900">{item.amount}</td>
                       <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                       <td className="px-6 py-4 text-sm text-gray-900">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                           {item.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                         <button className="text-blue-600  flex"><LuDownload /> <span className='ml-3'>Download All</span></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            
           </div>
   </>
  );
};

export default PaymentHistory;