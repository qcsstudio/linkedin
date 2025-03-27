import React from 'react'

const Description = ({description}) => {
  return (
    <div className="descriptionContainer lg:w-[80%] text-[#212121]  mb-[1.5rem] md:mb-[3.25rem] lg:mb-[3.25rem] z-20">
                            <p className=" text-sm lg:text-[1rem] font-semibold text-center z-20">{description}</p>
                        </div>
  )
}

export default Description
