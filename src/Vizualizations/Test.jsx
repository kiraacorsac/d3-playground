import { useEffect } from "react";
import { useRef, useState } from "react";
import * as d3 from "d3";

export default function Test() {
    const svgRef = useRef(null);

    const [canvasArray, setCanvasArray] = useState([])
    const [tempArray, setTempArray] = useState([]);


    function handleDrawEnd() {
        setTempArray(prevTempArray => {
            setCanvasArray(prevCanvasArray => [...prevCanvasArray, prevTempArray]);
            return []
        });
    }

    function handleDrawStart(event) {
        setTempArray(prevTempArray => {
            return [
                ...prevTempArray,
                [event.x, event.y]
             ]
        });
    }

    function handleStepBack() {
        let index = canvasArray.length
        console.log("index", index)

        let newLineArray = canvasArray.slice()
        newLineArray.splice(index - 1, 1)

        console.log("newLineArray", newLineArray)
        setCanvasArray(newLineArray)
    }

    useEffect(() => {
        d3.select("svg")
            .selectAll("*")
            .remove();
        console.log("canvasArray", canvasArray)
        const line = d3.line()

        for (let path of canvasArray) {

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
    }, [svgRef.current, canvasArray, tempArray])

    useEffect(() => {

        const draw = d3.select("svg")
        draw.style("background-color", "orange")
            .call(d3.drag()
                .on("drag", handleDrawStart)
                .on("end", handleDrawEnd))
    }, [svgRef.current])

    return <>
        <svg width="1000" height="400" ref={svgRef}   >
        </svg>
        <br></br>
        <button onClick={handleStepBack} >Step Back</button>


    </>
}