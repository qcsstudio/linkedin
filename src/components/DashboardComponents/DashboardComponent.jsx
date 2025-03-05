'use client'
import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import AccountComponent from './AccountComponent';
import AnalyticsComponent from './AnalyticsComponent';
import CreatePost from './CreatePost';
import Engagement from './Engagement';
import ScheduledPost from './ScheduledPost';
import Settings from './Settings';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ReactApexChart2 = dynamic(() => import("react-apexcharts"), { ssr: false });

import instagram from '../../../public/images/dashboardImages/instagram.png'
import linkedin from '../../../public/images/dashboardImages/linkedin.png'
import pinterest from '../../../public/images/dashboardImages/pinterest.png'
import facebook from '../../../public/images/dashboardImages/facebook.png'
import dropdownicon from '../../../public/images/dashboardImages/dropdownicon.png'
import Home from '../../../public/images/dashboardImages/Home.png'
import Account from '../../../public/images/dashboardImages/Account.png'
import createpost from '../../../public/images/dashboardImages/createpost.png'
import scheduledpost from '../../../public/images/dashboardImages/scheduledpost.png'
import Analytics from '../../../public/images/dashboardImages/Analytics.png'
import engagement from '../../../public/images/dashboardImages/engagement.png'
import settings from '../../../public/images/dashboardImages/settings.png'
import insights from '../../../public/images/dashboardImages/insights.png'
import recentpost from '../../../public/images/dashboardImages/recentpost.png'
import heart from '../../../public/images/dashboardImages/heart.png'
import comments from '../../../public/images/dashboardImages/comments.png'
import share from '../../../public/images/dashboardImages/share.png'
import instaicon from '../../../public/images/dashboardImages/insta-icon.png'
import linkdinicon from '../../../public/images/dashboardImages/linkdin-icon.png'
import twittericon from '../../../public/images/dashboardImages/twitter-icon.png'
import fbicon from '../../../public/images/dashboardImages/fb-icon.png'
import profile from '../../../public/images/dashboardImages/profile.png'

const DashboardComponent = () => {
  const list = [
    {
      path: 'home',
      image: Home,
      heading: 'Home'
    },
    {
      path: 'accounts',
      image: Account,
      heading: 'Accounts'
    },
    {
      path: 'createpost',
      image: createpost,
      heading: 'Create Post'
    },
    {
      path: 'schedulepost',
      image: scheduledpost,
      heading: 'Scheduled Post'
    },
    {
      path: 'analytics',
      image: Analytics,
      heading: 'Analytics'
    },
    {
      path: 'engagement',
      image: engagement,
      heading: 'Engagement'
    },
    {
      path: 'settings',
      image: settings,
      heading: 'Settings'
    },
  ]

  const [currentScreen, setCurrentScreen] = useState('');

  const renderComponent = () => {
    switch (currentScreen) {
      case 'home':
        return <div className='flex flex-col gap-7'>
        <div className='flex justify-between gap-7'>
          <div className='bg-[#ffffff]/60 flex flex-col gap-2 rounded-xl p-5 w-full max-w-[403px] min-w-[403px] flex-grow-0 '>
            <div>
              <h1 className='font-semibold text-[18px]'>Dashboard Overview</h1>
              <p className='text-[#9E9E9E] text-[13px]'>Search Across Your Dashboard</p>
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-[13px] font-semi-bold'>Weekly Insights</p>
              <Image src={dropdownicon} className='w-2 h-2  object-cover' alt=''></Image>
            </div>
            <div className='bg-white z-40 object-contain rounded-lg'>
              <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="area" height={200} />
              </div>
              <div id="html-dist"></div>
            </div>
          </div>
          <div className='bg-[#ffffff]/60 flex flex-col gap-2 rounded-xl p-5 w-full max-w-[320px] min-w-[320px] flex-grow-0 '>
            <div>
              <h1 className='font-semibold text-[18px]'>Recent Posts</h1>
              <p className='text-[#9E9E9E] text-[13px]'>Search Across Your Dashboard</p>
            </div>
            <div className='flex flex-col gap-2' >
              <div className='flex items-center justify-between bg-[#ffffff] p-2 rounded-md '>
                <Image src={recentpost} className='w-full max-w-[40px]' alt=''></Image>
                <div className='leading-tight'>
                  <h1 className='font-bold'>Post Title Here</h1>
                  <p className='text-[#9E9E9E]'>Feb-27-2025</p>
                </div>
                <div className='flex items-center justify-between gap-4'>
                  <div className='flex flex-col items-center justify-between'>
                    <Image src={heart} className='object-cover' alt='' />
                    <span className='text-thin text-[7.62px]'>120</span>
                    <span className='text-thin text-[7.62px]'>Likes</span>
                  </div>
                  <div className='flex flex-col items-center justify-between'>
                    <Image src={comments} alt=''></Image>
                    <span className='text-thin text-[7.62px]'>35 </span>
                    <span className='text-thin text-[7.62px]'>comments</span>

                  </div>
                  <div className='flex flex-col items-center justify-between'>
                    <Image src={share} alt=''></Image>
                    <span className='text-thin text-[7.62px]'>10</span>
                    <span className='text-thin text-[7.62px]'>share</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between bg-[#ffffff] p-2 rounded-md '>
                <Image src={recentpost} className='w-full max-w-[40px]' alt=''></Image>
                <div className='leading-tight'>
                  <h1 className='font-bold'>Post Title Here</h1>
                  <p className='text-[#9E9E9E]'>Feb-27-2025</p>
                </div>
                <div className='flex items-center justify-between gap-4'>
                  <div className='flex flex-col items-center justify-between'>
                    <Image src={heart} className='object-cover' alt='' />
                    <span className='text-thin text-[7.62px]'>120</span>
                    <span className='text-thin text-[7.62px]'>Likes</span>
                  </div>
                  <div className='flex flex-col items-center justify-between'>
                    <Image src={comments} alt=''></Image>
                    <span className='text-thin text-[7.62px]'>35 </span>
                    <span className='text-thin text-[7.62px]'>comments</span>

                  </div>
                  <div className='flex flex-col items-center justify-between'>
                    <Image src={share} alt=''></Image>
                    <span className='text-thin text-[7.62px]'>10</span>
                    <span className='text-thin text-[7.62px]'>share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-[#ffffff]/60 flex flex-col gap-2 rounded-xl p-5 w-full max-w-[212px] min-w-[212px] flex-grow-0'>
            <div>
              <h1 className='font-semibold text-[18px]'>Growth Goal</h1>
              <p className='text-[#9E9E9E] text-[13px]'>Track Your Goal’s</p>
              <div className='flex items-center gap-2'>
                <p className='text-[13px] font-semi-bold'>This Month</p>
                <Image src={dropdownicon} className='w-2 h-2  object-cover' alt=''></Image>
              </div>
              <div>
                <ReactApexChart2 options={options} series={options.series} type="radialBar" height={600} />
              </div>
              <div className='flex justify-between items-center'>
                <Image src={instaicon} alt=''></Image>
                <Image src={fbicon} alt=''></Image>
                <Image src={twittericon} alt=''></Image>
                <Image src={linkdinicon} alt=''></Image>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-between'>
          <div className='bg-[#ffffff]/60  rounded-xl p-5 ml-0 w-[63%] flex-grow-0'>
            <div className='flex flex-col gap-2'>
              <div>
                <h1 className='font-semibold text-[18px]'>Mentions & Comments</h1>
                <p className='text-[#9E9E9E] text-[13px]'>Search Across Your Dashboard</p>
              </div>
              <div className='flex justify-between text-[14px] items-center p-2 bg-white rounded-lg '>
                <Image src={profile} alt=''></Image>
                <p >@user1:“Love this post i want to design...<span className='text-[#9E9E9E] mr-[50px]'>(2 Hourse ago)</span></p>
                <div className='flex gap-2'>
                  <button className='w-[55px] h-[30px] text-white text-[12px] bg-blue-500 rounded-md'>Reply</button>
                  <button className='w-[65px] bg-gray-100 text-gray-500 text-[10px] rounded-md'>View Post</button>
                </div>
              </div>
              <div className='flex justify-between text-[14px] items-center bg-white z-20 p-2 rounded-lg '>
                <Image src={profile} alt=''></Image>
                <p >@user1:Mentioned you in a Post<span className='text-[#9E9E9E] mr-[150px]'>(6 Hourse ago)</span></p>
                <div className='flex gap-4'>
                  <button className='w-[85px] h-[30px] text-white text-[12px] bg-[#FF0066] rounded-md'>View Story</button>
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <button className='text-center text-[14px] w-[45%] items-center pt-1 pb-1 p-2 bg-slate-50 rounded-lg'>See All Mentions</button>
                <button className='text-center text-[14px] w-[45%] items-center pt-1 pb-1 p-2 bg-white rounded-lg'>View All Comments</button>
              </div>
            </div>
          </div>
          <div className='bg-[#ffffff]/60 flex flex-col justify-evenly rounded-xl p-5 w-[34%]'>
            <h2 className='text-lg font-bold'>Top Performing Post</h2>
            <div className='h-[60%] w-full flex flex-row justify-between'>
              <Image className='w-[110px] h-[85%]' src={recentpost} />
              <div className='flex flex-col px-4'>
                <h2 className='font-bold'>Post Title Here</h2>
                <p className='text-gray-400 text-sm'>Search Across Your Dashboard i would like to get caption just need to fill this and i don't kn...</p>
              </div>
            </div>
            <div className='flex flex-col items-center h-[20%]'>
              <button className='text-[14px] w-full text-center items-center pt-1 pb-1 p-2 bg-slate-50 rounded-lg'>View In Detail</button>
            </div>
          </div>
        </div>
      </div>;
      case 'accounts':
        return <AccountComponent />;
      case 'createpost':
        return <CreatePost />;
      case 'schedulepost':
        return <div>Scheduled Post Content</div>;
      case 'analytics':
        return <AnalyticsComponent />;
      case 'engagement':
        return <Engagement />;
      case 'settings':
        return <Settings />;
      default:
        return <div className='flex flex-col gap-7'>
              <div className='flex justify-between gap-7'>
                <div className='bg-[#ffffff]/60 flex flex-col gap-2 rounded-xl p-5 w-full max-w-[403px] min-w-[403px] flex-grow-0 '>
                  <div>
                    <h1 className='font-semibold text-[18px]'>Dashboard Overview</h1>
                    <p className='text-[#9E9E9E] text-[13px]'>Search Across Your Dashboard</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <p className='text-[13px] font-semi-bold'>Weekly Insights</p>
                    <Image src={dropdownicon} className='w-2 h-2  object-cover' alt=''></Image>
                  </div>
                  <div className='bg-white z-40 object-contain rounded-lg'>
                    <div id="chart">
                      <ReactApexChart options={state.options} series={state.series} type="area" height={200} />
                    </div>
                    <div id="html-dist"></div>
                  </div>
                </div>
                <div className='bg-[#ffffff]/60 flex flex-col gap-2 rounded-xl p-5 w-full max-w-[320px] min-w-[320px] flex-grow-0 '>
                  <div>
                    <h1 className='font-semibold text-[18px]'>Recent Posts</h1>
                    <p className='text-[#9E9E9E] text-[13px]'>Search Across Your Dashboard</p>
                  </div>
                  <div className='flex flex-col gap-2' >
                    <div className='flex items-center justify-between bg-[#ffffff] p-2 rounded-md '>
                      <Image src={recentpost} className='w-full max-w-[40px]' alt=''></Image>
                      <div className='leading-tight'>
                        <h1 className='font-bold'>Post Title Here</h1>
                        <p className='text-[#9E9E9E]'>Feb-27-2025</p>
                      </div>
                      <div className='flex items-center justify-between gap-4'>
                        <div className='flex flex-col items-center justify-between'>
                          <Image src={heart} className='object-cover' alt='' />
                          <span className='text-thin text-[7.62px]'>120</span>
                          <span className='text-thin text-[7.62px]'>Likes</span>
                        </div>
                        <div className='flex flex-col items-center justify-between'>
                          <Image src={comments} alt=''></Image>
                          <span className='text-thin text-[7.62px]'>35 </span>
                          <span className='text-thin text-[7.62px]'>comments</span>

                        </div>
                        <div className='flex flex-col items-center justify-between'>
                          <Image src={share} alt=''></Image>
                          <span className='text-thin text-[7.62px]'>10</span>
                          <span className='text-thin text-[7.62px]'>share</span>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-between bg-[#ffffff] p-2 rounded-md '>
                      <Image src={recentpost} className='w-full max-w-[40px]' alt=''></Image>
                      <div className='leading-tight'>
                        <h1 className='font-bold'>Post Title Here</h1>
                        <p className='text-[#9E9E9E]'>Feb-27-2025</p>
                      </div>
                      <div className='flex items-center justify-between gap-4'>
                        <div className='flex flex-col items-center justify-between'>
                          <Image src={heart} className='object-cover' alt='' />
                          <span className='text-thin text-[7.62px]'>120</span>
                          <span className='text-thin text-[7.62px]'>Likes</span>
                        </div>
                        <div className='flex flex-col items-center justify-between'>
                          <Image src={comments} alt=''></Image>
                          <span className='text-thin text-[7.62px]'>35 </span>
                          <span className='text-thin text-[7.62px]'>comments</span>

                        </div>
                        <div className='flex flex-col items-center justify-between'>
                          <Image src={share} alt=''></Image>
                          <span className='text-thin text-[7.62px]'>10</span>
                          <span className='text-thin text-[7.62px]'>share</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-[#ffffff]/60 flex flex-col gap-2 rounded-xl p-5 w-full max-w-[212px] min-w-[212px] flex-grow-0'>
                  <div>
                    <h1 className='font-semibold text-[18px]'>Growth Goal</h1>
                    <p className='text-[#9E9E9E] text-[13px]'>Track Your Goal’s</p>
                    <div className='flex items-center gap-2'>
                      <p className='text-[13px] font-semi-bold'>This Month</p>
                      <Image src={dropdownicon} className='w-2 h-2  object-cover' alt=''></Image>
                    </div>
                    <div>
                      <ReactApexChart2 options={options} series={options.series} type="radialBar" height={600} />
                    </div>
                    <div className='flex justify-between items-center'>
                      <Image src={instaicon} alt=''></Image>
                      <Image src={fbicon} alt=''></Image>
                      <Image src={twittericon} alt=''></Image>
                      <Image src={linkdinicon} alt=''></Image>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <div className='bg-[#ffffff]/60  rounded-xl p-5 ml-0 w-[63%] flex-grow-0'>
                  <div className='flex flex-col gap-2'>
                    <div>
                      <h1 className='font-semibold text-[18px]'>Mentions & Comments</h1>
                      <p className='text-[#9E9E9E] text-[13px]'>Search Across Your Dashboard</p>
                    </div>
                    <div className='flex justify-between text-[14px] items-center p-2 bg-white rounded-lg '>
                      <Image src={profile} alt=''></Image>
                      <p >@user1:“Love this post i want to design...<span className='text-[#9E9E9E] mr-[50px]'>(2 Hourse ago)</span></p>
                      <div className='flex gap-2'>
                        <button className='w-[55px] h-[30px] text-white text-[12px] bg-blue-500 rounded-md'>Reply</button>
                        <button className='w-[65px] bg-gray-100 text-gray-500 text-[10px] rounded-md'>View Post</button>
                      </div>
                    </div>
                    <div className='flex justify-between text-[14px] items-center bg-white z-20 p-2 rounded-lg '>
                      <Image src={profile} alt=''></Image>
                      <p >@user1:Mentioned you in a Post<span className='text-[#9E9E9E] mr-[150px]'>(6 Hourse ago)</span></p>
                      <div className='flex gap-4'>
                        <button className='w-[85px] h-[30px] text-white text-[12px] bg-[#FF0066] rounded-md'>View Story</button>
                      </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                      <button className='text-center text-[14px] w-[45%] items-center pt-1 pb-1 p-2 bg-slate-50 rounded-lg'>See All Mentions</button>
                      <button className='text-center text-[14px] w-[45%] items-center pt-1 pb-1 p-2 bg-white rounded-lg'>View All Comments</button>
                    </div>
                  </div>
                </div>
                <div className='bg-[#ffffff]/60 flex flex-col justify-evenly rounded-xl p-5 w-[34%]'>
                  <h2 className='text-lg font-bold'>Top Performing Post</h2>
                  <div className='h-[60%] w-full flex flex-row justify-between'>
                    <Image className='w-[110px] h-[85%]' src={recentpost} />
                    <div className='flex flex-col px-4'>
                      <h2 className='font-bold'>Post Title Here</h2>
                      <p className='text-gray-400 text-sm'>Search Across Your Dashboard i would like to get caption just need to fill this and i don't kn...</p>
                    </div>
                  </div>
                  <div className='flex flex-col items-center h-[20%]'>
                    <button className='text-[14px] w-full text-center items-center pt-1 pb-1 p-2 bg-slate-50 rounded-lg'>View In Detail</button>
                  </div>
                </div>
              </div>
            </div>;
    }
  };

  //insights chart 

  const [state, setState] = useState({
    series: [
      {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      colors: ['#B0F8FF', '#D8C5E4'], // Change line & fill colors (Modify as needed)
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2, // Adjust line thickness
      },
      fill: {
        type: 'gradient', // Options: 'solid', 'gradient'
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 90, 100],
          colorStops: [
            {
              offset: 0,
              color: '#B0F8FF',
              opacity: 0.4,
            },
            {
              offset: 100,
              color: '#D8C5E4',
              opacity: 0,
            },
          ],
        },
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },

    },
  });

  //pie chart 
  const [options, setOptions] = useState({
    series: [5623],
    chart: {
      height: 400,
      type: "radialBar",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "65%",
          background: "transparent",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.5,
          },
        },
        track: {
          background: "#ffffff00",
          strokeWidth: "100%",
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.7,
          },
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "17px",
          },
          value: {
            formatter: function (val) {
              return parseInt(val);
            },
            color: "#111",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Percent"],
  });
  return (
    <div className='relative h-screen bg-gradient-to-r px-[96px] py-5  from-purple-200 to-blue-300'>
      {/* bg images */}
      <Image className='absolute top-16 left-36 ' src={instagram} height={350} width={350} alt='' ></Image>
      <Image className='absolute top-16 right-36 ' src={linkedin} height={300} width={300} alt='' ></Image>
      <Image className='absolute bottom-0 left-96 ' src={pinterest} height={250} width={250} alt='' ></Image>
      <Image className='absolute right-32 bottom-0 ' src={facebook} height={200} width={200} alt='' ></Image>

      <div className='flex gap-7 '>

        <div className='flex flex-col gap-3 py-2'>
          <div className='flex justify-center gap-3 items-center rounded-2xl py-5  w-full max-w-[241px] min-w-[200px] bg-[#ffffff]/60 '>
            <h6 className='font-bold text-[20px]'>
              QUANTUM
            </h6>
            <Image src={dropdownicon} className='object-fit' alt=''></Image>
          </div>
          <div className="w-full max-w-[241px] min-w-[241px] min-h-[516px]  bg-white/50 rounded-xl p-5">
            {list.map((data, index) => (
              <div className='border-b  border-[#D8CFE8] py-1 ' key={index}>
                <div
                  className="flex items-center space-x-3 w-full h-[53px] rounded-xl p-2 py-4  cursor-pointer hover:bg-[#B4F2FC]/50 transition"
                  onClick={() => (setCurrentScreen(data.path))}
                >
                  <Image src={data.image} alt={data.heading} />
                  <h4 className="text-left text-md font-semibold text-[#9E9E9E] cursor-pointer hover:bg-[#B4F2FC]/50  ">{data.heading}</h4>
                </div>

              </div>
            ))}
          </div>
        </div>
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
