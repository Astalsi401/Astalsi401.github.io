class Revenue {
  constructor(year, lineChart, en = false) {
    this.h = 200;
    this.padding = {
      t: 40,
      b: 20,
      s: 45,
      e: 20,
    };
    this.container = lineChart;
    this.graph = d3.select(this.container);
    this.svg = this.graph.append("svg").attr("height", this.h);
    this.ylabel = [0, 1000, 2000, 3000, 4000];
    this.graphOpt = {
      fontWeb: 13,
      fontMob: 10,
    };
    this.year = year;
    this.loaded = false;
  }
  fetchData = async () => {
    this.data = await fetch("https://astalsi401.github.io/warehouse/ibmi/2022生醫上市櫃歷年營收數據.json")
      .then((res) => res.json())
      .then((res) => res.data.filter((d) => d.year <= this.year));
    this.loaded = true;
    this.years = this.data.map((d) => d.year).filter((d) => d !== "");
    this.minX = d3.min(this.data.map((d) => d.year));
    this.maxX = d3.max(this.data.map((d) => d.year));
    this.xScale = d3.scaleTime().domain([new Date(this.minX, 0, 1), new Date(this.maxX, 0, 1)]);
    this.yScale = d3
      .scaleLinear()
      .domain([4000, 0])
      .range([this.padding.t, this.h - this.padding.b]);
    this.xAxis = this.svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${this.h - this.padding.b})`);
    this.yAxis = this.svg.append("g").attr("id", "y-axis").attr("transform", `translate(${this.padding.s}, 0)`).call(d3.axisLeft(this.yScale).tickValues(this.ylabel)).selectAll("g");
    this.grid = this.svg
      .append("g")
      .selectAll("grid")
      .data(this.ylabel)
      .enter()
      .append("line")
      .attr("stroke", "rgba(0,0,0,0.1)")
      .attr("stroke-width", 1)
      .attr("y1", (d) => this.yScale(d))
      .attr("y2", (d) => this.yScale(d))
      .attr("x1", this.padding.s);
    this.dots = this.svg.append("g").selectAll("dot").data(this.data).enter().append("g");
    this.line = d3
      .line()
      .y((d) => this.yScale(d.total))
      .curve(d3.curveMonotoneX);
    this.lines = this.svg.append("path").datum(this.data).attr("class", "line").attr("stroke", "brown").attr("fill", "none").attr("stroke-width", "2");
    this.legend = this.svg.append("g").attr("id", "legend");
    this.legend.append("line").attr("stroke", "brown").attr("fill", "none").attr("stroke-width", "2").attr("x1", -25).attr("x2", -5).attr("y1", 0).attr("y2", 0);
    this.legend.append("circle").attr("r", 3).attr("fill", "brown").attr("cx", -15).attr("cy", 0);
    this.legentText = this.legend.append("text").text("生醫上市櫃營收(億元)").attr("font-size", 11).attr("x", 0).attr("y", 3);
    this.dots.append("circle").attr("r", 3).attr("fill", "brown").attr("cy", 0).attr("cx", 0);
  };
  draw = () => {
    const w = parseInt(d3.select(this.container).style("width"), 10);
    this.svg.attr("width", w);
    this.xScale.range([0, w - this.padding.s - this.padding.e]);
    this.xAxis
      .call(d3.axisBottom(this.xScale))
      .attr("transform", `translate(${this.padding.s}, ${this.h - this.padding.b})`)
      .attr("font-size", w > 576 ? this.graphOpt.fontWeb : this.graphOpt.fontMob);
    this.yAxis.attr("font-size", w > 576 ? this.graphOpt.fontWeb : this.graphOpt.fontMob);
    this.grid.attr("x2", w - this.padding.e);
    this.dots.attr("transform", (d) => `translate(${this.xScale(new Date(d.year, 0, 1)) + this.padding.s}, ${this.yScale(d.total)})`);
    this.line.x((d) => this.xScale(new Date(d.year, 0, 1)));
    this.lines.attr("d", this.line).attr("transform", `translate(${this.padding.s}, 0)`);
    this.legend.attr("transform", `translate(${w - this.padding.e - 130}, ${this.h - this.padding.b - 30})`);
    this.legentText.attr("font-size", w > 576 ? this.graphOpt.fontWeb : this.graphOpt.fontMob);
  };
  resize = async () => {
    if (!this.loaded) await this.fetchData();
    this.draw();
  };
}
