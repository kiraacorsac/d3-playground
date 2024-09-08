import { useEffect } from "react";
import { useRef, useState } from "react";
import * as d3 from "d3";
import Path from "./Path";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function Draw1() {
    const svgRef = useRef(null);

    const [canvasArray, setCanvasArray] = useState([[[100, 200], [150, 230], [180, 290]], [[200, 350], [650, 200]]])
    const [tempArray, setTemptArray] = useState([])
 
    function handleDrawEnd() {
        setTemptArray(prevTempArray => {
            setCanvasArray(prevCanvasArray => {
                console.log("Te",[...prevCanvasArray, prevTempArray])
                return [...prevCanvasArray, prevTempArray]
              })
            return []
        })
      }
    

    function handleDrawStart(event) {
        setTemptArray(prevTempArray => {
            return [...prevTempArray, [event.x, event.y]
            ]
        })
    }


    function handleStepBack() {
        let index = canvasArray.length
        let newLineArray = canvasArray.slice()
        newLineArray.splice(index - 1, 1)
        setCanvasArray(newLineArray)
    }


    useEffect(() => {
        const line = d3.line()
        d3.select("svg")
            .selectAll("*")
            .remove();
        for (let path of canvasArray) {
            console.log("path", path)
            d3.select("svg")
            .style("background-color", "orange")
            .append("path")
            .attr("d", line(path))
            .style("fill", "none")
            .style("stroke", "blue")
            .style("stroke-width", 3)
    
        }


        d3.select("svg")
        .style("background-color", "orange")
        .append("path")
        .attr("d", line(tempArray))
        .style("fill", "none")
        .style("stroke", "blue")
        .style("stroke-width", 3)
    }, [svgRef.current, canvasArray, tempArray ])


    useEffect(() => {
        const draw = d3.select("svg")
        draw.style("background-color", "orange")
            .call(d3.drag()
                .on("drag", handleDrawStart)
                .on("end", handleDrawEnd))

        let index = canvasArray.length
        console.log("index", index)
    }, [svgRef.current])


    return <>
        <button onClick={handleStepBack} >Step Back</button>
        <svg ref={svgRef}   >
        </svg>

    </>
}