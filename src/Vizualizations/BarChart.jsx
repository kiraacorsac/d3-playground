import React from 'react';
import NewRequest from './NewRequest';
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
import { Bar, Bubble, Radar, Chart, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from "react";





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
let delayed ;
export const options = {
        animations: {
          onComplete: () => {
              delayed = true;
          },
          delay: (context) => {
            let delay = 0
            console.log("type",context.type) 
            console.log("mode",context.mode)  
            if (context.type === 'data' && context.mode === 'default') {
              delay = context.dataIndex * 500 + context.datasetIndex * 50
            
            }
            return delay;
          }
        },
  //   tension: {
  //     duration: 3000,
  //     easing: 'linear',
  //     from: 1,
  //     to: 0,
  //     loop: true
  //   }
  // ,
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
    },
  },
  plugins: {
    legend: {
      position: 'left',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },


  },
};

const options3 = {
 
    animations: {
      tension: {
        duration: 3000,
        delay:3,
        easing: 'easeInQuad',
        from: 0.5,
        to: 0,
        loop: true,
        colors:{ type: 'color', properties: ['borderColor', 'backgroundColor'], from: 'transparent' }
    }
    
    },
    scales: {
      y: { // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 100
      }
    }

 
};

export const options2 = {
  scales: {
    y: {
      beginAtZero: false,
    },
  },
};



export function BarChart() {
  const [mainArray, setMainArray] = useState([])
  const [recipesArray, setRecipesArray] = useState([])

  let userIDArray = []

  useEffect(() => {
    const res = fetch('https://dummyjson.com/todos/')
      .then(res => res.json())
      .then(res => setMainArray(res.todos.map(todo => [todo.userId, todo.completed])))
  }, [])

  



  mainArray.map((d) => {
    if (!userIDArray.find(e => e == d[0])) { userIDArray.push(d[0]) }
  })

  let userIDCount = userIDArray.map(r => mainArray.filter(a => a[0] == r).length)
  let todoCompletedCount = userIDArray.map(r => mainArray.filter(a => a[0] == r & a[1] == true).length)
  let todoUnCompletedCount = userIDArray.map(r => mainArray.filter(a => a[0] == r & a[1] == false).length)

  let labels = userIDArray



  const data = {
    labels,
    datasets: [
      {
        label: "Total",
        data: userIDCount,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',

      },
      {
        label: "Total",
        data: userIDCount,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: "Total",
        data: userIDCount,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: "Total",
        data: userIDCount,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: "Total",
        data: userIDCount,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: "Completed",
      //   data: todoCompletedCount,
      //   borderColor: 'rgb(55, 99, 132)',
      //   backgroundColor: 'rgba(55, 99, 132, 0.5)',
      // },
      // {
      //   label: "Un-Completed",
      //   data: todoUnCompletedCount,
      //   borderColor: 'rgb(255, 255, 0)',
      //   backgroundColor: 'rgba(255, 255, 0, 0.5)',
      //   borderWidth: 1,
      // },
      
      // {
      //   label: "Total",
      //   data: userIDCount,
      //   borderColor: 'rgb(255, 99, 132)',
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
      // {
      //   label: "Completed",
      //   data: todoCompletedCount,
      //   borderColor: 'rgb(55, 99, 132)',
      //   backgroundColor: 'rgba(55, 99, 132, 0.5)',
      // },
      // {
      //   label: "Un-Completed",
      //   data: todoUnCompletedCount,
      //   borderColor: 'rgb(255, 255, 0)',
      //   backgroundColor: 'rgba(255, 255, 0, 0.5)',
      //   borderWidth: 1,
      // },

    ],
  };
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);

  let excelFileArray = []

  useEffect(() => {
    if (excelFile) {
      excelFile.map((d) => {
        console.log("excelFileArray", d)
        // if (!excelFileArray.find(e => e == d[0])) { excelFileArray.push(d[0]) }
      })
    }
  }, [excelFile])

  console.log("excelFileArray", excelFileArray)
  

  const dataEGBS = {
    labels,
    datasets: [
      {
        label: "Total",
        data: excelFileArray,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: "Completed",
      //   data: todoCompletedCount,
      //   borderColor: 'rgb(55, 99, 132)',
      //   backgroundColor: 'rgba(55, 99, 132, 0.5)',
      // },
      // {
      //   label: "Un-Completed",
      //   data: todoUnCompletedCount,
      //   borderColor: 'rgb(255, 255, 0)',
      //   backgroundColor: 'rgba(255, 255, 0, 0.5)',
      //   borderWidth: 1,
      // },

    ],
  };



  useEffect(() => {
    const res = fetch('https://dummyjson.com/recipes/')
      .then(res => res.json())
      .then(res => setRecipesArray(res.recipes.map(resp => ({ x: resp.caloriesPerServing, y: resp.rating, r: resp.reviewCount, id: resp.id }))))
  }, [])

  console.log("recipesArray", recipesArray)

  const data2 = {
    datasets: [
      {
        label: 'Red dataset',
        data: recipesArray,
        // data: Array.from({ length: 50 }, () => ({
        // x: faker.datatype.number({ min: -100, max: 100 }),
        // y: faker.datatype.number({ min: -100, max: 100 }),
        // r: faker.datatype.number({ min: 5, max: 20 }),
        // })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  let radarerray = recipesArray.map(t => t.y)
  let radarLabel = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

  // console.log("radarerray",radarerray)
  const data3 = {
    labels: radarLabel,
    datasets: [
      {
        label: "Total",
        data: radarerray.slice(0, 12),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,

      },
    ],
  };
  let labels2 = []
  let multitypeChart = []
  // recipesArray.map(t => t.map(e => labels2.push(e.x)))
  // recipesArray.map(t => t.map(e => multitypeChart.push(e.r)))
  // console.log("multitypeChart", multitypeChart)
  // console.log("labels2", labels2)
  const data4 = {
    labels2,
    datasets: [
      {
        type: 'line',
        label: 'Dataset 2',
        backgroundColor: 'rgb(75, 192, 192)',
        data: radarerray,
        borderColor: 'white',
        borderWidth: 2,
      },
      // {
      //   type: 'bar' ,
      //   label: 'Dataset 2',
      //   backgroundColor: 'rgb(75, 192, 192)',
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   borderColor: 'white',
      //   borderWidth: 2,
      // },
      // {
      //   type: 'bar' ,
      //   label: 'Dataset 3',
      //   backgroundColor: 'rgb(53, 162, 235)',
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      // },
    ],
    
  };
  const data5 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
      label: 'Looping tension',
      data: [65, 59, 80, 81, 26, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 12, 192)',
      },
      {
        label: 'Looping tension',
        data: [25, 32, 12, 53, 5, 80, 42],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Looping tension',
        data: [1, 10, 2, 20, 4, 40, 5],
        fill: false,
        borderColor: 'rgb(75, 192, 5)',
        }
    ]
  };

  return <>
    <Bar type='bar' options={options} data={data} width="300px"/>
    <Bubble options={options2} data={data2} />;
    <Radar data={data3} />;
    <Chart type='bar' data={data4} />;
    <Line options={options3} data={data5} />;
  </>
}