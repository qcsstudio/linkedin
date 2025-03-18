import Privacy from '@/containers/Privacy&Secutitycontainer/Privacy'
import React from 'react'

const page = () => {
  return (
    <>
         <div className="w-[95%] sm:w-[95%] mx-auto mt-8 p-6 bg-white/30 rounded-2xl shadow-md">
         <h1 className="text-2xl font-bold text-black dark:text-white mb-6">Privacy & Setting</h1>
         <Privacy/>
         </div>
    </>
  )
}

export default page