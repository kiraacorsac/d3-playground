import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function Test() {

    const data = [-103, -213, 0, 2, 5, -54, 50, 9];
    const dataAbsolute =  data.map((p) => Math.abs(p))
    const scaleChart = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, 150])

    const testNumber = 1

    console.log(testNumber,scaleChart(testNumber))

    const svgRef = useRef(null);
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const shapeWidth = 30

    useEffect(() => {
        const canvas = d3
            .select(svgRef.current)
            .attr("width", innerWidth)
            .attr("height", innerHeight)

        canvas
            .selectAll("*")
            .remove();

        const rect = canvas
            .append("g")

        rect.selectAll("rect")
            .data(dataAbsolute.entries())
            .join("rect")
            .attr("x", point => point[0] * 30)
            .attr("y", 0)
            .attr("width", shapeWidth)
            .attr("height", point => scaleChart(point[1]))
            .attr("fill", point => data[point[0]] > 0 ? "green" : "red")
            .attr("stroke", "#111")
            .attr("stroke-width", shapeWidth / 30)


    }, [svgRef.current])

    return <svg ref={svgRef} />;
}