import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function Test() {

    // const data = [1, 5, -1, 1, 5, -1];

    const [number, setNumber] = useState(null);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState([4, 5, 6]);



    function handleNumberSet(event) {

        let newNumber = parseInt(event.target.value);

        setNumber(newNumber);

    }

    function handleElementAdd() {
        let newData = data.slice();
        newData.push(number);
        setData(newData);
        setNumber("");
    }


    var color = d3.scaleOrdinal().domain(data).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])


    const dataAbsolute = data.map((p) => Math.abs(p));




    let maxAxisAmplitude = d3.max(dataAbsolute)

    const scaleChart = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, 250]);


    const scaleAxisPositive = d3.scaleLinear()
        .domain([-d3.max(data), d3.max(data)])
        .range([250, -250]);

    const axisGenerator = d3.axisRight(scaleAxisPositive)
        .ticks(10);




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
            .attr("fill", function (point) {
                if (selected.includes(point[0])) {
                    return "white"
                };
                return (data[point[0]] > 0 ? "teal" : "olive")

            })

            .attr("stroke", "#111")
            .attr("stroke-width", shapeWidth / 30)
            .attr("transform", "translate(50, 350)")
            // .on("mouseover", function () {
            //     if (d3.select(this).style("fill") !== "white") {
            //         d3.select(this).style("fill", "white");
            //     };
            // })

            // .on("mouseout", function () {
            //     if (d3.select(this).style("fill") === "white") {
            //         let elemColor = point => data[point[0]] > 0 ? "teal" : "olive";
            //         d3.select(this).style("fill", "white");
            //         setTimeout(() => {
            //             d3.select(this).style("fill", elemColor);
            //         }, 150);
            //     };

            // })

            .on("click", function () {
                let selectedList = selected.slice();
                console.log("Is datapoint ", d3.select(this).data()[0][0], " missing from the list ? ", !selectedList.includes(d3.select(this).data()[0][0]))
                if (!selectedList.includes(d3.select(this).data()[0][0])) {
                    selectedList.push(d3.select(this).data()[0][0]);
                    console.log("list as set in selected", selectedList)
                }
                else {

                    let tobeRemoved = selectedList.indexOf(d3.select(this).data()[0][0]);
                    selectedList.splice(tobeRemoved, 1);


                }

                setSelected(selectedList);
                console.log("Datapoint ", d3.select(this).data()[0][0], " has been amended.");
                console.log("Inside the MouseIn Gate 1, value of selected at end of IF: ", selected);
            })

        console.log("Outside the function Selected List: ", selected);

        const line = d3.line()
            .defined(d => d != null)
            .x(point => point[0] * shapeWidth)
            .y(point => (point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8)))
            .curve(d3.curveCardinal)(data.entries())
            ;


        d3.select("svg")
            .append("path")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 3)
            .attr("transform", "translate(65, 350)")


        const path2 = canvas.append("g");
        path2
            .append("path")

            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "green")
            .style("stroke-width", 3)
            .attr("transform", "translate(65, 850)")


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

        const degToRad = (degrees) => {
            return degrees * (Math.PI / (360 / 2))
        }

        const pie = d3.pie()
            .padAngle(degToRad(2))
            .value(point => point[1])(data.entries());


        const polarPie = d3.pie()
            .sort(null)

            .value(point => point[1])(data.entries());

        const arcGenerator = d3.arc()
            .innerRadius(110)
            .outerRadius(150);

        const polarAngle = (data) => {
            return (2 * Math.PI / data.length);
        }



        const polarArcGenerator = d3.arc()
            .innerRadius(110)
            .outerRadius(150)
            .startAngle(point => point.data[0] * polarAngle(data))
            .endAngle(point => point.data[0] * polarAngle(data) + polarAngle(data));

        const pieChart = canvas.append("g");
        pieChart
            .selectAll("pie")
            .data(pie.filter(function (pie) { return pie.data[1] > 0 }))
            .join("path")
            .attr("d", arcGenerator)
            .attr("transform", "translate(750, 245)")
            .style("fill", function (point) {
                // console.log("Point", point)
                if (selected.includes(point.data[0])) {
                    return "white"
                }
                return color(point.data[1])
            })
            .on("click", function (point) {
                let selectedList = selected.slice();
                console.log("point", point)
                console.log("this", d3.select(this).data()[0].data[0])
                console.log("this point", d3.select(this).data()[0].data[1])
                console.log("Is datapoint ", d3.select(this).data()[0].data[1], " missing from the list ? ", !selectedList.includes(d3.select(this).data()[0].data[0]))
                if (!selectedList.includes(d3.select(this).data()[0].data[0])) {
                    selectedList.push(d3.select(this).data()[0].data[0]);
                    console.log("list as set in selected", selectedList);
                }
                else {

                    let tobeRemoved = selectedList.indexOf(d3.select(this).data()[0].data[0]);
                    selectedList.splice(tobeRemoved, 1);
                }

                setSelected(selectedList);
                console.log("Datapoint ", d3.select(this).data()[0].data[0], " has been amended.");
                console.log("Inside the MouseIn Gate 1, value of selected at end of IF: ", selected);
            })
            .style("stroke", "grey")
            .style("stroke-width", 1)


        const pieAnnotation = canvas.append("g");
        pieAnnotation
            .selectAll("text")
            .data(pie.filter(function (pie) { return pie.data[1] > 0 }))
            .join("text")
            .attr("fill", "lightgrey")
            .attr("font-size", 20)
            .attr("font-weight", "bold")
            .attr("d", arcGenerator)
            .attr("x", d => arcGenerator.centroid(d)[0])
            .attr("y", d => arcGenerator.centroid(d)[1])
            .attr("transform", "translate(745, 250)")

            .text(d => d.data[1])





        const polarLine = d3.line()
            .defined(d => d != null)
            .x(d => (polarArcGenerator.centroid(d)[0] + (polarArcGenerator.centroid(d)[0] * (d.data[1] / maxAxisAmplitude))) / 2)
            .y(d => (polarArcGenerator.centroid(d)[1] + (polarArcGenerator.centroid(d)[1] * (d.data[1] / maxAxisAmplitude))) / 2)
            .curve(d3.curveCatmullRomClosed)(polarPie)


        const radarNegative = canvas.append("g");
        radarNegative
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 65)
            .attr("fill", "red")
            .attr("fill-opacity", "0.3")
            .attr("stroke-width", 3)
            .attr("transform", "translate(745, 800)")


        const polarPath = canvas.append("g");
        polarPath
            .append("path")
            .attr("d", polarLine)
            .style("fill", "lightblue")
            .style("stroke", "teal")
            .style("stroke-width", 2)
            .attr("transform", "translate(745, 800)")



        const radarZero = canvas.append("g");
        radarZero
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 65)
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("stroke", "red")
            .attr("transform", "translate(745, 800)")



        const radarLabels = canvas.append("g");
        radarLabels
            .selectAll("text")

            .data(polarPie)

            .join("text")
            .attr("fill", "teal")
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .attr("d", polarArcGenerator)
            .attr("x", d => (polarArcGenerator.centroid(d)[0] * 1.3))
            .attr("y", d => (polarArcGenerator.centroid(d)[1] * 1.3))
            .attr("transform", "translate(720, 810)")
            .text(d => `Pos ${d.data[0]}`)

        const radarMax = canvas.append("g");
        radarMax
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 130)
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("stroke", "gray")
            .attr("transform", "translate(745, 800)")



        const radarAxes = canvas.append("g");

        radarAxes

            .selectAll("line")
            .data(polarPie)
            .join("line")
            .style("stroke", "gray")
            .attr("stroke-width", 0.4)
            .attr("d", polarArcGenerator)
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("x2", d => (polarArcGenerator.centroid(d)[0]))
            .attr("y2", d => (polarArcGenerator.centroid(d)[1]))

            .attr("transform", "translate(745, 800)")


        const radarAnnotation = canvas.append("g");
        radarAnnotation
            .selectAll("text")
            .data(polarPie)
            .join("text")
            .attr("fill", "white")
            .attr("font-size", 16)
            .attr("font-weight", "bold")
            .attr("d", polarArcGenerator)
            .attr("x", d => (polarArcGenerator.centroid(d)[0] + (polarArcGenerator.centroid(d)[0] * (d.data[1] / maxAxisAmplitude))) / 2)
            .attr("y", d => (polarArcGenerator.centroid(d)[1] + (polarArcGenerator.centroid(d)[1] * (d.data[1] / maxAxisAmplitude))) / 2)
            .attr("transform", "translate(745, 800)")
            .text(d => d.data[1])



    }, [svgRef.current, data, selected])

    return (<><svg ref={svgRef} />
        <input type="number" onChange={handleNumberSet} value={number}></input>
        <button onClick={handleElementAdd}>Add</button>
    </>);
}