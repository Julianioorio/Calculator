import { value, formatNumber, formatResult } from "./num.js";

export const arrMath = ["÷", "×", "−", "+"];
export const state = {
  num1: undefined,
  num2: undefined,
  operator: undefined,
  flag: false,
};

const compute = (a, b, op) =>
  op === "+"
    ? a + b
    : op === "−"
      ? a - b
      : op === "×"
        ? a * b
        : op === "÷"
          ? a / b
          : b;

const resetActive = () =>
  document
    .querySelectorAll(".arith button")
    .forEach((b) => b.classList.remove("activeLight", "activeDark"));
const setActive = (btn) =>
  btn.classList.add(
    document.documentElement.classList.contains("dark")
      ? "activeDark"
      : "activeLight",
  );

document.querySelector(".wrapper").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const char = btn.textContent.trim();
  const current = parseFloat(
    value.textContent.replace(/\s/g, "").replace(",", "."),
  );

  if (arrMath.includes(char)) {
    if (state.operator && !state.flag) {
      const raw = compute(state.num1, current, state.operator);
      const res = formatNumber(formatResult(raw));
      value.textContent = res;
      state.num1 = parseFloat(res.replace(/\s/g, "").replace(",", "."));
    } else state.num1 = current;

    state.operator = char;
    state.flag = true;
    resetActive();
    setActive(btn);
    return;
  }

  if (char === "=" && state.operator) {
    const num2 = state.flag ? state.num2 : current;
    state.num2 = num2;
    const raw = compute(state.num1, num2, state.operator);
    const res = formatNumber(formatResult(raw));
    value.textContent = res;
    state.num1 = parseFloat(res.replace(/\s/g, "").replace(",", "."));
    state.flag = true;
    resetActive();
  }
});

document.addEventListener("keydown", (e) => {
  const map = { "/": "÷", "*": "×", "-": "−", "+": "+", Enter: "=", "=": "=" };
  if (!map[e.key] && !/^[0-9,]$/.test(e.key) && e.key !== "Backspace") return;
  e.preventDefault();
  const btn = map[e.key]
    ? [...document.querySelectorAll(".wrapper button")].find(
        (b) => b.textContent.trim() === map[e.key],
      )
    : null;
  if (btn) btn.click();
});
