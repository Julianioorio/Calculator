import { state } from "./calc.js";
import { resetPhantom } from "./phantomNum.js";

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
    str = m.slice(0, 7) + "e" + e;
  } else if (str.includes(".")) {
    const [i, d] = str.split(".");
    str = i + "," + d.slice(0, 2);
  }
  if (str.replace(/[\s,]/g, "").length > 13) str = str.slice(0, 13); // max 13 цифр
  return str;
}

export function cangeValue(char) {
  let current = value.textContent;

  if (/^[0-9]$/.test(char)) {
    if (state.afterEquals) {
      document.getElementById("phantomNum").textContent = "0";
      resetPhantom();
      state.afterEquals = false;
      state.flag = false;
      current = char;
      value.textContent = formatNumber(current);
      return;
    }

    if (state.flag) {
      current = char;
      state.flag = false;
    } else {
      const clean = current.replace(/[\s,]/g, "");
      if (clean.length >= 13) return;
      current = current === "0" ? char : current + char;
    }

    value.textContent = formatNumber(current);
    state.afterEquals = false;
    return;
  }

  if (char === "Backspace") {
    if (current === "Infinity") current = "0";
    document.getElementById("phantomNum").textContent = "0";
    current = current.slice(0, -1) || "0";
    if (state.flag) {
      state.num1 = state.num2 = state.operator = undefined;
      state.flag = false;
      document
        .querySelectorAll(".arith button")
        .forEach((b) => b.classList.remove("activeLight", "activeDark"));
    }
    value.textContent = formatNumber(current);
    return;
  }

  if (char === ",") {
    if (current.includes(",")) return;
    current += ",";
    value.textContent = formatNumber(current);
  }
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
