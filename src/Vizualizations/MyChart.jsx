import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale,
    // TimeSeriesScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { formatISO9075 } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale
);

export const options = {
    responsive: true,
    scales: {
        x: {
            type: 'time',
            time: { unit: 'day' }

        }
    },


    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Update Stats',
        },
    },
    // animations: {
    //     tension: {
    //         duration: 1850,
    //         easing: 'linear',
    //         from: 0.9,
    //         to: 0.1,
    //         loop: true
    //     },

    // },
};

const handleExcelDateToJSDate = (e) => {
    let converted_date = formatISO9075(new Date(Math.round((e - 25569) * 864e5)));
    // console.log(converted_date);
    // converted_date = format(Date(converted_date), "Pp");
    return converted_date
}
export function MyChart() {

    const [data, setData] = useState([]);
    var data2 = {}


    // var label4 = Object.keys(data[0]).map(a => a)[3]

    if (data.length > 0) {
        var label0 = Object.keys(data[0]).map(a => a)[0]
        var label1 = Object.keys(data[0]).map(a => a)[1]
        var label2 = Object.keys(data[0]).map(a => a)[2]
        var label3 = Object.keys(data[0]).map(a => a)[3]
        console.log("label0", data.map(a => a[label0]))


        data2 = {

            labels: data.map(a => a[label0]),
            datasets: [
                {
                    label: label1,
                    data: data.map(a => a[label1]),
                    backgroundColor: "rgba(25,92,52,0.2)",
                    borderColor: "rgba(255, 99, 132, 0.5)",
                    fill: true,
                    tension: 0
                },
                {
                    label: label2,
                    data: data.map(a => a[label2]),
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(53, 162, 235, 0.5)",
                    fill: true,
                    borderWidth: 5,
                    tension: 0
                },
                {
                    label: label3,
                    data: data.map(a => a[label3]),
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(45, 145, 50, 0.5)",
                    fill: true,
                    tension: 0.
                }
            ]
        };
    } else {
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

        data2 = {
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',

                },
                {
                    label: 'Dataset 2',
                    data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        };
    };

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            console.log("parsedData", parsedData);
            const parsedDataDate = parsedData.map((d) => { return { ...d, datetime: handleExcelDateToJSDate(d.datetime) } })

            setData(parsedDataDate);
        };

    }

    function colorBand(row, index) {

        console.log("first here", row.records_created);
        if (row.records_created > 0) {
            // console.log("here now")
            return (
                <div>{row.records_created}</div>

            )
        }
    };

    // console.log("data rows", data, data.map(a => a.datetime), data.map(a => a.records_updated), data.map(a => a.records_created), Object.keys(data[0]).map(a => a))

    // console.log("tick", data.map(a => handleExcelDateToJSDate(a.datetime)))


    return (
        <div className="MyChart">
            <input
                type="file"
                accept=".xlsx, .xls "
                onChange={handleFileUpload} />
            {data.length > 0 && (<table className="table" style={{ fontSize: "10px" }}>
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        // console.log(colorBand(row, index)),

                        // console.log(row.records_created > 0),
                        <tr key={index}>
                            {Object.values(row).map((value, index) => (
                                index == 0 ? <td key={index} style={{ color: 'black', backgroundColor: "white", textAlign: "center" }}>{value}</td> :
                                    (value > 0 && index > 0 ? <td key={index} style={{ color: 'green', backgroundColor: "lightgreen", textAlign: "center", fontWeight: "bold" }}>{value}</td> :
                                        <td key={index} style={{ color: 'black', backgroundColor: "white", textAlign: "center" }}> {value}</td>)
                            ))
                            }</tr>
                    )
                    )

                    }
                </tbody>
            </table>)
            }
            <div className="App">
                <Line options={options} data={data2} />
            </div>

        </div >

    )

}