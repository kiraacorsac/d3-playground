import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function Test() {

    const data = [-103, -213, 0, 2, 5, -54, 250, 9];
    const dataAbsolute = data.map((p) => Math.abs(p))
    const dataMax = d3.max(dataAbsolute);
    console.log(dataMax)
    const scaleChart = d3.scaleLinear()
        .domain([0, dataMax])
        .range([0, 50])

    const testNumber = 1

    console.log(testNumber,scaleChart(testNumber))

    const svgRef = useRef(null);
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const shapeWidth = 40

    useEffect(() => {
        const canvas = d3
            .select(svgRef.current)
            .attr("width", innerWidth)
            .attr("height", innerHeight)

        canvas
            .selectAll("*")
            .remove();

        const graph = canvas
            .append("g")
            .attr("transform", "translate(0, 70)")

        const bars = graph.selectAll("g")
            .data(dataAbsolute.entries())
            .join("g")

        bars.append("rect")
            .attr("x", point => point[0] * shapeWidth)
            .attr("y", point => data[point[0]] >= 0 ? -scaleChart(point[1]) : 0)
            .attr("width", shapeWidth)
            .attr("height", point => scaleChart(point[1]))
            .attr("fill", point => data[point[0]] >= 0 ? "green" : "red")
            .attr("stroke", "#111")
            .attr("stroke-width", shapeWidth / 30)
        
        bars.append("text")
            .attr("x", point => point[0] * shapeWidth + shapeWidth/2)
            .attr("y", point => data[point[0]] >= 0 ? -scaleChart(point[1]) : scaleChart(point[1]))
            .attr("text-anchor", "middle")
            .attr("font-size", 14)
            .attr("transform", point => data[point[0]] >= 0 ? "translate(0, -2)" : "translate(0, 14)")
            .text(point => data[point[0]])
        
    }, [svgRef.current])

    return <svg ref={svgRef} />;
}