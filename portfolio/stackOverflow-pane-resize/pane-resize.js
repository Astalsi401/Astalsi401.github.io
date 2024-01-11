const gutters = document.querySelectorAll(".gutter");
const panes = document.querySelectorAll(".pane");
const minWidth = document.querySelector(".wrapper").style.getPropertyValue("--min-width");
const minHeight = document.querySelector(".wrapper").style.getPropertyValue("--min-height");
const iframes = document.querySelectorAll("iframe");

function resizer(e) {
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);
  iframes.forEach((iframe) => iframe.classList.add("resizing"));

  //   check gutter is vertical or horizontal
  const is_vertical = e.currentTarget.classList.contains("gutter-v");
  //   get previous position (x or y depending on is_vertical)
  const prev = is_vertical ? e.x : e.y;
  //   get current pane, the parent pane of the gutter you are moving
  const currentPane = e.currentTarget.parentNode;
  const currentPanel = currentPane.getBoundingClientRect();
  //   get previous pane, when move gutter-v:
  //   if current pane is center, prev pane will be left pane
  //   if current pane is right, prev pane will be center pane
  //   left pane will never be current pane cause it don't have gutter
  const prevPane = currentPane.previousElementSibling;
  const prevPanel = prevPane.getBoundingClientRect();

  function mousemove(e) {
    // minWidth and minHeight are string ('200px' and '100px' in this case), change them to integer
    const min = parseInt(is_vertical ? minWidth : minHeight);
    // calculate distance between prev and current position
    const distance = prev - (is_vertical ? e.x : e.y);
    // calculate new width/height of current pane and prev pane
    const newCurrentSize = (is_vertical ? currentPanel.width : currentPanel.height) + distance;
    const newPrevSize = (is_vertical ? prevPanel.width : prevPanel.height) - distance;
    // if new width/height is less than min, return and don't change pane style
    if (newCurrentSize < min || newPrevSize < min) return;
    // change pane width/height depending on is_vertical
    if (is_vertical) {
      currentPane.style.width = newCurrentSize + "px";
      prevPane.style.width = newPrevSize + "px";
    } else {
      currentPane.style.height = newCurrentSize + "px";
      prevPane.style.height = newPrevSize + "px";
    }
  }

  function mouseup() {
    iframes.forEach((iframe) => iframe.classList.remove("resizing"));
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}
gutters.forEach((gutter) => gutter.addEventListener("mousedown", resizer));

document.querySelector(".dragElem").addEventListener("drag", (e) => console.log(e));
