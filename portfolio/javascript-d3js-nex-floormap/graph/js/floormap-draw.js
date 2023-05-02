const lang = document.querySelector("#lang");
fetch("./graph/js/floormap.json")
  .then((res) => res.json())
  .then((data) => {
    const drawFloorMap = (lang) => {
      document.querySelectorAll(".graph").forEach((d) => (d.innerHTML = ""));
      const f1 = new Floor(
        d3.select("#graph-1f"),
        17930,
        13410,
        data.filter((d) => d.floor === 1),
        lang
      );
      const f4 = new Floor(
        d3.select("#graph-4f"),
        18030,
        17010,
        data.filter((d) => d.floor === 4),
        lang
      );
      f1.draw();
      f4.draw();
      window.addEventListener("resize", () => {
        f1.draw();
        f4.draw();
      });
    };
    drawFloorMap(lang.value);
    lang.addEventListener("change", (e) => drawFloorMap(e.target.value));
  });
