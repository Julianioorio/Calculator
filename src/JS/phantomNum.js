import { state } from "./calc.js";
import { formatNumber, formatResult } from "./num.js";

const phantom = document.getElementById("phantomNum");
let lastNum1, lastNum2;

function formatPhantom(num) {
  return formatNumber(formatResult(num));
}

export function updatePhantomOnOperator() {
  if (state.num1 !== undefined && state.operator) {
    lastNum1 = state.num1;
    phantom.textContent = `${formatPhantom(lastNum1)} ${state.operator}`;
    lastNum2 = undefined;
  }
}

export function updatePhantomOnEquals() {
  if (lastNum1 !== undefined && state.num2 !== undefined && state.operator) {
    phantom.textContent = `${formatPhantom(lastNum1)} ${state.operator} ${formatPhantom(state.num2)} =`;
    lastNum2 = state.num2;
  }
}

export function handleRepeatEquals() {
  if (lastNum2 !== undefined && state.operator) {
    phantom.textContent = `${formatPhantom(state.num1)} ${state.operator} ${formatPhantom(lastNum2)} =`;
    state.num2 = lastNum2;
    lastNum1 = state.num1;
  }
}

export function resetPhantom() {
  phantom.textContent = "0";
  lastNum1 = lastNum2 = undefined;
  state.num1 = state.num2 = state.operator = undefined;
  state.flag = false;
  state.afterEquals = false;
}
