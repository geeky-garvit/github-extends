import { floating, dot } from "../views/menuView.js";

const navbarDot = document.getElementById("navbar-dot");
const nav = document.getElementById("nav");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("button");

dot.addEventListener("click", (e) => {

    e.stopPropagation();

    floating.classList.toggle("open");

});

if (navbarDot) {
    navbarDot.addEventListener("click", () => {
        nav.classList.add("swipe-left");

        setTimeout(() => {
            nav.classList.remove("swipe-left");
        }, 300);

        const query = searchInput?.value.trim();
        if (query && searchButton) {
            searchButton.click();
        } else if (searchInput) {
            searchInput.focus();
        }
    });
}

document.addEventListener("click", (e) => {

    if (!floating.contains(e.target)) {

        floating.classList.remove("open");

    }

});