import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function Test() {

    const data = [3, 1, 5, 4, 1, 3, 6, 2, 4];
    const svgRef = useRef(null);
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const shapeWidth = 10
    const xdelta = 12

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
            .data(data.entries())

            .join("rect")
            .attr("x", point => point[0] * xdelta)
            .attr("y", 10)
            .attr("width", shapeWidth)
            .attr("height", point => point[1] * 10)
            .attr("fill", "teal")
            .attr("stroke", "#111")
            .attr("stroke-width", shapeWidth / 30)
            .attr("transform-origin", "center")
            // .attr("transform", "translate(10 100), scale(1 -1)")
            // .attr("transform", "scale(1 -1)")
            .attr("transform", "translate(10 100), scale(1 -1), rotate(-90)")



    }, [svgRef.current])

    return <svg ref={svgRef} />;
}