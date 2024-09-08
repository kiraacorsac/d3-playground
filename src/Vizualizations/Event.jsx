import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LineController,
  BarController,
  Filler
} from 'chart.js';
import { Bar, Bubble, Radar, Chart } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from "react";
import { reverse, ticks } from 'd3';
import "chart.js/auto" 




// export const [dataFetch ,setDataFetch]=useState(null);
// export const [loading,setLoading]= useState(true);
// export const [ error,setError] = useState(null)

// useEffect(()=>{
//   fetch('https://dummyjson.com/todos')
//   .then(response=>{if(response.ok){return response.json()}throw response})
//   .then(data=>{setDataFetch(data)})
//   .catch(error=>{console.error("Error fetching data: ",error);setError(error)})
//   .finally(()=>{setLoading(false)})

// },[])


/* providing token in bearer */


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement,
  LineController,
  BarController,
  Filler

);
const backgroundColors = ['rgba(255, 99, 132, 0.5)', 'rgba(55, 99, 132, 0.5)', 'rgba(255, 255, 0, 0.5)']
function handleHover(event, item, legend) {
  event.chart.data.datasets.forEach((dataset, index) => {
    if (index == item.datasetIndex) { dataset.backgroundColor = 'rgba(10, 255, 0, 0.5)' }
  })
  event.chart.update()
}

function handleLeave(event, item, legend) {
  event.chart.data.datasets.forEach((dataset, index) => {
    dataset.backgroundColor = backgroundColors[index]
  })
  event.chart.update()
}
export const options = {
  // indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
 
    x: {
      // stacked: true,
      // type: "logarithmic",
      reverse: false,
      title: {
        display: true,
        text: "number"
      },
      grid: {
        color: "blue",
        borderColor: 'yellow',
        tickColor: 'green'
      },
      ticks: {
        includeBounds: true,
        maxTicksLimit:1000,
      },
      // min: 0.5,
      // min:"1960",
      // max: 10,
      type: 'time',
      time: {
        unit: 'year'
    },
      // time: {
      //   displayFormats: {
      //     quarter: 'MMM YYYY'
      //   }
      // }
    },
    y: {
      // stacked: true,
      reverse:false,
      grid: {
        color: "blue",
        // borderColor: 'yellow',

        // tickColor:'green',
      },
      // border: {
      //   display: true,
      //   color: 'green',
      //   width: 2, 
      //   z:1,
      // },
    }
  },
  plugins: {
    legend: {
      position: 'left',
      onHover: (event, item, legend) => handleHover(event, item, legend),
      onLeave: (event, item, legend) => handleLeave(event, item, legend),

    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },

  },
};
export default function Event() {

  const [mainArray, setMainArray] = useState([])
  const [recipesArray, setRecipesArray] = useState([])

  let userIDArray = []

  useEffect(() => {
    const res = fetch('https://dummyjson.com/users/')
      .then(res => res.json())
      .then(res => setMainArray(res.users.map(user => [user.id, user.birthDate, user.weight])))
  }, [])




  mainArray.map((d) => {
    if (!userIDArray.find(e => e == d[0])) { userIDArray.push(d) }
  })
  console.log("mainArray",mainArray)
  let userIDCount = userIDArray.map(r => mainArray.filter(a => a[0] == r).length)
  let usersWeight = userIDArray.map(r => { console.log(r); return r[2]})
  let usersbirthDate = userIDArray.map(r => { console.log(r); return {x: r[1],y: r[2]}})
  // console.log(usersWeight)
  console.log(usersbirthDate)
  let labels = userIDArray



  const data = {
    // labels,
    datasets: [
      // {
      //   label: "Weight",
      //   data: usersWeight,
      //   borderColor: 'rgb(255, 99, 132)',
      //   backgroundColor: backgroundColors[0],
      // },
      {
        label: "BirthDate",
        data: usersbirthDate,
        borderColor: 'rgb(545, 99, 132)',
        backgroundColor: backgroundColors[1],
      },
      // {
      //   label: "Completed",
      //   data: todoCompletedCount,
      //   borderColor: 'rgb(55, 99, 132)',
      //   backgroundColor: backgroundColors[1],
      // },
      // {
      //   label: "Un-Completed",
      //   data: todoUnCompletedCount,
      //   borderColor: 'rgb(255, 255, 0)',
      //   backgroundColor: backgroundColors[2],
      //   borderWidth: 1,
      // },

    ],
  };
  return <>
    <Bar options={options} data={data} />

  </>
}