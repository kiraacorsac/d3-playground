import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function Test() {

    const data = [3, 1, 5, 5, 1, 3];
    const svgRef = useRef(null);
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const shapeWidth = 10

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
            .data(data)
            .join("rect")
            .attr("x", 10 )
            .attr("y", 10)
            .attr("width", shapeWidth)
            .attr("height", point => point * 10)
            .attr("fill", "teal")
            .attr("stroke", "#111")
            .attr("stroke-width", shapeWidth / 30)


    }, [svgRef.current])

    return <svg ref={svgRef} />;
}