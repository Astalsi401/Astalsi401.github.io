class BarGraph {
  constructor(graph, data, lang) {
    this.lang = lang;
    this.isTC = this.lang === "tc";
    this.category = { en: "生技醫療業", tc: "生技醫療業" };
    this.height = 830;
    this.data = data;
    this.graph = d3.select(graph);
    this.svg = this.graph.append("svg").attr("height", this.height);
    this.padding = {
      t: 10,
      b: 45,
      s: 112,
      e: 20,
    };
    this.bh = (this.height - this.padding.b - this.padding.t) / this.data.length;
    this.yScale = d3
      .scaleBand()
      .domain(this.data.map((d) => (this.isTC ? d.category : d.category_en)))
      .rangeRound([this.padding.t, this.height - this.padding.b]);
    const max = d3.max(this.data, (d) => d.thisYear);
    this.xScale = d3.scaleLinear().domain([0, max < 1800 ? 1800 : max]);
    this.xAxis = d3.axisBottom(this.xScale);
    this.xAxis_g = this.svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(${this.padding.s}, ${this.height - this.padding.b})`);
    this.yAxis = this.svg.append("g").attr("id", "y-axis").attr("transform", `translate(${this.padding.s}, 0)`).call(d3.axisLeft(this.yScale));
    this.yAxis.selectAll("text").attr("font-size", 11).call(this.wrap, this.padding.s);
    this.bars = this.svg
      .selectAll("bar")
      .data(this.data)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", (d, i) => `translate(${this.padding.s}, ${this.yScale(this.isTC ? d.category : d.category_en)})`);
    this.barsRect = this.bars
      .append("rect")
      .attr("fill", (d) => (d.category === "生技醫療業" ? "rgb(255, 153, 0)" : "rgb(5, 94, 171)"))
      .attr("y", this.bh * 0.2)
      .attr("x", 0)
      .attr("height", this.bh * 0.6)
      .attr("data-value", (d) => d.lastYear)
      .attr("class", "lastyear");
    this.barsText = this.bars
      .append("text")
      .text((d) => Math.round(d.thisYear * 100) / 1000)
      .attr("y", this.bh * 0.8)
      .attr("font-size", 12);
    this.xtitle = this.svg
      .append("text")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .attr("y", this.height - 10)
      .text(this.isTC ? "萬元" : "TWD, 10K");

    this.draw();
    window.addEventListener("resize", this.draw);
  }

  draw = () => {
    this.width = parseInt(this.graph.style("width"), 10);
    this.svg.attr("width", this.width);
    this.xScale.range([0, this.width - this.padding.e - this.padding.s]);
    this.xAxis_g.call(this.xAxis).selectAll("g");
    this.barsRect.attr("width", (d) => this.xScale(d.thisYear));
    this.barsText.attr("x", (d) => this.xScale(d.thisYear) + 2);
    this.xtitle.attr("x", this.width / 2);
  };
  wrap = (text, width) => {
    // Text-wrapping routine. By Mike Bostock(https://github.com/d3/d3/issues/1642)
    text.each(function () {
      let text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 0.7, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", -10)
          .attr("y", y)
          .attr("dy", dy + "em");
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width - 10) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", -10)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  };
}
