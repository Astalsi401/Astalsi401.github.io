let area = {
  north: [],
  middle: [],
  south: [],
  east: [],
};
fetch("./snq-map.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((a) => {
      if (a.area === "北") {
        area.north.push(L.marker(a.lng).bindPopup(`<strong>${a.name}</strong><br><span>${a.add}</span>`));
      } else if (a.area === "中") {
        area.middle.push(L.marker(a.lng).bindPopup(`<strong>${a.name}</strong><br><span>${a.add}</span>`));
      } else if (a.area === "南") {
        area.south.push(L.marker(a.lng).bindPopup(`<strong>${a.name}</strong><br><span>${a.add}</span>`));
      } else {
        area.east.push(L.marker(a.lng).bindPopup(`<strong>${a.name}</strong><br><span>${a.add}</span>`));
      }
    });
    let north = L.layerGroup(area.north),
      middle = L.layerGroup(area.middle),
      south = L.layerGroup(area.south),
      east = L.layerGroup(area.east),
      base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
      pic = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"),
      map = L.map("snqMap", {
        center: [25.244696, 121.558228],
        zoom: 9,
        layers: [base, north, middle, south, east],
      }),
      baseMaps = {
        街道: base,
        衛星: pic,
      },
      overlayMaps = {
        北部: north,
      },
      layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
    layerControl.addOverlay(middle, "中部").addOverlay(south, "南部").addOverlay(east, "東部");
  });
