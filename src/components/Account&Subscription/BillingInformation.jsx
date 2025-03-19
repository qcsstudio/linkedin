import React from 'react';
import { FaCcVisa } from "react-icons/fa";


const BillingInformation = () => {
  return (
    <>
    {/* Billing  */}
          <div className="w-full mt-6 bg-white/40 rounded-lg">
            <div className=" rounded-lg p-6 mb-8 w-full">
              <h2 className="text-2xl font-semibold mb-6">Billing Information</h2>
              <div className="bg-white/40 rounded-lg p-4 flex items-center justify-between mb-4">
                <div className="flex items-center">
                  
                <FaCcVisa  className='w-6 h-6 mr-3'/>
                  <div>
                    <p className="text-lg font-medium">Visa ending with 4242</p>
                    <p className="text-sm font-light text-[#2F2F2F]">Expires 12/27</p>
                  </div>
                </div>
                <button className="text-blue-600 text-base hover:text-blue-800">Edit</button>
              </div>
              <button className="bg-white rounded-lg py-2 px-4 text-sm font-medium">
                + Add Payment Method
              </button>
            </div>
          </div>
    </>
  )
}

export default BillingInformation