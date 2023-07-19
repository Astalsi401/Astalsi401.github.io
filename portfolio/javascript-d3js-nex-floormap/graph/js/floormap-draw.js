fetch("../../../../../warehouse/show/平面圖.json")
  // ../../../../../warehouse/show/平面圖.json
  // https://astalsi401.github.io/warehouse/show/平面圖.json
  .then((res) => res.json())
  .then((data) => {
    const langSelect = document.querySelector("#lang");
    const graphes = document.querySelectorAll(".graph");
    const drawFP = (lang) => {
      new Floor(
        "1F 民眾展區",
        d3.select("#graph-1f"),
        19730,
        19010,
        data.filter((d) => d.floor === 1),
        lang
      );
      new Floor(
        "4F 專業展區",
        d3.select("#graph-4f"),
        19830,
        21010,
        data.filter((d) => d.floor === 4),
        lang
      );
    };
    drawFP(langSelect.value);
    langSelect.addEventListener("change", ({ target: { value } }) => {
      graphes.forEach((graph) => (graph.innerHTML = ""));
      drawFP(value);
    });
  });
