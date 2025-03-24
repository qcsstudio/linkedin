"use client"
import BestToPost2Analytics from '@/components/AnalyticsComponets/BestTimeToPost2Analytics';
import BestTimeToPostAnalytics from '@/components/AnalyticsComponets/BestTimeToPostAnalytics';
import FollowersOverview from '@/components/AnalyticsComponets/FollowersOverviewAnalytics';
import HeatMapAnalytics from '@/components/AnalyticsComponets/HeatMapAnalytics';
import ImpressionOverviewAnalytics from '@/components/AnalyticsComponets/ImpressionOverviewAnalytics';
import ReadyToScdeduleAnalytics from '@/components/AnalyticsComponets/ReadyToScdeduleAnalytics';
import TotalOverview from '@/components/AnalyticsComponets/TotalOverviewAnalytics';
import { userContext } from "@/Context/user.context";
import React ,{useContext , useEffect} from 'react'
import { GoPlus } from "react-icons/go";

const AnalyticsContianer = () => {

    const {
      getUserLinkedinProfiles,
      linkedinAccounts,
      getLinkedinOrganizationsProfiles,
      linkedinOrganizationId,
      getOrganizationAnalyticsData,
      oneOrganizationAnalticsData
    } = useContext(userContext);

 useEffect(() => {
    if (linkedinAccounts) {
      getUserLinkedinProfiles();
    }
  }, [linkedinAccounts]);

  useEffect(() => {
    if (linkedinOrganizationId) {
      getLinkedinOrganizationsProfiles();
    }
  }, [linkedinOrganizationId]);

  useEffect(()=>{
    getOrganizationAnalyticsData({id:13740206 ,token:"AQUiuxOcGlVFGu_0lbZ68YyBg_3cpM6dvrzU4fY-cuzpCZHwMu6P9XJg0VAGnoY4zwXcl5iWwA9Co3sGoSyhx9hqTsPGT9daWWV8AdscgRSUgNO3Y9-27DNcGzWgvu8C_FyVkLSTluIgOAL6NmWX7ga0-CwQq6BPqi07SbmYyHxcxGp-9dupUO8D9haLkzStT6VEMMYumgzyiVSEickWav_JcsFVouDcpUP24tURBXygqVrqqPeEIYZGaMqPhvFrdQ7_O93ccc2uHz3javYUBrFcgEY8vRpqHktu1CwFpEtxiMQ6ZDx09dWf2g1oyqEJ8sy0rRrW7UT8JNLfKIoz4Od2qMjZAA"})
  },[])

  console.log("oneOrganizationAnalticsData" ,oneOrganizationAnalticsData)

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
