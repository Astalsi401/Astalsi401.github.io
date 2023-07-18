class PlotGraph {
  constructor(graph, data, lang) {
    this.listed_c = "255, 153, 0";
    this.otc_c = "5, 94, 171";
    this.lang = lang;
    this.isTC = this.lang === "tc";
    this.listed = { en: "Listed", tc: "上市" };
    this.height = 360;
    this.data = data;
    this.graph = d3.select(graph);
    this.svg = this.graph.append("svg").attr("height", this.height);
    this.padding = {
      t: 35,
      b: 45,
      s: 25,
      e: 20,
    };
    this.xScale = d3.scaleLinear().domain(d3.extent(this.data, (d) => d.growth));
    this.yScale = d3
      .scaleLinear()
      .domain(d3.extent(this.data, (d) => d.EPS))
      .range([this.height - this.padding.b, this.padding.t]);
    this.xAxis = d3.axisBottom(this.xScale).tickFormat((d) => `${d}%`);
    this.yAxis = d3.axisLeft(this.yScale);
    this.xAxis_g = this.svg.append("g");
    this.yAxis_g = this.svg.append("g");
    this.gridlines = this.svg.append("g").attr("class", "gridlines").selectAll("gridline").data(this.yAxis.scale().ticks()).enter().append("line").attr("stroke", "rgb(223, 223, 223)");
    this.xLine = this.svg.append("line").style("stroke", "red").style("stroke-dasharray", "5,5");
    this.yLine = this.svg.append("line").style("stroke", "red").style("stroke-dasharray", "5,5");
    this.circles = this.svg
      .selectAll("circle")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("stroke", (d) => (d.market === "上市" ? `rgb(${this.listed_c})` : `rgb(${this.otc_c})`))
      .attr("fill", (d) => (d.market === "上市" ? `rgb(${this.listed_c}, 0.3)` : `rgb(${this.otc_c}, 0.3)`))
      .attr("data-eps", (d) => d.EPS)
      .attr("data-growth", (d) => d.growth)
      .attr("cy", (d) => this.yScale(d.EPS));
    this.xTitle = this.svg
      .append("text")
      .attr("class", "x-axis-title")
      .text(this.isTC ? "平均薪資年增率(%)" : "Avg. Salary Growth(%)")
      .attr("text-anchor", "middle")
      .style("text-align", "center");
    this.yTitle = this.svg.append("g").attr("class", "y-axis-title");
    this.yTitle.append("text").text(this.isTC ? "EPS成長(元)" : "EPS (Taiwanese dollar)");
    this.tooltip_w = 150;
    this.tooltip = this.graph.append("div").attr("class", "c-tooltip").style("width", `${this.tooltip_w}px`);
    this.legend = this.svg
      .append("g")
      .attr("id", "legend")
      .selectAll("g")
      .data(Array.from(new Set(this.data.map((d) => (this.isTC ? d.market : d.market_en)))))
      .enter()
      .append("g");
    this.legend
      .append("text")
      .attr("font-size", 12)
      .attr("y", (d, i) => i * 15)
      .text((d) => d);
    this.legend
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("y", (d, i) => i * 15 - 12)
      .attr("x", -15)
      .attr("stroke", (d) => (d === this.listed[this.lang] ? `rgb(${this.listed_c})` : `rgb(${this.otc_c})`))
      .attr("fill", (d) => (d === this.listed[this.lang] ? `rgb(${this.listed_c}, 0.3)` : `rgb(${this.otc_c}, 0.3)`));

    this.draw();
    window.addEventListener("resize", this.draw);
  }

  draw = () => {
    this.width = parseInt(this.graph.style("width"), 10);
    this.svg.attr("width", this.width);
    this.xScale.range([this.padding.s, this.width - this.padding.e]);
    this.xAxis_g.attr("transform", `translate(0, ${this.height - this.padding.b})`).call(this.xAxis);
    this.yAxis_g.attr("transform", `translate(${this.padding.s}, 0)`).call(this.yAxis);
    this.legend.attr("transform", `translate(${this.width - this.padding.e - 50}, ${this.height - this.padding.b - 30})`);
    this.gridlines
      .attr("x1", this.padding.s)
      .attr("x2", this.width - this.padding.e)
      .attr("y1", (d) => this.yScale(d))
      .attr("y2", (d) => this.yScale(d));
    this.xLine
      .attr("x1", this.xScale(0))
      .attr("x2", this.xScale(0))
      .attr("y1", this.padding.t)
      .attr("y2", this.height - this.padding.b);
    this.yLine
      .attr("x1", this.padding.s)
      .attr("x2", this.width - this.padding.e)
      .attr("y1", this.yScale(0))
      .attr("y2", this.yScale(0));
    this.circles
      .attr("cx", (d) => this.xScale(d.growth))
      .on("mousemove", (event, d) => {
        let space = 15,
          x = this.xScale(d.growth),
          y = this.yScale(d.EPS);
        this.tooltip
          .classed("active", true)
          .html(`${this.isTC ? d.company : d.company_en}<br>${this.isTC ? "薪資成長率" : "Salary Growth"}: ${d.growth}%<br>${this.isTC ? "EPS成長" : "EPS Growth"}: ${Math.round(d.EPS * 100) / 100}${this.isTC ? "元" : "TWD"}`)
          .style("left", `${x}px`)
          .style("top", `${y}px`)
          .style("transform", `translate(${x > this.width / 2 ? -100 - space : space}%, ${y > this.height / 2 ? -100 - space : space}%)`)
          .style("background-color", (this.isTC ? d.market : d.market_en) === this.listed[this.lang] ? `rgb(${this.listed_c}, 0.3)` : `rgb(${this.otc_c}, 0.3)`);
      })
      .on("mouseout", () => {
        this.tooltip.classed("active", false);
      });
    this.xTitle.attr("x", this.width / 2).attr("y", this.height - 10);
    this.yTitle.attr("transform", `translate(${0}, ${this.padding.s + 10})`);
  };
}
