import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function Test2() {

    const [data, setData] = useState([4, 5, 6, 2, 8, 3]);
    let dataArray = []
    let id=0
    for (let point in data){
        dataArray.push(<rect  width="19" height={data[point]*10} x={20*id} y="50" fill="green"></rect>)
        id++
    }
    return (
    <>
    <svg>{dataArray}</svg>
    {/* <svg ref={svgRef} />
    <input type="number" onChange={handleNumberSet} value={number}></input>
    <button onClick={handleElementAdd}>Add</button> */}
</>
);
}