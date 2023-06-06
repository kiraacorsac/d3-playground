import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function Test() {

    const data = [3, 3, 4, -1, 8, 3, 3, -3, 4, 6, 2, 3];
    var points = [[10, -45], [55, -90], [100, -15], [145, -65], [190, -55]];
    const otherData = [[0, 3], [1, 3], [2, 4], [3, -1], [4, 8], [5, -3], [6, 1], [7, 12], [8, 5], [9, 3], [10, -10]];

    console.log("data", data);
    console.log("data entries", data.entries());

    var color = d3.scaleOrdinal().domain(data).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    const dataAbsolute = data.map((p) => Math.abs(p));

    for (const i in data) {
        console.log("i, v pair:", i, data[i])
    };

    console.log("dataAbsolute", dataAbsolute);

    const scaleChart = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, 250])

    const scaleAxisPositive = d3.scaleLinear()
        .domain([-d3.max(data), d3.max(data)])
        .range([250, -250])

    const axisGenerator = d3.axisRight(scaleAxisPositive)
        .ticks(10)

    // const radarLine = d3.lineRadial()
    //     .curve(d3.curveCardinalClosed)
    //     .radius(function (d) { return rScale(d.value); })
    //     .angle(function (d, i) { return i * angleSlice; });


    const svgRef = useRef(null);
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const shapeWidth = 30
    const xdelta = 30


    useEffect(() => {
        const canvas = d3
            .select(svgRef.current)
            .attr("width", innerWidth)
            .attr("height", innerHeight)
        // .attr("transform", "translate(0, 250)")

        canvas
            .selectAll("*")

            .remove();

        const rect = canvas
            .append("g")

        const axis = canvas.append("g")
            .call(axisGenerator)
            .attr("transform", "translate(50, 350)")



        rect.selectAll("rect")
            .data(dataAbsolute.entries())

            .join("rect")
            .attr("x", point => point[0] * shapeWidth)
            .attr("y", point => data[point[0]] > 0 ? -scaleChart(point[1]) : 0)
            .attr("width", shapeWidth)
            .attr("height", point => scaleChart(point[1]))
            .attr("fill", point => data[point[0]] > 0 ? "teal" : "olive")
            .attr("stroke", "#111")
            .attr("stroke-width", shapeWidth / 30)
            .attr("transform", "translate(50, 350)")



        // const line = d3.line()
        //     .defined(d => d != null);



        const line = d3.line()
            // .data(data.entries())
            .defined(d => d != null)
            .x(point => point[0] * shapeWidth)
            .y(point => (point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8)))
            .curve(d3.curveCardinal)(data.entries())
            ;


        for (const [key, value] of data.entries()) {
            console.log("key, value", key, value);
        }

        d3.select("svg")
            .append("path")
            // .data([points])
            // .data(data)
            // .data([data.entries()])
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 3)
            .attr("transform", "translate(65, 350)")


        console.log("carambar", line)

        const path2 = canvas.append("g");
        path2
            // .selectAll("path2")
            // .data(data.entries())
            // .join("path2")

            // .data([otherData])
            // .data([data.entries()])
            .append("path")

            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "green")
            .style("stroke-width", 3)
            .attr("transform", "translate(65, 850)")


        // const path4 = canvas.append("line");
        // path4
        //     // .selectAll("path")
        //     // .data(data.entries())
        //     // .join("path")
        //     .attr("fill", "none")
        //     .style("stroke", "grey")
        //     .style("stroke-width", 5)
        //     .attr("x1", 10)
        //     .attr("y1", -45)
        //     .attr("x2", 200)
        //     .attr("y2", -102)
        //     // .attr("d", d3.line()
        //     //     .x(point => point[0])
        //     //     .y(point => point[1]))
        //     .attr("transform", "translate(50, 350)")

        const circle = canvas.append("g");
        circle
            .selectAll("circle")
            .data(data.entries())
            .join("circle")
            .attr("cx", point => point[0] * shapeWidth + (shapeWidth / 2))
            .attr("cy", point => point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8))
            .attr("r", 10)
            .attr("fill", "black")
            .attr("transform", "translate(50, 345)")




        const text = canvas.append("g");
        text
            .selectAll("text")
            .data(data.entries())
            .join("text")
            .attr("fill", "white")
            .attr("font-size", 12)
            .attr("font-weight", "bold")
            .attr("x", point => (point[0] * shapeWidth + (shapeWidth / 2)))
            .attr("y", point => (point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8)))


            .attr("transform", "translate(50, 350)")
            .attr("text-anchor", "middle")


            .text(d => d[1]);


        const circle2 = canvas.append("g");
        circle2
            .selectAll("circle")
            .data(data.entries())
            .join("circle")
            .attr("cx", point => point[0] * shapeWidth + (shapeWidth / 2))
            .attr("cy", point => point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8))
            .attr("r", 10)
            .attr("fill", "black")
            .attr("transform", "translate(50, 845)")




        const text2 = canvas.append("g");
        text2
            .selectAll("text")
            .data(data.entries())
            .join("text")
            .attr("fill", "white")
            .attr("font-size", 12)
            .attr("font-weight", "bold")
            .attr("x", point => (point[0] * shapeWidth + (shapeWidth / 2)))
            .attr("y", point => (point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8)))


            .attr("transform", "translate(50, 850)")
            .attr("text-anchor", "middle")


            .text(d => d[1]);

        // const polar = canvas.append("g")
        // polar.append("path")
        //     .attr("class", "radarStroke")
        //     .attr("d", function (d, i) { console.log(radarLine(d)); return radarLine(d); })
        //     .style("stroke-width", 3)
        //     .style("stroke", "blue")
        //     .style("fill", "none")
        //     .style("filter", "url(#glow)");

        const pie = d3.pie()
            .value(point => point[1])(data.entries());


        const pieChart = canvas.append("g");
        pieChart
            .selectAll("pie")
            .data(pie)
            .join("path")
            .attr("d", d3.arc().innerRadius(0).outerRadius(150))
            .attr("transform", "translate(750, 245)")
            .style("fill", color)
            .style("stroke", "lightgrey")
            .style("stroke-width", 3)



    }, [svgRef.current])

    return <svg ref={svgRef} />;
}