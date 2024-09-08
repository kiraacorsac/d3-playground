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
// import style from "./Statistics.module.css";
import style from "./Statistics.module.css";
import { formatISO9075 } from 'date-fns';


import * as XLSX from "xlsx/xlsx.mjs";
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>;

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


export const optionsEGBS = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
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
    height: 300,
  },
  plugins: {
    legend: {
      position: 'left',
    },
    title: {
      display: true,
      text: 'EPLS service',
    },
    // responsive: true,
    // aspectRatio: 1.8,

    // animations: {
    //   tension: {
    //     duration: 1000,
    //     easing: 'linear',
    //     from: 1,
    //     to: 0,
    //     loop: true
    //   }
    // },

  },
};
export function Statistics() {

  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [excelDataView, setExcelDataView] = useState(null);
  const [assignedView, setAssignedView] = useState(null);
  const [qualifiedView, setQualifiedView] = useState(null);
  const [proposedView, setProposedView] = useState(null);
  const [labelsArray, setLabelsArray] = useState(null)

  const [typeError, setTypeError] = useState(null);

  let labels = labelsArray

  const dataEGBS = {
    labels,
    datasets: [
      {
        label: "Assigned",
        data: assignedView,
        borderColor: 'rgba(255, 26, 104,0.2)',
        backgroundColor: 'rgba(255, 26, 104, 1)',
        // barThickness: 20,
        borderWidth: 1,
        barpercentage: 0.5

      },
      {
        label: "Qualified",
        data: qualifiedView,
        borderColor: 'rgba(54, 162, 235,0.2)',
        backgroundColor: 'rgba(54, 162, 235,1)',
        // barThickness: 20,
        borderWidth: 1,
        barpercentage: 0.5
      },
      {
        label: "Proposed",
        data: proposedView,
        borderColor: 'rgba(255, 206, 86,0.2)',
        backgroundColor: 'rgba(255, 206, 86,1)',
        // barThickness: 20,
        borderWidth: 1,
        barpercentage: 0.5,

      },
    ]
  };


  // onchange event
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };
  const handleExcelDateToJSDate = (e) => {
    let converted_date = formatISO9075(new Date(Math.round((e - 25569) * 864e5))).substring(0, 10);;
    return converted_date
  }

  function getTime(date2, date1) {
    return new Date(date2).getTime() - new Date(date1).getTime();
  }

  function differenceInDays(date2, date1) {
    return Math.round(getTime(date2, date1) / (1000 * 3600 * 24))
  }

  const handleFileSubmit = (e) => {
    console.log("start");
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      console.log("workbook", workbook.SheetNames);
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      let labelsArray = data.map(a => { return (String(a.egbs_number)) });
      let assigned = data.map(a => {
        return (differenceInDays(handleExcelDateToJSDate(a.egbs_assigned), handleExcelDateToJSDate(a.egbs_created)))
      });
      let qualified = data.map(a => {
        return (differenceInDays(handleExcelDateToJSDate(a.egbs_qualified), handleExcelDateToJSDate(a.egbs_assigned)))
      });
      let proposed = data.map(a => {
        return (differenceInDays(handleExcelDateToJSDate(a.egbs_proposed), handleExcelDateToJSDate(a.egbs_qualified)))
      });

      let newDataView = data.map(a => {
        return [differenceInDays(handleExcelDateToJSDate(a.egbs_assigned), handleExcelDateToJSDate(a.egbs_created)),
        differenceInDays(handleExcelDateToJSDate(a.egbs_qualified), handleExcelDateToJSDate(a.egbs_assigned)),
        differenceInDays(handleExcelDateToJSDate(a.egbs_proposed), handleExcelDateToJSDate(a.egbs_qualified))
        ]
      });
      const newData = data.map(a => {
        return {
          ...a,
          egbs_assigned: handleExcelDateToJSDate(a.egbs_assigned),
          egbs_created: handleExcelDateToJSDate(a.egbs_created),
          egbs_proposed: handleExcelDateToJSDate(a.egbs_proposed),
          egbs_qualified: handleExcelDateToJSDate(a.egbs_qualified),
          daysToAssigned: differenceInDays(handleExcelDateToJSDate(a.egbs_assigned), handleExcelDateToJSDate(a.egbs_created)),
          daysToQualified: differenceInDays(handleExcelDateToJSDate(a.egbs_qualified), handleExcelDateToJSDate(a.egbs_assigned)),
          daysToProposed: differenceInDays(handleExcelDateToJSDate(a.egbs_proposed), handleExcelDateToJSDate(a.egbs_qualified)),
          total: differenceInDays(handleExcelDateToJSDate(a.egbs_proposed), handleExcelDateToJSDate(a.egbs_created)),
        }
      })
      setExcelData(newData);
      setExcelDataView(newDataView)
      setAssignedView(assigned)
      setQualifiedView(qualified)
      setProposedView(proposed)
      setLabelsArray(labelsArray)
    }
  };


  return <>

    <div className="wrapper">
      <h3>Upload & View MDS form</h3>

      {/* form */}
      <form
        className="form-group custom-form"
        onSubmit={handleFileSubmit}
      >
        <input
          type="file"
          className="form-control"
          required
          onChange={handleFile}
        />
        <button type="submit" className="btn btn-success btn-md">
          UPLOAD
        </button>
        {typeError && (
          <div className="alert alert-danger" role="alert">
            {typeError}
          </div>
        )}
      </form>

      {/* view data */}
      <div className="viewer">
        {excelData ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((individualExcelData, index) => (
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key) => (
                      <td key={key}>{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No File is uploaded yet!</div>
        )}
      </div>
    </div>
    {excelDataView ? (<div className={style.bar}><Bar type='bar' options={optionsEGBS} data={dataEGBS} /></div>
    ) : (
      <div>No File is uploaded yet!</div>
    )}
  </>
}