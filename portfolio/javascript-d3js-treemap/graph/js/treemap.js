const h = 800;
const padding = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20,
};

let i = 0;
const graph = d3.select("#graph");
const svg = graph.append("svg").attr("height", h);
const legend = graph.append("svg").attr("id", "legend").attr("height", 300).append("g").attr("id", "legend-items");
const legend_elem = {
  width: 15,
  height: 15,
  margin: { x: 60, y: 40 },
  col: 3,
};
const tooltip = graph.append("div").attr("id", "tooltip");

function calcPos(i) {
  return { x: (i % legend_elem.col) * (legend_elem.width + legend_elem.margin.x), y: Math.floor(i / legend_elem.col) * (legend_elem.height + legend_elem.margin.y) };
}

fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json")
  .then((res) => res.json())
  .then((data) => {
    const treemap = d3.treemap().padding(1);
    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);
    const leaves = svg.selectAll("g").data(root.leaves()).enter().append("g");
    const cells = leaves
      .append("rect")
      .attr("class", "tile")
      .on("mouseover", (event, d) => {
        tooltip.classed("active", true).html(`Name: ${d.data.name}<br>Category: ${d.data.category}<br>Value: ${d.data.value}`).attr("data-value", d.data.value);
      })
      .on("mouseout", () => tooltip.classed("active", false));
    const text = leaves
      .append("text")
      .attr("font-size", 8)
      .on("mouseover", (event, d) => {
        tooltip.classed("active", true).html(`Name: ${d.data.name}<br>Category: ${d.data.category}<br>Value: ${d.data.value}`).attr("data-value", d.data.value);
      })
      .on("mouseout", () => tooltip.classed("active", false));
    const categories = root.children.map((d) => d.data.name);
    const colors = d3.scaleOrdinal().range(categories.map((d, i, self) => d3.interpolateWarm((i * 1) / self.length)));
    const legend_item = legend
      .selectAll("g")
      .data(categories)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${calcPos(i).x}, ${calcPos(i).y})`);

    legend_item
      .append("rect")
      .attr("height", legend_elem.height)
      .attr("width", legend_elem.width)
      .attr("fill", (d) => colors(d))
      .attr("class", "legend-item");
    legend_item
      .append("text")
      .text((d) => d)
      .attr("x", 18)
      .attr("y", 13);

    function draw() {
      const w = parseInt(d3.select("#graph").style("width"), 10);

      svg.attr("width", w);
      treemap.size([w - padding.left - padding.right, h - padding.top - padding.bottom])(root);
      leaves.attr("transform", (d) => `translate(${d.x0 + padding.left},${d.y0 + padding.top})`);
      cells
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("data-name", (d) => d.data.name)
        .attr("data-category", (d) => d.data.category)
        .attr("data-value", (d) => d.data.value)
        .attr("fill", (d) => colors(d.data.category))
        .on("mousemove", (event, d) => {
          let x = event.layerX;
          let y = event.layerY;
          let space = 30;
          tooltip.attr("style", `left: ${x < w / 2 ? x + space : x - space - 200}px; top: ${y + space}px`);
        });
      text
        .on("mousemove", (event, d) => {
          let x = event.layerX;
          let y = event.layerY;
          let space = 30;
          tooltip.attr("style", `left: ${x < w / 2 ? x + space : x - space - 200}px; top: ${y + space}px`);
        })
        .html((d) =>
          d.data.name
            .split(/(?=[A-Z][^A-Z])/g)
            .map((str, i) => `<tspan x="4" y="${i * 10 + 12}">${str}</tspan>`)
            .join("")
        );
    }
    draw();
    window.addEventListener("resize", draw);
  });
