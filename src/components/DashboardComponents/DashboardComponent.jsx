'use client'
import React, { useContext } from 'react'
import AccountComponent from '../AccountComponents/AccountComponent';
import AnalyticsComponent from './AnalyticsComponent';
import CreatePost from './CreatePost';
import Engagement from './Engagement';
import ScheduledPost from './ScheduledPost';
import Settings from './Settings';

import HomeComponent from './HomeComponent';
import { dashboardContext } from '@/Context/Dashboard.context';

const DashboardComponent = () => {


  const { currentComponent, setCurrentComponent } = useContext(dashboardContext);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'home':
        return <HomeComponent />;
      case 'accounts':
        return <AccountComponent />;
      case 'createpost':
        return <CreatePost />;
      case 'schedulepost':
        return <ScheduledPost />;
      case 'analytics':
        return <AnalyticsComponent />;
      case 'engagement':
        return <Engagement />;
      case 'settings':
        return <Settings />;
      default:
        return <HomeComponent />;
    }
  };

  // Componet 
  return (
    <div className='relative h-[100%] px-[1.5rem] py-5  '>
      
      {renderComponent()}
    </div>

  )
}

export default DashboardComponent
