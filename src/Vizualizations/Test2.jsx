import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function Test2() {
    const [data, setData] = useState([4, 5, 6, 12, 4]);
    const svgRef = useRef(null);
    const [rects, setRects] = useState([]);

    useEffect(() => {
        let newRects = [];
        let width = 20;
        let height = 10;
        let yaxis = width + 2;
        for (let point in data) {
            console.log(data[point])

            newRects.push(<rect key={point} width={width} height={(data[point] * height)} fill="red" x={point * yaxis} y="100"> </rect >)

        }

        setRects(newRects);
    }
        , [svgRef.current, data])
    return <svg ref={svgRef}>
        {rects}
        {/* <rect width="100" height="100" fill="red" x="100" y="100"> </rect>
        <circle r="50" fill="blue" cx="300" cy="200"> </circle> */}


    </svg>
}