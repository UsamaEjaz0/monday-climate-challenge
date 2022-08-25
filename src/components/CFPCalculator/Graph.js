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
      display: true,
      text: 'Your Carbon FootPrint',
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

export default function Graph(props) {

  const BLUE = "rgb(53, 162, 235)";
  const GREEN = "rgb(75, 192, 192)";
  const RED = "rgb(255, 99, 132)";
  let barColors = [BLUE, BLUE, BLUE, BLUE, BLUE]
  
  if (Math.round(props.travel) > props.averages[0]) {
    barColors[0] = RED
  } else if (Math.round(props.travel) < props.averages[0]) {
    barColors[0] = GREEN
  } else {
    barColors[0] = BLUE
  }

  console.log(props.travel, Math.round(props.travel))
  console.log(props.averages[0])

  if (Math.round(props.food*10) > 28) {
    barColors[1] = RED
  } else if (Math.round(props.food*10) < 28) {
    barColors[1] = GREEN
  } else {
    barColors[1] = BLUE
  }

  if (props.goods[1] > props.averages[1]) {
    barColors[3] = RED
  }
  
  if (props.services[1] > props.averages[2]) {
    barColors[4] = RED
  }

  const data = {
    labels,
    datasets: [
      {
        data: [props.travel],
        backgroundColor: barColors[0],
      },
      {
        data: [0, props.food],
        backgroundColor: barColors[1],
      },
      {
        data: [0, 0, props.home],
        backgroundColor: barColors[2],
      },
      {
        data: [0, 0, 0, props.goods[1]],
        backgroundColor: barColors[3],
      },
      {
        data: [0, 0, 0, 0, props.services[1]],
        backgroundColor: barColors[4],
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
