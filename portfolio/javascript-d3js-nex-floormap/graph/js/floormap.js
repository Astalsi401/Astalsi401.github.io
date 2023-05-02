const colors = d3.scaleOrdinal().domain(["全齡健康展區", "年度主題館", "醫療機構展區", "農業生技食安健康主題展", "智慧醫療展區", "精準醫療展區"]).range(["rgba(237,125,49,0.6)", "rgba(153,204,255,1)", "rgba(255,255,0,0.6)", "rgba(153,204,0,1)", "rgba(0,112,192,0.6)", "rgba(112,48,160,0.6"]);
const icon_l = 500;

class Box {
  constructor(box, c, lang) {
    this.lang = lang;
    this.box = box;
    this.item = this.box.append("rect").attr("stroke", "black");
    this.text_box = this.box.append("g");
    this.text = this.text_box
      .selectAll(`${c}-text`)
      .data((d) => (d.text ? d.text[this.lang] : []))
      .enter()
      .append("text")
      .text((d) => d)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("fill", "black");
  }

  draw = (width, xScale, yScale, size) => {
    this.box.attr("transform", (d) => `translate(${xScale(d.x)},${yScale(d.y)})`);
    this.item.attr("width", (d) => xScale(d.w)).attr("height", (d) => yScale(d.h));
    this.text_box.attr("transform", (d) => `translate(${xScale(d.w / 2)},${yScale(d.h / 2) - (d.text ? [this.lang].length - 1 : 0) * width * size * (d.size ? d.size : 1)})`).attr("font-size", (d) => width * size * (d.size ? d.size : 1));
    this.text.attr("y", (d, i) => i * width * (size + 0.003));
  };
}

class Floor {
  constructor(graph, w, h, data, language) {
    this.language = language;
    this.graph = graph;
    this.svg = this.graph.append("svg");
    this.tooltip = this.graph.append("div").attr("class", "c-tooltip c-text-medium");
    this.w = w;
    this.h = h;
    this.data = data;
    this.xScale = d3.scaleLinear().domain([0, this.w]);
    this.yScale = d3.scaleLinear().domain([0, this.h]);
    this.wall = this.addObj("wall", "path").attr("stroke", "black").attr("fill", "none");
    this.pillar_box = this.addObj("pillar", "g");
    this.pillar = this.pillar_box.append("rect").attr("fill", "gray");
    this.text = this.addObj("text", "text")
      .text((d) => d.text)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("fill", "red");
    this.booth = new Box(this.addObj("booth", "g"), "booth", this.language);
    this.booth.box
      .attr("stroke-width", "0.3px")
      .attr("fill", (d) => colors(d.cat.tc))
      .on("mouseover", (event, d) => {
        this.tooltip.classed("active", true).html(`${d.cat[this.language]}<br>${d.text ? d.text[this.language].join("") : ""}`);
      });
    this.room = new Box(this.addObj("room", "g"), "room", this.language);
    this.room.box
      .attr("stroke-width", (d) => (d.bd ? d.bd : 0))
      .attr("fill", "rgba(0,0,0,0)")
      .on("mouseover", (event, d) => {
        if (d.note) this.tooltip.classed("active", true).html(d.note[this.language]);
      });
    this.icon = this.room.box
      .append("clipPath")
      .attr("id", (d, i) => `icon-${d.floor}-${i}`)
      .append("rect")
      .attr("class", "icon");
    this.icon_img = this.room.box
      .append("image")
      .attr("xlink:href", (d) => d.icon)
      .attr("visibility", (d) => (d.icon ? "visible" : "hidden"))
      .attr("clip-path", (d, i) => `url(#icon-${d.floor}-${i})`);
  }

  addObj = (type, tag) => {
    return this.svg
      .append("g")
      .attr("class", `${type}-g`)
      .selectAll(type)
      .data(this.data.filter((d) => d.type === type))
      .enter()
      .append(tag)
      .attr("class", type);
  };

  iconSet = (elem) => {
    elem
      .attr("width", this.xScale(icon_l))
      .attr("height", this.yScale(icon_l))
      .attr("x", (d) => this.xScale((d.w - icon_l) / 2))
      .attr("y", (d) => this.yScale((d.h - icon_l) / 2));
  };

  mouseover_fuc = (elem, width) => {
    elem
      .on("mousemove", (event, d) => {
        let x = event.layerX;
        let y = event.layerY;
        this.tooltip.attr("style", `left: ${x - 100 < 0 ? 0 : x + 100 > width ? width - 200 : x - 100}px; top: ${y + 20}px`);
      })
      .on("mouseout", () => this.tooltip.classed("active", false));
  };

  draw = () => {
    const width = parseInt(this.graph.style("width"), 10);
    const height = (width / this.w) * this.h;
    this.svg.attr("width", width).attr("height", height);
    this.xScale.range([0, width]);
    this.yScale.range([0, height]);
    this.wall.attr("d", (d) => `M${this.xScale(d.x)} ${this.yScale(d.y)} ` + (d.l ? d.l.map((l) => `L${this.xScale(l.x)} ${this.yScale(l.y)}`).join(" ") : "") + (d.c ? ` C${this.xScale(d.c.x1)} ${this.yScale(d.c.y1)} ${this.xScale(d.c.x2)} ${this.yScale(d.c.y2)} ${this.xScale(d.c.x)} ${this.yScale(d.c.y)}` : ""));
    this.pillar_box.attr("transform", (d) => `translate(${this.xScale(d.x)},${this.yScale(d.y)})`);
    this.pillar.attr("width", (d) => this.xScale(d.w)).attr("height", (d) => this.yScale(d.h));
    this.room.draw(width, this.xScale, this.yScale, 0.012);
    this.booth.draw(width, this.xScale, this.yScale, 0.015);
    this.mouseover_fuc(this.room.box, width);
    this.mouseover_fuc(this.booth.box, width);
    this.text
      .attr("font-size", `${width * 0.022}`)
      .attr("x", (d) => this.xScale(d.x))
      .attr("y", (d) => this.yScale(d.y));
    this.iconSet(this.icon);
    this.iconSet(this.icon_img);
  };
}
