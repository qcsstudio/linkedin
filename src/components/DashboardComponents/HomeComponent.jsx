"use client"
import Image from "next/image"
import { useState } from "react";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const ReactApexChart2 = dynamic(() => import("react-apexcharts"), { ssr: false });

const HomeComponent = () => {


  // React Charts:
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
    <>

      <div className='flex flex-col gap-[1.8rem] z-[100]'>
        <div className='flex items-center gap-1 py-6'>
          <h1 className='font-bold text-[30px]'>Welcome QCS,</h1>
          <p className='text-[#9E9E9E] text-[22px] tracking-wide'>Let’s optimize your social media today</p>
        </div>
        <div className='flex justify-start gap-[1.8rem] z-[100]'>
          <div className='bg-[#ffffff]/60 flex flex-col gap-2  rounded-xl p-5  w-[50%] flex-grow-0 z-[100]'>

            <div>
              <h1 className='font-semibold text-[18px]'>Dashboard Overview</h1>
              <p className='text-[#9E9E9E] text-[13px]'>Search Across Your Dashboard</p>
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-[13px] font-semi-bold'>Weekly Insights</p>
              <Image src={'/images/dashboardImages/dropdownicon.png'} width={1024} height={1024} className='w-2 h-2  object-cover' alt='adw' />
            </div>
            <div className='bg-white z-40 object-contain rounded-lg'>
              <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="area" height={200} />
              </div>
              <div id="html-dist"></div>
            </div>
          </div>

          <div className='bg-[#ffffff]/60 flex flex-col gap-2 rounded-xl p-5  w-[30%] flex-grow-0 z-[100]'>

            <div>
              <h1 className='font-semibold text-[18px]'>Recent Posts</h1>
              <p className='text-[#9E9E9E] text-[13px]'>Search Across Your Dashboard</p>
            </div>
            <div className='flex flex-col gap-2' >
              <div className='flex items-center justify-between bg-[#ffffff] p-2 rounded-md '>
                <Image src={`/images/dashboardImages/recentpost.png`} width={1024} height={1024} className='w-full max-w-[40px]' alt='daw' />
                <div className='leading-tight'>

                  <h1 className='font-bold'>Post Title Here</h1>
                  <p className='text-[#9E9E9E]'>Feb-27-2025</p>
                </div>
                <div className='flex items-center justify-between gap-4'>

                  <div className='flex flex-col items-center justify-between'>
                    <Image src={`/images/dashboardImages/heart.png`} width={1024} height={1024} className='object-cover w-[.6rem] h-[.6rem]' alt='wa' />
                    <span className='text-thin text-[7.62px]'>120</span>
                    <span className='text-thin text-[7.62px]'>Likes</span>
                  </div>
                  <div className='flex flex-col items-center justify-between'>
                    <Image src={`/images/dashboardImages/comments.png`} width={1024} height={1024} className="w-[.6rem] h-[.6rem]" alt='wad' />
                    <span className='text-thin text-[7.62px]'>35 </span>
                    <span className='text-thin text-[7.62px]'>comments</span>

                  </div>
                  <div className='flex flex-col items-center justify-between'>
                    <Image src={`/images/dashboardImages/share.png`} width={1024} height={1024} className="w-[.6rem] h-[.6rem]" alt='daw' />
                    <span className='text-thin text-[7.62px]'>10</span>
                    <span className='text-thin text-[7.62px]'>share</span>
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between bg-[#ffffff] p-2 rounded-md '>
                <Image src={`/images/dashboardImages/recentpost.png`} width={1024} height={1024} className='w-full max-w-[40px]' alt='daw' />
                <div className='leading-tight'>
                  <h1 className='font-bold'>Post Title Here</h1>
                  <p className='text-[#9E9E9E]'>Feb-27-2025</p>
                </div>
                <div className='flex items-center justify-between gap-4'>

                  <div className='flex flex-col items-center justify-between'>
                    <Image src={`/images/dashboardImages/heart.png`} width={1024} height={1024} className="w-[.6rem] h-[.6rem] object-cover" alt='dwa' />
                    <span className='text-thin text-[7.62px]'>120</span>
                    <span className='text-thin text-[7.62px]'>Likes</span>
                  </div>
                  <div className='flex flex-col items-center justify-between'>
                    <Image src={`/images/dashboardImages/comments.png`} width={1024} height={1024} className="w-[.6rem] h-[.6rem]" alt='dwa' />
                    <span className='text-thin text-[7.62px]'>35 </span>
                    <span className='text-thin text-[7.62px]'>comments</span>

                  </div>
                  <div className='flex flex-col items-center justify-between'>
                    <Image src={`/images/dashboardImages/share.png`} width={1024} height={1024} className="w-[.6rem] h-[.6rem]" alt='dwa' />
                    <span className='text-thin text-[7.62px]'>10</span>
                    <span className='text-thin text-[7.62px]'>share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-[#ffffff]/60 flex flex-col gap-2 rounded-xl p-5 w-[20%] z-[100]  flex-grow-0'>

            <div>
              <h1 className='font-semibold text-[18px]'>Growth Goal</h1>
              <p className='text-[#9E9E9E] text-[13px]'>Track Your Goal’s</p>
              <div className='flex items-center gap-2'>
                <p className='text-[13px] font-semi-bold'>This Month</p>
                <Image src={'/images/dashboardImages/dropdownicon.png'} width={1024} height={1024} className='w-2 h-2  object-cover' alt='dwa' />
              </div>
              <div>
                <ReactApexChart2 options={options} series={options.series} type="radialBar" height={600} />
              </div>
              <div className='flex justify-between items-center'>
                <Image src={`/images/dashboardImages/insta-icon.png`} width={1024} height={1024} className="w-[1.8rem] h-[1.8rem]" alt='dwa' />
                <Image src={`/images/dashboardImages/fb-icon.png`} width={1024} height={1024} className="w-[1.8rem] h-[1.8rem]" alt='daw' />
                <Image src={`/images/dashboardImages/twitter-icon.png`} width={1024} height={1024} className="w-[1.8rem] h-[1.8rem]" alt='dwa' />
                <Image src={`/images/dashboardImages/linkdin-icon.png`} width={1024} height={1024} className="w-[1.8rem] h-[1.8rem]" alt='daw' />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-row justify-between z-[100]'>
          <div className='bg-[#ffffff]/60  rounded-xl p-5 ml-0 w-[63%] flex-grow-0'>

            <div className='flex flex-col gap-2'>
              <div>
                <h1 className='font-semibold text-[18px]'>Mentions & Comments</h1>
                <p className='text-[#9E9E9E] text-[13px]'>Search Across Your Dashboard</p>
              </div>
              <div className='flex justify-between text-[14px] items-center p-2 bg-white rounded-lg '>
                <Image src={`/images/dashboardImages/profile.png`} width={30} height={30} className="w-[1.8rem] h-[1.8rem]" alt='profilePic' />
                <p >@user1:“Love this post i want to design...<span className='text-[#9E9E9E] mr-[50px]'>(2 Hourse ago)</span></p>
                <div className='flex gap-2'>
                  <button className='w-[55px] h-[30px] text-white text-[12px] bg-blue-500 rounded-md'>Reply</button>
                  <button className='w-[65px] bg-gray-100 text-gray-500 text-[10px] rounded-md'>View Post</button>
                </div>
              </div>
              <div className=' flex justify-between text-[14px] items-center bg-white z-[100] p-2 rounded-lg '>
                <Image src={`/images/dashboardImages/profile.png`} width={30} height={30} className="w-[1.8rem] h-[1.8rem]" alt='profilePic' />
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
              <Image src={`/images/dashboardImages/recentpost.png`} width={110} height={85} className='w-[110px] h-[85%]' alt='recentPost' />
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
      </div>
    </>
  )
}

export default HomeComponent