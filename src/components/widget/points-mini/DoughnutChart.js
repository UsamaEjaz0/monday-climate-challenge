import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: 'right',
      labels: {
        usePointStyle: true,
        pointStyle: 'cricle',
      }
    }
  },
  maintainAspectRatio: false,
  responsive: true,
};

export default function DoughnutChart({points, averagePoints}) {

  const data = {
    labels: ['You', 'Average'],
    datasets: [
      {
        label: '# of Votes',
        data: [parseFloat(points), parseFloat(averagePoints)],
        backgroundColor: [
          '#ff3d57',
          'rgb(53, 162, 235)',
        ],
        borderWidth: 0,
      },
    ],
  };


  return <Doughnut data={data} options={options} />;
}