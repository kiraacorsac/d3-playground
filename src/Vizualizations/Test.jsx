import * as d3 from "d3";
import { useState } from "react";
import { useEffect, useRef } from "react";

export default function Test() {
  let current_time = new Date();
  let second = current_time.getSeconds();
  let minute = current_time.getMinutes();
  let hour = current_time.getHours();
  // const data = [-103, -13, 0, 20, 50, -54, 250, 9, 58, 90];
  // const [data, setData] = useState([
  //   [-103, false],
  //   [-13, false],
  //   [0, false],
  //   [20, false],
  //   [50, false],
  //   [-54, false],
  //   [250, false],
  //   [9, false],
  //   [58, false],
  //   [90, false],
  // ]);
  const [data, setData] = useState([-103, -13, 0, 20, 50, -54, 250, 9, 58, 90]);
  const [number, setNumber] = useState(null);
  const dataAbsolute = data.map((p) => Math.abs(p));
  const dataMax = d3.max(dataAbsolute);
  console.log(dataMax);
  const scaleChart = d3.scaleLinear().domain([0, dataMax]).range([0, 100]);
  const scaleAxisPositive = d3
    .scaleLinear()
    .domain([-dataMax, dataMax])
    .range([100, -100]);
  const axisGenerator = d3.axisLeft(scaleAxisPositive).ticks(10);
  const testNumber = 1;

  console.log(testNumber, scaleChart(testNumber));

  const svgRef = useRef(null);
  const svgClock = useRef(null);
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  const shapeWidth = 40;
  const circlemove = 40;

  const dataClock = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 12];
  const dataClockAbsolute = dataClock.map((p) => Math.abs(p));
  const radius = 200;
  let i = 0;
  let t = 0;
  let pathArray = [];

  function handleNumberSet(event) {
    setNumber(event.target.value);
  }

  function handleElementAdd() {
    let newData = data.slice();
    newData.push(parseInt(number));
    setData(newData);
    setNumber("");
  }

  function handleMultiplyAdd() {
    let newData = [];
    for (let x of data) {
      let y = x + parseInt(number);
      newData.push(y);
    }
    setData(newData);
  }

  useEffect(() => {
    const canvas = d3
      .select(svgRef.current)
      .attr("width", innerWidth)
      .attr("height", innerHeight);

    canvas.selectAll("*").remove();

    const graph = canvas.append("g").attr("transform", "translate(30,150)");
    const axis = canvas
      .append("g")
      .call(axisGenerator)
      .attr("transform", "translate(30, 150)");

    const bars = graph.selectAll("g").data(dataAbsolute.entries()).join("g");
    let pathArrayX = [];
    let pathArrayY = [];
    bars
      .append("rect")

      .attr("x", (point) => point[0] * shapeWidth)
      .attr("y", (point) =>
        data[point[0]] >= 0 ? -scaleChart(point[1][1]) : 0
      )
      // .attr("y", (point) => pathArray.push(point))
      .attr("width", shapeWidth)
      .attr("height", (point) => scaleChart(point[1]))
      .attr("fill", (point) => (data[point[0]] >= 0 ? "green" : "red"))
      .attr("stroke", "#111")
      .attr("stroke-width", shapeWidth / 30);
    function changeColor(currentCollor) {
      console.log("currentCollor", currentCollor);
      if (currentCollor == "red") {
        console.log("yes");
        return "black";
      } else {
        console.log("no");
        return "red";
      }
    }
    bars
      .append("circle")
      .attr("cx", (point) => point[0] * shapeWidth + shapeWidth / 2)
      .attr("cy", (point) =>
        data[point[0]] >= 0
          ? -scaleChart(point[1] + circlemove)
          : scaleChart(point[1] + circlemove)
      )
      .attr("r", 16)
      .style("fill", "red")
      .style("stroke", "white")
      .on("click", function () {
        let currentCollor = d3.select(this).style("fill");
        d3.select(this).style("fill", changeColor(currentCollor));

        console.log("currentCollor", currentCollor);
      });

    bars
      .append("text")
      .attr("x", (point) => point[0] * shapeWidth + shapeWidth / 2)
      .attr("y", (point) =>
        data[point[0]] >= 0 ? -scaleChart(point[1]) : scaleChart(point[1])
      )
      .attr("text-anchor", "middle")
      .attr("font-size", 14)
      .attr("transform", (point) =>
        data[point[0]] >= 0 ? "translate(0, -2)" : "translate(0, 14)"
      )
      .text((point) => data[[point[0]]]);
    // const pathArray = bars.selectAll("text").attr("x", "y");
    const path = graph.selectAll("g").data(dataAbsolute.entries()).join("g");

    // for (let x = 0; x < pathArrayX.length; x++)
    //   for (let y = 0; y < pathArrayY.length; y++) {
    //     if (x == y) {
    //       pathArray.push([pathArrayX[x], pathArrayY[y]]);
    //     }
    //   }
    //   }

    path
      .append("path")
      .attr(
        "d",
        d3
          .line()
          .defined((d) => d != null)
          .x((point) => point[0] * shapeWidth + shapeWidth / 2)
          .y((point) =>
            point[1] >= 0 ? -scaleChart(point[1]) : -scaleChart(point[1])
          )
          .curve(d3.curveCardinal)(data.entries())
      )

      .attr("fill", "none")
      .style("stroke", "white")
      .style("stroke-width", 3);
    let color = d3
      .scaleOrdinal()
      .domain(data)
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);
    const degToRad = (degrees) => {
      return degrees * (Math.PI / (360 / 2));
    };
    const pie = d3
      .pie()
      .padAngle(degToRad(2))
      .value((point) => point[1])(data.entries());

    const arcGenerator = d3.arc().innerRadius(110).outerRadius(150);
    const pieChart = canvas.append("g");
    pieChart
      .selectAll("pie")
      .data(
        pie.filter(function (pie) {
          return pie.data[1] > 0;
        })
      )
      .join("path")
      .attr("d", arcGenerator)
      .attr("transform", "translate(750, 245)")
      .style("fill", color)
      .style("stroke", "lightgrey")
      .style("stroke-width", 3);

    const textChart = canvas.append("g");
    textChart
      .selectAll("text")
      .data(
        pie.filter(function (pie) {
          return pie.data[1] > 0;
        })
      )
      .join("text")
      .attr("d", arcGenerator)
      .attr("transform", "translate(750, 250)")
      .attr("font-size", 20)
      .attr("font-weight", "solid")
      .attr("text-anchor", "middle")
      .attr("fill", "lightgrey")
      .attr("x", (d) => arcGenerator.centroid(d)[0])
      .attr("y", (d) => arcGenerator.centroid(d)[1])
      .text((point) => point.data[1]);
  }, [svgRef.current, data]);

  useEffect(() => {
    const canvas = d3
      .select(svgClock.current)
      .attr("width", innerWidth)
      .attr("height", innerHeight);

    canvas.selectAll("*").remove();
    const cica = canvas
      .append("g")
      .attr("transform", "translate(300, 300),rotate(-90)");
    const clock = canvas.append("g").attr("transform", "translate(300, 300)");

    clock
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", radius)
      .style("fill", "transparent")
      .style("stroke", "black");

    const figure = cica.selectAll("g").data(dataClock.entries()).join("g");
    // figure;
    // .attr("transform", function () {
    //   i = i + 360 / 12;
    //   return "rotate(" + i + " )";
    // })
    // .attr("x", 180);
    // .attr(selectAll("g"))
    // .attr("transform", "translate(0, 0),rotate(" + i + 15 + ")");

    // figure
    //   .append("rect")

    //   .attr("width", 160)
    //   .attr("height", 20)
    //   .attr("fill", "red")
    //   .attr("stroke", "#111");

    const text = figure.append("g").attr("transform", "translate(180, 0)");

    text
      // .selectAll("g")
      .append("text")

      .attr("x", 180)
      // .attr("x", 180)

      .attr("text-anchor", "middle")
      .attr("font-size", 14)
      // .attr("transform", function () {
      //   i = i + 360 / 12;
      //   return "rotate(" + i + " )";
      // })
      // .attr("transform", "rotate(0)")
      // .attr("transform", "translate(0,0)")
      .text((point) => dataClockAbsolute[point[0]]);
    // const text = figure.selectAll("g").data(dataClock.entries()).join("g");

    // .attr("stroke", "#111");

    // const seconds = cica.selectAll("g").data(dataClock.entries()).join("g");
    // console.log("second: ", second);
    // seconds.attr("transform", function () {
    //   i = 6 * second;
    //   return "rotate(" + i + " )";
    // });
    // // .attr("x", 180);

    // seconds
    //   .append("rect")

    //   .attr("width", 160)
    //   .attr("height", 1)
    //   .attr("fill", "red");
  }, [svgClock.current, second]);

  return (
    <>
      <svg ref={svgRef} />;
      <input
        type="number"
        onClick={handleNumberSet}
        onChange={handleNumberSet}
        value={number}
      ></input>
      <button onClick={handleElementAdd}>Add</button>
      <button onClick={handleMultiplyAdd}>Plus</button>
      {/* <svg ref={svgClock} />; */}
    </>
  );
}
