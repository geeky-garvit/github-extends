import { floating, dot } from "../views/menuView.js";

dot.addEventListener("click", (e) => {

    e.stopPropagation();

    floating.classList.toggle("open");

});

document.addEventListener("click", (e) => {

    if (!floating.contains(e.target)) {

        floating.classList.remove("open");

    }

});