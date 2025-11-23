import { value, formatNumber, formatResult } from "./num.js";
import {
  updatePhantomOnOperator,
  updatePhantomOnEquals,
  handleRepeatEquals,
  resetPhantom,
} from "./phantomNum.js";

export const arrMath = ["÷", "×", "−", "+"];
export const state = {
  num1: undefined,
  num2: undefined,
  operator: undefined,
  flag: false,
  afterEquals: false,
};

const compute = (a, b, op) =>
  op === "+"
    ? a + b
    : op === "−"
      ? a - b
      : op === "×"
        ? a * b
        : b === 0
          ? 0
          : a / b;

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
      state.num1 = raw;
      value.textContent = formatNumber(formatResult(raw));
    } else if (state.num1 === undefined) {
      state.num1 = current;
    }

    state.operator = char;
    state.flag = true;
    state.afterEquals = false;
    resetActive();
    setActive(btn);
    updatePhantomOnOperator();
    return;
  }

  if (char === "=" && state.operator) {
    if (!state.flag) state.num2 = current;
    if (state.num2 === undefined) return;

    if (state.flag) handleRepeatEquals();

    const raw = compute(state.num1, state.num2, state.operator);
    state.num1 = raw;
    value.textContent = formatNumber(formatResult(raw));
    state.flag = true;
    state.afterEquals = true;
    resetActive();
    updatePhantomOnEquals();
    return;
  }

  if (char === "C") {
    value.textContent = "0";
    resetPhantom();
    resetActive();
    return;
  }
});

document.addEventListener("keydown", (e) => {
  const map = { "/": "÷", "*": "×", "-": "−", "+": "+", Enter: "=", "=": "=" };
  if (
    /^[0-9,]$/.test(e.key) ||
    e.key === "Backspace" ||
    map[e.key] ||
    e.key === "C"
  ) {
    e.preventDefault();
    const btn = map[e.key]
      ? [...document.querySelectorAll(".wrapper button")].find(
          (b) => b.textContent.trim() === map[e.key],
        )
      : null;
    if (btn) btn.click();
  }
});
