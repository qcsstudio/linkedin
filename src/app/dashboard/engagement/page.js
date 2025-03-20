
"use client"
import dynamic from "next/dynamic";

const EngagementContainer = dynamic(() => import('@/containers/EngagementContainer/EngagementContainer'), {
  ssr: false
});
import React from 'react'

const page = () => {
  return (
    <>
      <EngagementContainer />
    </>
  )
}

export default page
