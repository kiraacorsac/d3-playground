import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function Test2() {
    const svgRef = useRef(null);
    const [data, setData] = useState([4, 5, 6, 0, 2, 8, 3, 0]);
    var color = d3.scaleLinear().domain([0, d3.max(data)]).range(["white", "green"])
    const [selected, setSelected] = useState([]);

    let [dataArray, setDataArray] = useState([])
    let id = 0

    function handleColor(point) {
        let newArray = selected.slice()
        if (selected.includes(point)) { newArray.splice(newArray.indexOf(point), 1) }
        else { newArray.push(point) }
        setSelected(newArray)

    }

    function getFillCollor(point) {
        getFillBorderCollor(point) 
        if (selected.includes(point)) { return "white" }
        else { return color(data[point]) }
        
    }

    function getFillBorderCollor(point) {
        if (selected.includes(point)) { return 2, "red" }
        else { return 2, color(data[point]) }
    }

    useEffect(() => {
        let newDataArray = []
        for (let point in data) {
            newDataArray.push(<rect
                width="19"
                height={data[point] * 10}
                x={20 * id}
                y={150 - data[point] * 10}
                fill={getFillCollor(point)}
                border-color="red"
                border="2"
                // border-color={getFillBorderCollor(point)}
                key={point}
                onClick={() => handleColor(point)}>

            </rect >)

            id++
        }
        setDataArray(newDataArray)
    }, [svgRef.current, data, selected])
    return (
        <>
            <svg ref={svgRef}>{dataArray}</svg>
            {/* <svg ref={svgRef} />
    <input type="number" onChange={handleNumberSet} value={number}></input>
    <button onClick={handleElementAdd}>Add</button> */}
        </>
    );
}