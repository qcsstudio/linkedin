import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js Image component

const StatsCard = ({ title, value, iconSrc, trendIconSrc, trendPercentage }) => {
    return (
        <div className='flex flex-col w-[230px] h-[100px] px-2 py-2 gap-4 bg-white/50 rounded-[8px]'>
            <div className='flex gap-4 align-middle items-center'>
                <Image alt='' className='h-[41px] w-[41px]' src={iconSrc} />
                <h3 className='text-[20px]'>{title}</h3>
            </div>
            <div className='flex justify-between'>
                <h2 className='text-[25px] font-bold'>{value}</h2>
                <span className='flex gap-2 justify-center align-middle items-center'>
                    <Image alt='' className='h-[18px] w-[18px]' src={trendIconSrc} />
                    <p className='text-[14px] text-[#858181]'>
                        {trendPercentage}
                    </p>
                </span>
            </div>
        </div>
    );
};

export default StatsCard;