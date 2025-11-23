import { resetPhantom } from "./phantomNum.js";
import { value, formatNumber, formatResult } from "./num.js";

const wrapper = document.querySelector(".wrapper");

wrapper.addEventListener("click", (e) => {
  if (e.target.textContent === "AC") {
    value.textContent = "0";
    document
      .querySelectorAll(".arith button")
      .forEach((b) => b.classList.remove("activeLight", "activeDark"));
    resetPhantom();
  }

  if (e.target.textContent === "+/-") {
    let current = value.textContent.replace(/\s/g, "").replace(",", ".");
    if (current === "0") return;
    current = current.startsWith("-") ? current.slice(1) : "-" + current;
    value.textContent = formatNumber(formatResult(parseFloat(current)));
    resetPhantom();
  }

  if (e.target.textContent === "%") {
    let current = value.textContent.replace(/\s/g, "").replace(",", ".");
    let result = parseFloat(current) / 100;
    value.textContent = formatResult(result);
    resetPhantom();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "%") {
    e.preventDefault();
    let current = value.textContent.replace(/\s/g, "").replace(",", ".");
    let result = parseFloat(current) / 100;
    value.textContent = formatNumber(formatResult(result));
    resetPhantom();
  }
});
