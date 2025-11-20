const slider = document.getElementById("slider");

document.documentElement.classList.toggle(
  "dark",
  localStorage.getItem("theme") === "dark",
);
slider.checked = localStorage.getItem("theme") === "dark";

slider.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  slider.checked = isDark;
});
