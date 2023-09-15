const observerHeader = new IntersectionObserver((entries) => entries.forEach((entry) => document.querySelector(".header").classList.toggle("show", !entry.isIntersecting), { threshold: 1 }));
const url = window.location.href;
const dialog = document.querySelector("#dialog");
const shareUrl = () => {
  navigator.clipboard.writeText(url);
  dialog.showModal();
  setTimeout(() => dialog.close(), 1500);
};
const textZoom = () => {
  const rootSize = parseFloat(getComputedStyle(document.querySelector("html")).fontSize);
  const content = document.querySelector(".article-content");
  const size = parseFloat(getComputedStyle(content).fontSize);
  const newSize = (size + 5) / rootSize;
  content.style.fontSize = `${newSize > 1.8 ? 1 : newSize}rem`;
};
document.querySelector(".share-line").href = `https://social-plugins.line.me/lineit/share?url=${url}`;
document.querySelector(".share-fb").href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
document.querySelector(".share-url").addEventListener("click", shareUrl);
document.querySelector(".text-zoom").addEventListener("click", textZoom);
observerHeader.observe(document.querySelector(".article-main .article-header"));
