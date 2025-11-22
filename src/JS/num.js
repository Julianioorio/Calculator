import { state } from "./calc.js";

export const value = document.getElementById("num");
export const wrapper = document.querySelector(".wrapper");

export function formatNumber(str) {
  const [i, d] = str.split(",");
  const f = i.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return str.includes(",") ? `${f}${d !== undefined ? "," + d : ","}` : f;
}

export function formatResult(result) {
  let str = String(result);
  if (str.includes("e")) {
    let [m, e] = str.split("e");
    m = m.slice(0, 7);
    str = m + "e" + e;
  } else if (str.includes(".")) {
    const [i, d] = str.split(".");
    str = i + "," + d.slice(0, 2);
  }
  if (str.replace(/[\s,]/g, "").length > 16) str = str.slice(0, 16);
  return str;
}

export function cangeValue(char) {
  let current = value.textContent;

  if (state.flag && /^[0-9]$/.test(char)) {
    current = char;
    state.flag = false;
    value.textContent = formatNumber(current);
    return;
  }

  if (char === "Backspace") {
    current = current.slice(0, -1) || "0";

    if (state.flag) {
      state.num1 = undefined;
      state.num2 = undefined;
      state.operator = undefined;
      state.flag = false;
      document
        .querySelectorAll(".arith button")
        .forEach((b) => b.classList.remove("activeLight", "activeDark"));
    }
  } else if (/^[0-9,]$/.test(char)) {
    const clean = current.replace(/[\s,]/g, "");
    if (clean.length >= 16 && char !== ",") return;
    if (char === "," && current.includes(",")) return;
    current = current === "0" && char !== "," ? char : current + char;
  } else return;

  value.textContent = formatNumber(current);
}

wrapper.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const char = btn.textContent.trim();
  if (/^[0-9,]$/.test(char) || char === "Backspace") cangeValue(char);
});

document.addEventListener("keydown", (e) => {
  const key = e.key === "." ? "," : e.key;
  if (/^[0-9,]$/.test(key) || key === "Backspace") {
    e.preventDefault();
    cangeValue(key);
  }
});
