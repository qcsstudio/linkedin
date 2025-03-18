import BestToPost2Analytics from '@/components/AnalyticsComponets/BestTimeToPost2Analytics';
import BestTimeToPostAnalytics from '@/components/AnalyticsComponets/BestTimeToPostAnalytics';
import FollowersOverview from '@/components/AnalyticsComponets/FollowersOverviewAnalytics';
import HeatMapAnalytics from '@/components/AnalyticsComponets/HeatMapAnalytics';
import ImpressionOverviewAnalytics from '@/components/AnalyticsComponets/ImpressionOverviewAnalytics';
import ReadyToScdeduleAnalytics from '@/components/AnalyticsComponets/ReadyToScdeduleAnalytics';
import TotalOverview from '@/components/AnalyticsComponets/TotalOverviewAnalytics';

import React from 'react'
import { GoPlus } from "react-icons/go";

const AnalyticsContianer = () => {
  return (
    <div className='p-8 flex flex-col gap-2'>
        <div className='flex py-5 items-center justify-between'>
        <h1 className='font-semibold text-xl'>Hi,QCS <span className='text-lg font-thin'>keep Moving Forward</span></h1>
        <button className='p-2 z-10 rounded-lg text-sm w-[20%] bg-[#4379EE] text-white flex items-center justify-center'><GoPlus />
        Add Account</button>
        </div>
        <div className='p-6 flex flex-col gap-3 z-10 rounded-lg bg-white/40'>
            <h1 className='font-bold text-lg'>Social Media Engagement</h1>
            <TotalOverview/>
            <FollowersOverview/>
            <ImpressionOverviewAnalytics/>
            <div className="bg-white/50 flex flex-col gap-5 rounded-lg p-5">
            <BestTimeToPostAnalytics/>
            <HeatMapAnalytics/> 
            <BestToPost2Analytics/>
            <ReadyToScdeduleAnalytics/>
            </div>
        </div>
  
      
    </div>
  )
}

export default AnalyticsContianer
