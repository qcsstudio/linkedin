import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function AnalyticsChart({ oneOrganizationAnalticsData, organizationFollowerCount }) {
  if (!oneOrganizationAnalticsData || !oneOrganizationAnalticsData.length) {
    return null;
  }

  const { totalShareStatistics } = oneOrganizationAnalticsData[0];

  const categories = [
    'Unique Impressions',
    'Clicks',
    'Likes',
    'Views',
    'Followers'
  ];

  const data = [
    totalShareStatistics.uniqueImpressionsCount,
    totalShareStatistics.clickCount,
    totalShareStatistics.likeCount,
    totalShareStatistics.views,
    organizationFollowerCount
  ].map(val => Number(val.toFixed(2)));

  const chartOptions = {
    chart: {
      type: 'line',
      height: 400,
      toolbar: { show: false }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => Number(val).toLocaleString(undefined, { maximumFractionDigits: 0 }),
      },
      title: {
        text: 'Counts',
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 6,
      colors: ['#3f51b5'],
      strokeColor: '#fff',
      strokeWidth: 2,
    },
    colors: ['#3f51b5'],
    tooltip: {
      y: {
        formatter: (val) => Number(val).toLocaleString(undefined, { maximumFractionDigits: 2 }),
      },
    },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 4,
    },
  };

  const chartSeries = [
    {
      name: 'LinkedIn Metrics',
      data: data,
    }
  ];

  return (
    <div>
      <Chart options={chartOptions} series={chartSeries} type="line" height={400} />
    </div>
  );
}

export default AnalyticsChart;
