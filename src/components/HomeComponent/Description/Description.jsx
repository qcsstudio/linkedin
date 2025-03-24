import React from 'react'

const Description = ({description}) => {
  return (
    <div className="descriptionContainer w-[80%] text-[#212121] mb-[3.25rem] z-20">
                            <p className="text-[1rem] font-semibold text-center z-20">{description}</p>
                        </div>
  )
}

export default Description
