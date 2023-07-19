fetch("https://astalsi401.github.io/warehouse/ibmi/2022非主管員工薪資.json")
  .then((res) => res.json())
  .then((data) => {
    new PlotGraph("#graph-plot1", data.plot, "en");
    new BarGraph(
      "#graph-bar1",
      data.bar.filter((d) => d.market === "上市"),
      "en"
    );
    new BarGraph(
      "#graph-bar2",
      data.bar.filter((d) => d.market === "上櫃"),
      "en"
    );
  });
