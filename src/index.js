import "./JS/main.js";
import _ from "lodash";
import "./SCSS/main.scss";
function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join([], " ");

  return element;
}

document.body.appendChild(component());
