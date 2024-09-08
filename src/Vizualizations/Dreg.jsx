import { useEffect } from "react";
import { useRef,useState } from "react";
import * as d3 from "d3";

export default function Dreg() {

    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [innerHeigh, setInnerHeigh] = useState(window.innerHeigh)
    const svgRef = useRef(null);
    function handleDrag(event) {
        console.log(event.x, event.y)
        d3.select(this)

            .attr("cx", event.x)
            .attr("cy", event.y)
    }
    function handleWindowSize() {
        setInnerHeigh(window.innerHeigh)
        setInnerWidth(window.innerWidth)
        d3.select(this)
            .attr("cx", innerWidth/2)
            .attr("cy", innerHeigh/2)
    }
    
    useEffect(() => {
        window.addEventListener("resize", handleWindowSize, false)
        d3.select("#circle")
            .on("dblclick", function () {
                if (d3.select(this).attr("fill") == "blue") {
                    d3.select(this).attr("fill", "green")
                }
                else {
                    d3.select(this).attr("fill", "blue")
                }
            })
            .call(d3.drag()
                .on("drag", handleDrag))


    }, [svgRef.current])

    return <> <svg ref={svgRef}>
        {<circle r="50" fill="blue" cx="60" cy="250" id="circle"></circle>}
    </svg>
    </>
}