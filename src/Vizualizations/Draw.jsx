import { useEffect } from "react";
import { useRef, useState } from "react";
import * as d3 from "d3";

export default function Draw() {
    const svgRef = useRef(null);
    let pathArray = [];

    function handleDrawEnd() {
        pathArray = []
    }

        useEffect(() => {
            function handleDrawStart(event) {
                pathArray.push([event.x, event.y])
                const line = d3.line()


                d3.select("svg")
                    .append("path")
                    .attr("d", line(pathArray))
                    .style("fill", "none")
                    .style("stroke", "blue")
                    .style("stroke-width", 3)
            }

            const draw = d3.select("svg")
            draw.style("background-color", "orange")
                .call(d3.drag()
                    .on("drag", handleDrawStart)
                    .on("end", handleDrawEnd))
        }, [svgRef.current])

    return <> <svg ref={svgRef}>
    </svg>
    </>
}