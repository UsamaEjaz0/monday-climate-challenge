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
      display: false,
    },
    legend: {
      display: false
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

const labels = ['Travel', 'Food', 'Home', 'Goods', 'Services'];

export default function Graph({travel, home, food, goods, services, averages}) {

  const BLUE = "rgb(53, 162, 235)";
  const GREEN = "rgb(75, 192, 192)";
  const RED = "rgb(255, 99, 132)";
  let barColors = [BLUE, BLUE, BLUE, BLUE, BLUE]
  
  if (Math.round(travel) > averages[0]) {
    barColors[0] = RED
  } else if (Math.round(travel) < averages[0]) {
    barColors[0] = GREEN
  } else {
    barColors[0] = BLUE
  }

  if (Math.round(home) > averages[1]) {
    barColors[2] = RED
  } else if (Math.round(home) < averages[1]) {
    console.log(home)
    barColors[2] = GREEN
  } else {
    barColors[2] = BLUE
  }

  if (Math.round(food*10) > 28) {
    barColors[1] = RED
  } else if (Math.round(food*10) < 28) {
    barColors[1] = GREEN
  } else {
    barColors[1] = BLUE
  }

  if (goods[1] > averages[2]) {
    barColors[3] = RED
  }
  
  if (services[1] > averages[3]) {
    barColors[4] = RED
  }

  const data = {
    labels,
    datasets: [
      {
        data: [travel],
        backgroundColor: barColors[0],
      },
      {
        data: [0, food],
        backgroundColor: barColors[1],
      },
      {
        data: [0, 0, home],
        backgroundColor: barColors[2],
      },
      {
        data: [0, 0, 0, goods[1]],
        backgroundColor: barColors[3],
      },
      {
        data: [0, 0, 0, 0, services[1]],
        backgroundColor: barColors[4],
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
