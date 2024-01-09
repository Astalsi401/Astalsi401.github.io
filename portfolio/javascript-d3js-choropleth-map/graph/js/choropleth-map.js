class D3Map {
  constructor(graph) {
    this.ratio = 5 / 8;
    this.w = parseInt(d3.select("#graph").style("width"), 10);
    this.h = this.w * this.ratio;
    this.legend_w = this.w / 4 > 200 ? this.w / 4 : 200;
    this.tooltip_w = 260;
    this.colors_n = 9;
    this.graph = graph;
    this.svg = this.graph.append("svg");
    this.tooltip = this.graph.append("div").attr("id", "tooltip");
    this.legend = this.svg.append("g").attr("id", "legend");
  }
  chart = (ct, edu) => {
    this.ct = ct;
    this.edu = edu;
    this.eduMax = d3.max(this.edu.map((e) => e.bachelorsOrHigher));
    this.eduMin = d3.min(this.edu.map((e) => e.bachelorsOrHigher));
    this.xScale = d3.scaleLinear().domain([this.eduMin, this.eduMax]);
    this.colors = d3
      .scaleThreshold()
      .domain(d3.range(this.eduMin, this.eduMax, (this.eduMax - this.eduMin) / (this.colors_n - 1)))
      .range(d3.schemeBlues[this.colors_n]);
    this.topoFeatureStates = topojson.feature(this.ct, this.ct.objects.counties);
    this.projection = d3.geoIdentity();
    this.path = this.svg
      .append("g")
      .attr("class", "counties")
      .selectAll("path")
      .data(this.topoFeatureStates.features)
      .enter()
      .append("path")
      .attr("class", "county")
      .attr("data-fips", (d) => this.match(d.id).fips)
      .attr("data-education", (d) => this.match(d.id).bachelorsOrHigher)
      .attr("fill", (d) => this.colors(this.match(d.id).bachelorsOrHigher))
      .on("mouseover", (event, d) => {
        let x = event.layerX;
        let y = event.layerY;
        let edu_d = this.match(d.id);
        this.tooltip
          .classed("active", true)
          .attr("data-education", edu_d.bachelorsOrHigher)
          .html(`${edu_d.area_name}, ${edu_d.state}: ${edu_d.bachelorsOrHigher}%`)
          .attr("style", `width: ${this.tooltip_w}px; left: ${x < this.w / 2 ? x + 30 : x - this.tooltip_w - 30}px; top: ${y < this.h / 2 ? y + 60 : y - 101}px`);
      })
      .on("mouseout", () => this.tooltip.classed("active", false));
    this.legend_rect = this.legend
      .selectAll("rect")
      .data(this.colors.range().map((d) => this.colors.invertExtent(d).map((a, i) => (a === null ? this.xScale.domain()[i] : a))))
      .enter()
      .append("rect")
      .attr("height", 6)
      .attr("fill", (d) => this.colors(d[0]));
    this.legen_axis = this.legend.append("g");
    this.draw();
  };
  match = (id) => this.edu.filter((e) => e.fips == id)[0];
  draw = () => {
    this.w = parseInt(d3.select("#graph").style("width"), 10);
    this.h = this.w * this.ratio;
    this.legend_w = this.w / 4 > 200 ? this.w / 4 : 200;
    this.svg.attr("width", this.w).attr("height", this.h);
    this.legend.attr("transform", `translate(${this.w / 2},0)`);
    this.xScale.rangeRound([0, this.legend_w]);
    this.path.attr("d", d3.geoPath(this.projection.fitSize([this.w, this.h], this.topoFeatureStates)));
    this.legend_rect.attr("width", (d) => (d[0] && d[1] ? this.xScale(d[1]) - this.xScale(d[0]) : this.xScale(null))).attr("x", (d) => this.xScale(d[0]));
    this.legen_axis
      .call(
        d3
          .axisBottom(this.xScale)
          .tickFormat((d) => `${Math.round(d)}%`)
          .tickValues(this.colors.domain())
      )
      .select(".domain")
      .remove();
  };
}

const counties = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const education = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const eduMap = new D3Map(d3.select("#graph"));
Promise.all([fetch(counties).then((res) => res.json()), fetch(education).then((res) => res.json())]).then((data) => eduMap.chart(data[0], data[1]));
window.addEventListener("resize", eduMap.draw);
