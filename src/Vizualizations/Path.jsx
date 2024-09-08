import { useEffect } from "react";
import { useRef, useState } from "react";
import * as d3 from "d3";

export default function Path(props) {
    const svgRef = useRef(props.svgRef);
    let pathArray = [];

    const [lineArray, setLineArray] = props.lineArray
    let path = [props.path];

console.log("path2", path)

    function handleDrawEnd() {
        // console.log("lineArray", lineArray)
        let newLineArray = lineArray.slice()
        newLineArray.push([pathArray])
        setLineArray(newLineArray)
        pathArray = [];
        // console.log("pathArrayEnd", pathArray)
    }

    function handleDrawStart(event) {

        pathArray.push([event.x, event.y])
        let newLineArray = lineArray.slice()
        newLineArray.push([pathArray])
        setLineArray(newLineArray)

    //     const line = d3.line()

    //     d3.select("svg")
    //         .append("path")
    //         .attr("d", line(pathArray))
    //         .style("fill", "none")
    //         .style("stroke", "blue")
    //         .style("stroke-width", 3)
    }


    // function handleStepBack() {
    //     let index = lineArray.length
    //     console.log("index", index)
    //     let newLineArray = lineArray.splice((index - 1), 1)
    //     // console.log("newLineArray", newLineArray)
    //     setLineArray(newLineArray)
    // }
    // useEffect(() => {
    //     for (let path of lineArray) {
    //         // console.log("path", path)
//        useEffect(() => {
//     const line = d3.line()
// d3.select("svg")
//     .style("background-color", "orange")
//         .append("path")
//         .attr("d", line(path))
//         .style("fill", "none")
//         .style("stroke", "red")
//         .style("stroke-width", 3)
//     }, [svgRef.current])

    // }, [svgRef.current, lineArray])
    useEffect(() => {
        const draw = d3.select("svg")
        draw.style("background-color", "orange")
            .call(d3.drag()
                .on("drag", handleDrawStart)
                .on("end", handleDrawEnd))

        let index = lineArray.length
        console.log("index", index)
    }, [svgRef.current])

    console.log("lineArray", lineArray)
    return <>
    {lineArray}
        {/* <button onClick={handleStepBack} >Step Back</button> */}
        {/* <svg ref={svgRef}   >
        </svg> */}

    </>
}