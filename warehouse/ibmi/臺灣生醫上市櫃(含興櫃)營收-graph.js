class BarChart {
  constructor(container, data, tc, xlabel = [0, 50, 100, 150, 200, 250]) {
    this.tc = tc;
    this.container_ = container;
    this.container = d3.select(this.container_);
    this.data = this.tc ? data.sort((a, b) => b.thisYear - a.thisYear) : data.sort((a, b) => b.thisYear - a.thisYear).map((d) => ({ ...d, category: d.category_en }));
    this.unit = this.tc ? "營收(億台幣)" : "Revenue(TWD, 100M)";
    this.height = 400;
    this.svg = this.container.append("svg").attr("height", this.height);
    this.tooltip = this.container.append("div").attr("id", "tooltip").attr("class", "c-tooltip");
    this.padding = {
      t: 10,
      b: 60,
      s: 125,
      e: 25,
    };
    this.xlabel = xlabel;
    this.year = data.year;

    this.area = (this.height - this.padding.t - this.padding.b) / this.data.length;
    this.margin = 3;
    this.bh = this.area / 2 - this.margin;

    this.yScale = d3
      .scaleBand()
      .domain(this.data.map((d) => (this.tc ? d.category : d.category_en)))
      .rangeRound([this.padding.t, this.height - this.padding.b]);
    this.xScale = d3.scaleLinear().domain([0, Math.ceil(Math.max(...this.data.map((d) => d.thisYear)) / 100) * 100]);
    this.xAxis = this.svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(${this.padding.s}, ${this.height - this.padding.b})`);
    this.yAxis = this.svg.append("g").attr("id", "y-axis").attr("transform", `translate(${this.padding.s}, 0)`).call(d3.axisLeft(this.yScale));
    this.yAxis.selectAll("text").attr("font-size", 11).call(this.wrap, this.padding.s);
    this.line = this.svg
      .selectAll("v-line")
      .data(this.xlabel)
      .enter()
      .append("line")
      .attr("stroke", "rgba(0,0,0,0.1)")
      .attr("stroke-width", 1)
      .attr("y1", this.padding.t)
      .attr("y2", this.height - this.padding.b);
    this.bars = this.svg
      .selectAll("bar")
      .data(this.data)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", (d, i) => `translate(${this.padding.s}, ${this.yScale(this.tc ? d.category : d.category_en)})`)
      .on("mousemove", (event, d) => {
        let x = event.layerX;
        let y = event.layerY;
        let space = 15;
        this.tooltip
          .classed("active", true)
          .html(`${d.category}<br>${this.year}: ${d.thisYear}<br>${this.year - 1}: ${d.lastYear}`)
          .attr("style", `left:${x - 90}px;top:${y + space}px;`);
      })
      .on("mouseout", () => {
        this.tooltip.classed("active", false);
      });

    this.barThisyear = this.bars
      .append("rect")
      .attr("fill", "navy")
      .attr("y", 2.5)
      .attr("x", 0)
      .attr("height", this.bh)
      .attr("data-value", (d) => d.thisYear)
      .attr("class", "thisyear");
    this.barLastyear = this.bars
      .append("rect")
      .attr("fill", "brown")
      .attr("y", 2.5 + this.bh)
      .attr("x", 0)
      .attr("height", this.bh)
      .attr("data-value", (d) => d.lastYear)
      .attr("class", "lastyear");
    this.barThisyearText = this.bars
      .append("text")
      .text((d) => d.thisYear)
      .attr("y", (d, i) => this.bh)
      .attr("font-size", 12);
    this.barLastyearText = this.bars
      .append("text")
      .text((d) => d.lastYear)
      .attr("y", (d, i) => this.bh * 2)
      .attr("font-size", 12);
    this.legend = this.svg
      .append("g")
      .attr("id", "legend")
      .selectAll("g")
      .data([this.year, this.year - 1])
      .enter()
      .append("g");
    this.xtitle = this.svg.append("text").text(this.unit).attr("font-size", 13);
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
      .attr("fill", (d) => (d === this.year ? "navy" : "brown"));

    this.draw();
    window.addEventListener("resize", this.draw);
  }
  draw = () => {
    this.width = parseInt(d3.select(this.container_).style("width"), 10);
    this.legend.attr("transform", `translate(${this.width - this.padding.e - 50}, ${this.height - this.padding.b - 30})`);
    this.xtitle.attr("transform", `translate(${this.width / 2},${this.height - this.padding.b + 30})`);
    this.svg.attr("width", this.width);
    this.xScale.range([0, this.width - this.padding.e - this.padding.s]);
    this.xAxis.call(d3.axisBottom(this.xScale).tickValues(this.xlabel)).selectAll("g");
    this.line.attr("x1", (d) => this.xScale(d) + this.padding.s).attr("x2", (d) => this.xScale(d) + this.padding.s);
    this.barThisyear.attr("width", (d) => this.xScale(d.thisYear));
    this.barLastyear.attr("width", (d) => this.xScale(d.lastYear));
    this.barThisyearText.attr("x", (d) => this.xScale(d.thisYear) + 4);
    this.barLastyearText.attr("x", (d) => this.xScale(d.lastYear) + 4);
  };
  wrap = (text, width) => {
    // Text-wrapping routine. By Mike Bostock(https://github.com/d3/d3/issues/1642)
    text.each(function () {
      let text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
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

class PieChart {
  constructor(id_, data) {
    this.id_ = id_;
    this.container = d3.select(this.id_);
    this.height = 400;
    this.padding = {
      x: 20,
      y: 20,
    };
    this.svg = this.container.append("svg").attr("height", this.height);
    this.data = data;
    this.totalCompany = data.reduce((acc, d) => (acc += d.value), 0);
    this.pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);
    this.data_ready = this.pie(this.data);
    this.arc = d3.arc();
    this.labelArc = d3.arc();
    this.slices = this.svg.append("g").attr("class", "slices");
    this.color = d3
      .scaleOrdinal()
      .domain(this.data.map((d) => d.label))
      .range(["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"]);
    this.allSlices = this.slices
      .selectAll("allSlices")
      .data(this.data_ready)
      .join("path")
      .attr("fill", (d) => this.color(d.data.label))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .style("transition", "all 0.4s");
    this.allLabels = this.slices
      .selectAll("allLabels")
      .data(this.data_ready)
      .join("text")
      .text((d) => `${d.data.label}, ${d.data.value}(${((d.value / this.totalCompany) * 100).toFixed(1)}%)`)
      .style("font-weight", "bold")
      .style("font-size", "15px")
      .style("opacity", 0)
      .style("text-anchor", "middle");
    this.legend = this.svg
      .append("g")
      .attr("id", "legend")
      .selectAll("g")
      .data(this.data.map((d) => d.label))
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
      .attr("fill", (d) => this.color(d));
  }

  draw = () => {
    this.width = parseInt(d3.select(this.id_).style("width"), 10);
    this.legend.attr("transform", `translate(${this.padding.x}, ${this.height - this.padding.y - 50})`);
    this.radius = Math.min(this.width / 2 - this.padding.x, this.height / 2 - this.padding.y) * 0.9;
    this.svg.attr("width", this.width);
    this.arc.innerRadius(0).outerRadius(this.radius);
    this.labelArc.innerRadius(0).outerRadius(this.radius * 2 + 30);
    this.slices.attr("transform", `translate(${this.width / 2},${this.height / 2})`);
    this.allSlices.attr("d", this.arc);
    this.allSlices
      .on("mouseover", (e, d) => {
        d3.select(this.allLabels.nodes()[d.index]).style("opacity", 1);
        d3.select(e.target).attr("d", this.arc.outerRadius(this.radius * 1.05));
      })
      .on("mouseout", (e, d) => {
        d3.select(this.allLabels.nodes()[d.index]).style("opacity", 0);
        d3.select(e.target).attr("d", this.arc.outerRadius(this.radius));
      });
    this.allLabels.attr("transform", (d) => `translate(${this.labelArc.centroid(d)})`);
  };
}
