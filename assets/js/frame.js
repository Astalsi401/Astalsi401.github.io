window.addEventListener("click", () => parent.postMessage({ window: "iframe" }));
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) parent.postMessage({ height: entry.contentRect.height });
});
resizeObserver.observe(document.body);
