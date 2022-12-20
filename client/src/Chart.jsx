import React, { useState, useEffect } from 'react';
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

/* 
TODO: Dectect if location is missing, then for that location put in a 0 
-store total list of locations then compare
2. api calls just dies after a while
*/

export function Chart(props) {
  /* For each decade, form datasets that can be passed into React Chart 2 */
  function formDataset() {
    /* If no data yet, just give empty array to React Chart 2 */
    if(props.water_dataset.length <= 0) {
      return []
    }
    /* Go through each decade, each having a list of data for each location at that year,
    go through each list, storing the water level value of that location */
    return props.water_dataset.map((water_datas_of_year) => {
      return {
        label: water_datas_of_year[0].date.slice(0,4), /* label = year being looked at */
        data: water_datas_of_year.map((water_data_of_location) => water_data_of_location.value),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    })
  }
  const arrary_of_data = formDataset()

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Water Levels of California Counties',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    },
  };
    
  const labels = (props.water_dataset.length > 0) ? props.water_dataset[1].map((water_data_of_location) => water_data_of_location.stationId) : []
  console.log(labels)
  console.log(arrary_of_data)
  const data = {
      labels,
      datasets: arrary_of_data,
    };

  return <Bar options={options} data={data} />;
}