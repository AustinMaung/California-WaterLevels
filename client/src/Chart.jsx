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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Chart(props) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Water Levels of California Counties',
          },
        },
      };
      
      const labels = props.locations;

    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: props.data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };

    return <Bar options={options} data={data} />;
}