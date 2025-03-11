'use client'
import React, { useContext } from 'react'
import AccountComponent from './AccountComponent';
import AnalyticsComponent from './AnalyticsComponent';
import CreatePost from './CreatePost';
import Engagement from './Engagement';
import ScheduledPost from './ScheduledPost';
import Settings from './Settings';

import HomeComponent from './HomeComponent';
import { dashboardContext } from '@/Context/Dashboard.context';

const DashboardComponent = () => {
  

  const {currentComponent,setCurrentComponent} = useContext(dashboardContext);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'home':
        return <HomeComponent/>;
      case 'accounts':
        return <AccountComponent />;
      case 'createpost':
        return <CreatePost />;
      case 'schedulepost':
        return <ScheduledPost/>;
      case 'analytics':
        return <AnalyticsComponent />;
      case 'engagement':
        return <Engagement />;
      case 'settings':
        return <Settings />;
      default:
        return <HomeComponent/>;
    }
  };

  //insights chart 

  

  // Componet 
  return (
    <div className='relative h-[100%] px-[1.5rem] py-5  '>

      <div className=' '>

        <div className=''>
          <div className='flex items-center gap-1 py-6'>
            <h1 className='font-bold text-[30px]'>Welcome QCS,</h1>
            <p className='text-[#9E9E9E] text-[22px] tracking-wide'>Let’s optimize your social media today</p>
          </div>
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}

export default DashboardComponent
