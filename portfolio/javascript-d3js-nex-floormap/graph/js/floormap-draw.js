fetch("https://astalsi401.github.io/warehouse/show/floormap.json")
  // ../../../../../warehouse/show/floormap.json
  // https://astalsi401.github.io/warehouse/show/floormap.json
  .then((res) => res.json())
  .then((data) => {
    const langSelect = document.querySelector("#lang");
    const graphes = document.querySelectorAll(".graph");
    const drawFP = (lang) => {
      new Floor(
        { tc: "1F 民眾展區", en: "1F Community Area" },
        d3.select("#graph-1f"),
        19730,
        19010,
        data.filter((d) => d.floor === 1 && d.draw === 1),
        lang
      );
      new Floor(
        { tc: "4F 專業展區", en: "4F Industrial Area" },
        d3.select("#graph-4f"),
        19830,
        21010,
        data.filter((d) => d.floor === 4 && d.draw === 1),
        lang
      );
    };
    drawFP(langSelect.value);
    langSelect.addEventListener("change", ({ target: { value } }) => {
      graphes.forEach((graph) => (graph.innerHTML = ""));
      drawFP(value);
    });
  });
