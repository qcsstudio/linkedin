import React from 'react';
import Chart from 'react-apexcharts';

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
      type: 'radar',
      height: 450,
      toolbar: { show: false },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => Number(val).toLocaleString(undefined, { maximumFractionDigits: 0 }),
      },
    },
    stroke: {
      width: 2,
      colors: ['#3f51b5'],
    },
    fill: {
      opacity: 0.3,
      colors: ['#3f51b5'],
    },
    markers: {
      size: 5,
      colors: ['#3f51b5'],
      strokeColor: '#fff',
      strokeWidth: 2,
    },
    tooltip: {
      y: {
        formatter: (val) => Number(val).toLocaleString(undefined, { maximumFractionDigits: 2 }),
      },
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
      <Chart options={chartOptions} series={chartSeries} type="radar" height={400} />
    </div>
  );
}

export default AnalyticsChart;
