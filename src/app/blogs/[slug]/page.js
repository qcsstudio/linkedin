import React from 'react'
import SingleBlogPageContainer from "@/containers/SingleBlogPageContainer/SingleBlogPageContainer";



const page = async ({ params }) => {
   if (!params?.slug) {
      return <p className="text-center text-red-500">Blog not found.</p>;
   }


  return (
    <div>
      <SingleBlogPageContainer/>
    </div>
  )
}

export default page
