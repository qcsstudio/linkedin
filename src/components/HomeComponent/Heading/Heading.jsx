import React from 'react'

const Heading = ({heading}) => {
  return (
    <div className='upperContainer w-[100%] z-20'>
                        <p className="aboutHeading text-[2rem] md:text-[5rem] lg:text-[6.25rem] z-20 text-center opacity-30 ">{heading}</p>
                    </div>
  )
}

export default Heading
