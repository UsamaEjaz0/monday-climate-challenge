import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import  { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Your Carbon FootPrint',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
    
  },
  maintainAspectRatio: false,
};

const labels = ['Travel', 'Home', 'Food', 'Goods', 'Shopping'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dairy',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Dairy',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

export default function Graph() {
  return <Bar options={options} data={data} />;
}
