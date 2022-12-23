const h = 600;
const padding = {
  top: 20,
  bottom: 130,
  left: 80,
  right: 50,
};
const basicAlpha = 0.4;
const parseYear = d3.timeParse("%Y");
const month = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
const colors_n = 9;

fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
  .then((res) => res.json())
  .then((data) => {
    const basic = data.baseTemperature;
    data = data.monthlyVariance;
    d3.select("#description").text(`${d3.extent(data, (d) => d.year).join(" - ")}: base temperature ${basic}℃`);
    const graph = d3.select("#graph");
    const svg = graph.append("svg").attr("height", h);
    const legend = svg
      .append("g")
      .attr("id", "legend")
      .attr("transform", `translate(${padding.left}, ${h - 60})`);
    const legend_w = 300,
      legend_h = 30;
    const max = d3.max(data.map((d) => d.variance + basic));
    const min = d3.min(data.map((d) => d.variance + basic));
    const legendScale = d3.scaleLinear().domain([min, max]).range([0, legend_w]);
    const legendColors = d3
      .scaleThreshold()
      .domain(d3.range(min, max, (max - min) / (colors_n - 1)))
      .range(d3.schemeRdYlBu[colors_n].reverse());
    const xScale = d3.scaleBand().domain(data.map((d) => d.year));
    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .rangeRound([h - padding.bottom, padding.top]);
    const xAxis = svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${h - padding.bottom})`);
    const yAxis = svg.append("g").attr("id", "y-axis").attr("transform", `translate(${padding.left}, 0)`);
    const cells = svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("fill", (d) => legendColors(d.variance + basic))
      .attr("data-month", (d) => d.month)
      .attr("data-year", (d) => d.year)
      .attr("data-temp", (d) => d.variance)
      .attr("y", (d) => yScale(d.month))
      .attr("height", (d) => yScale.bandwidth(d.month));
    const tooltip = graph.append("div").attr("id", "tooltip");
    legend
      .append("g")
      .selectAll("rect")
      .data(legendColors.range().map((d) => legendColors.invertExtent(d).map((a, i) => (a === null ? xScale.domain()[i] : a))))
      .enter()
      .append("rect")
      .attr("height", 6)
      .attr("width", (d) => (d[0] && d[1] ? legendScale(d[1]) - legendScale(d[0]) : legendScale(null)))
      .attr("x", (d) => legendScale(d[0]))
      .attr("fill", (d) => legendColors(d[0]));
    legend
      .append("g")
      .call(
        d3
          .axisBottom(legendScale)
          .tickFormat((d) => `${Math.round(d * 10) / 10}℃`)
          .tickValues(legendColors.domain())
      )
      .select(".domain")
      .remove();
    function drawChart() {
      const w = parseInt(d3.select("#graph").style("width"), 10);
      svg.attr("width", w);
      xScale.range([padding.left, w - padding.right]);
      xAxis.call(d3.axisBottom(xScale).tickValues(xScale.domain().filter((d) => d % 10 === 0))).selectAll("g");
      yAxis.call(d3.axisLeft(yScale).tickFormat((d) => month[d])).selectAll("g");
      cells
        .attr("x", (d) => xScale(d.year))
        .attr("width", (d) => xScale.bandwidth(d.year))
        .on("mouseover", (event, d) => {
          let x = event.layerX;
          let y = event.layerY;
          tooltip
            .classed("active", true)
            .html(`${d.year} - ${month[d.month]}<br>${(basic + d.variance).toFixed(1)}℃<br>${d.variance > 0 ? "+" : ""}${d.variance.toFixed(1)}℃`)
            .attr("data-year", d.year)
            .attr("data-month", d.month)
            .attr("style", `left: ${x < w / 2 ? x + 30 : x - 180}px; top: ${y < h / 2 ? y : y - 100}px`);
        })
        .on("mouseout", () => tooltip.classed("active", false));
    }
    drawChart();
    window.addEventListener("resize", drawChart);
  });
