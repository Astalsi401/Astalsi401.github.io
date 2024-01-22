window.addEventListener("click", () => parent.postMessage({ window: "iframe" }));
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) parent.postMessage({ height: entry.contentRect.height + 16 });
});
resizeObserver.observe(document.body);
