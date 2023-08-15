import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function Test() {


    const [number, setNumber] = useState(null);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState([4, 5, 6]);
    const [funnyList, setFunnyList] = useState([]);





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


    let maxAxisAmplitude = d3.max(dataAbsolute);

    const scaleChart = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, 250]);


    const scaleAxisPositive = d3.scaleLinear()
        .domain([-d3.max(data), d3.max(data)])
        .range([250, -250])

        ;

    const axisGenerator = d3.axisRight(scaleAxisPositive)
        .ticks(10)
        // .stroke("#E04836")
        ;

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
            .style("background-color", "black")


        canvas
            .selectAll("*")

            .remove();

        const rect = canvas
            .append("g")

        const axis = canvas.append("g")
            .call(axisGenerator)
            .style("stroke", "lightgrey")
            .attr("transform", "translate(50, 350)")

        axis.selectAll("line")
            .style("stroke", "grey")

        axis.selectAll(".domain")
            .style("stroke", "grey")

        rect.selectAll("rect")
            .data(dataAbsolute.entries())

            .join("rect")
            .attr("class", "rect")
            .attr("x", point => point[0] * shapeWidth)
            .attr("y", 0)
            .attr("width", shapeWidth)
            .attr("height", 0)
            // .attr("fill", "black")
            .attr("fill", function (point) {

                return (point[1] > 0 ? "teal" : "olive")


            })

            .attr("stroke", "#111")
            .attr("stroke-width", shapeWidth / 30)

            .attr("transform", "translate(50, 350)")



            .transition()
            .attr("height", point => scaleChart(point[1]))
            .attr("y", point => data[point[0]] > 0 ? -scaleChart(point[1]) : 0)

            .duration(1200)

            .delay(function (point) { return (250 + Math.abs(point[0] * 200)) })
            .ease(d3.easeCubicInOut)



        const line = d3.line()
            .defined(d => d != null)
            .x(point => point[0] * shapeWidth)
            .y(point => (point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8)))
            .curve(d3.curveCardinal)(data.entries())
            ;



        // console.log("Outside the function Selected List: ", selected);

        d3.select("svg")
            .append("path")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 3)
            .attr("transform", "translate(65, 350)")


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



        // const funnyLine = d3.line()
        //     .x(point => point[0] * shapeWidth)
        //     .y(point => (point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8)))
        //     .curve(d3.curveCardinal)(funnyList.entries())

        //     ;



        // const path2 = canvas.append("g");
        // path2
        //     .append("path")
        //     // .data(funnyList.entries())
        //     .attr("d", funnyLine)
        //     .attr("class", "path2")
        //     .style("fill", "none")
        //     .style("stroke", "#17becf")
        //     .style("stroke-width", 3)
        //     .attr("transform", "translate(65, 850)")

        // const circle2 = canvas.append("g");
        // circle2
        //     .selectAll("circle")
        //     .data(funnyList.entries())
        //     .join("circle")
        //     .attr("class", "circle2")
        //     .attr("cx", point => point[0] * shapeWidth + (shapeWidth / 2))
        //     .attr("cy", point => point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8))
        //     .attr("r", 10)
        //     .style("fill", function (point) {

        //         return "black"
        //     })
        //     .attr("transform", "translate(50, 845)")




        // const text2 = canvas.append("g");
        // text2
        //     .selectAll("text")
        //     .data(funnyList.entries())
        //     .join("text")
        //     .attr("fill", "white")
        //     .attr("font-size", 12)
        //     .attr("font-weight", "bold")
        //     .attr("x", point => (point[0] * shapeWidth + (shapeWidth / 2)))
        //     .attr("y", point => (point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8)))


        //     .attr("transform", "translate(50, 850)")
        //     .attr("text-anchor", "middle")
        //     .text(d => d[1]);





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
            .endAngle(point => point.data[0] * polarAngle(data) + polarAngle(data))
            ;

        const pieChart = canvas.append("g");
        pieChart
            .selectAll("pie")
            .data(pie.filter(function (pie) { return pie.data[1] > 0 }))
            .join("path")
            .attr("class", "pieChart")
            .attr("d", arcGenerator)
            .attr("transform", "translate(750, 245)")
            .style("fill", function (point) {
                // console.log("Point", point)
                return color(point.data[1])
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
            .attr("fill-opacity", "0.5")
            // .attr("stroke-opacity", "0.5")
            .attr("transform", "translate(745, 800)")


        const polarPath = canvas.append("g");
        polarPath
            .append("path")
            .attr("d", polarLine)
            .style("fill", "#17becf")
            .style("fill-opacity", "0.65")
            .style("stroke", "#17becf")
            .style("stroke-width", 3)
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
            .attr("stroke-opacity", "0.5")
            .attr("transform", "translate(745, 800)")





        const radarLabels = canvas.append("g");
        radarLabels
            .selectAll("text")

            .data(polarPie)

            .join("text")
            .attr("class", "radarLabels")
            // .attr("fill", "grey")

            .attr("fill", function (point) {
                return "grey"
            })
            .attr("font-size", function (point) {
                return "14"
            })
            .attr("font-weight", "bold")
            .attr("d", polarArcGenerator)
            .attr("x", d => (polarArcGenerator.centroid(d)[0] * 1.3))
            .attr("y", d => (polarArcGenerator.centroid(d)[1] * 1.3))
            .attr("transform", "translate(730, 810)")
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


        console.log("funnyArray effect 2:", funnyList);

        const funnyLine = d3.line()
            .x(point => point[0] * shapeWidth)
            .y(point => (point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8)))
            .curve(d3.curveCardinal)(funnyList.entries())

            ;



        const path2 = canvas.append("g");
        path2
            .append("path")
            // .data(funnyList.entries())
            .attr("d", funnyLine)
            .attr("class", "path2")
            .style("fill", "none")
            .style("stroke", "#17becf")
            .style("stroke-width", 3)
            .attr("transform", "translate(65, 850)")

        const circle2 = canvas.append("g");
        circle2
            .selectAll("circle")
            .data(funnyList.entries())
            .join("circle")
            .attr("class", "circle2")
            .attr("cx", point => point[0] * shapeWidth + (shapeWidth / 2))
            .attr("cy", point => point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8))
            .attr("r", 10)
            .style("fill", function (point) {

                return "black"
            })
            .attr("transform", "translate(50, 845)")




        const text2 = canvas.append("g");
        text2
            .selectAll("text")
            .data(funnyList.entries())
            .join("text")
            .attr("fill", "white")
            .attr("font-size", 12)
            .attr("font-weight", "bold")
            .attr("x", point => (point[0] * shapeWidth + (shapeWidth / 2)))
            .attr("y", point => (point[1] >= 0 ? (-scaleChart(point[1]) + 18) : (- scaleChart(point[1]) - 8)))


            .attr("transform", "translate(50, 850)")
            .attr("text-anchor", "middle")
            .text(d => d[1]);
    }
        , [svgRef.current, data, funnyList])

    useEffect(() => {
        const funnyData = function () {
            let funnyArray = data.slice();
            console.log("funny data fired:", funnyArray);
            for (let item in selected) {
                console.log("funny data selected:", selected[item], typeof selected[item], funnyArray[selected[item]]);
                funnyArray[selected[item]] = 0;
            };
            console.log("funny array set:", funnyArray);
            setFunnyList(funnyArray);
        };
        funnyData();
        console.log("funnyArray Effect 1:", funnyList);

        // d3.selectAll(".path2")
        //     .attr("d", funnyLine)

    }
        , [svgRef.current, data, selected])


    useEffect(() => {
        console.log("Select use effect on fire")
        // funnyData();

        d3.selectAll(".rect")
            .style("fill", function (point) {
                if (selected.includes(point[0])) {
                    return "white"
                };
                return (data[point[0]] > 0 ? "teal" : "olive")

            })

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
                // funnyData();
                console.log("Datapoint ", d3.select(this).data()[0][0], " has been amended.");
                console.log("Inside the MouseIn Gate 1, value of selected at end of IF: ", selected);
            })



        // d3.selectAll(".path2")
        //     .attr("d", funnyLine)


        d3.selectAll(".circle2")
            .data(funnyList.entries())
            .style("fill", function (point) {
                // console.log("Point Circle", point)
                if (selected.includes(point[0])) {
                    return "red"
                }
                return "black"
            })
            .on("click", function (point) {
                let selectedList = selected.slice();
                console.log("this", d3.select(this).data()[0][0])
                if (!selectedList.includes(d3.select(this).data()[0][0])) {
                    selectedList.push(d3.select(this).data()[0][0]);

                }
                else {

                    let tobeRemoved = selectedList.indexOf(d3.select(this).data()[0][0]);
                    selectedList.splice(tobeRemoved, 1);
                }

                setSelected(selectedList);
                // funnyData();
            })

        d3.selectAll(".pieChart")
            //     
            .on("click", function (point) {
                let selectedList = selected.slice();
                if (!selectedList.includes(d3.select(this).data()[0].data[0])) {
                    selectedList.push(d3.select(this).data()[0].data[0]);

                }
                else {

                    let tobeRemoved = selectedList.indexOf(d3.select(this).data()[0].data[0]);
                    selectedList.splice(tobeRemoved, 1);
                }

                setSelected(selectedList);
                // funnyData();

            })
            .style("fill", function (point) {
                if (selected.includes(point.data[0])) {
                    return "white"
                };
                console.log("datapoint", point.data[1]);
                return (point.data[1] > 0 ? "teal" : "olive")

            })

        d3.selectAll(".radarLabels")
            .on("click", function (point) {
                let selectedList = selected.slice();
                // console.log("this polar", d3.select(this).data()[0].data[0])
                if (!selectedList.includes(d3.select(this).data()[0].data[0])) {
                    selectedList.push(d3.select(this).data()[0].data[0]);

                }
                else {

                    let tobeRemoved = selectedList.indexOf(d3.select(this).data()[0].data[0]);
                    selectedList.splice(tobeRemoved, 1);
                }

                setSelected(selectedList);
                // funnyData();
            })

            .attr("fill", function (point) {
                if (selected.includes(point.data[0])) {
                    return "white"
                };
                return (point.data[1] > 0 ? "teal" : "olive")

            })

            .attr("font-size", function (point) {
                // console.log("Point Polar", point.data[0])
                if (selected.includes(point.data[0])) {
                    return "16"
                }
                return "14"
            })

        console.log("funnyArray effect 3:", funnyList);
    }
        , [svgRef.current, data, selected, funnyList])



    return (<><svg ref={svgRef} />
        <input type="number" onChange={handleNumberSet} value={number}></input>
        <button onClick={handleElementAdd}>Add</button>
    </>)
}
