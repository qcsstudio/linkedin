import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js Image component

const StatsCard = ({ title, value, iconSrc}) => {
    return (
        <div className='flex  px-2 py-2 gap-4 bg-white/50 rounded-[8px]'>
            <div className='flex gap-4 '>
                <Image alt='test' className='h-[41px] w-[41px]' src={iconSrc} />
            </div>
            <div className='flex flex-col'>
               <h3 className='text-[20px]'>{title}</h3>
                <h2 className='text-[25px] font-bold'>{value}</h2>
            </div>
        </div>
    );
};

export default StatsCard;