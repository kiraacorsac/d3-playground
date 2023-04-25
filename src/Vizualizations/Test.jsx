import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function Test() {

    const svgRef = useRef(null);

    useEffect(() => {
        const canvas = d3
            .select(svgRef.current)
            .attr("width", 1000)
            .attr("height", 600)
        
        canvas
            .selectAll("*")
            .remove();

        canvas
            .append("circle")
            .attr("r", 100);
    }, [svgRef.current])

    return <svg ref={svgRef} />;
}