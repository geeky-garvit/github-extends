import { getuser } from "../models/userModel.js";

import {
    renderFirst,
    rendernd,
    loadingnd,
    note,
    errornd
} from "../views/compareView.js";
import { animateCompareReset } from "./compareAnimation.js";

const compareForm = document.getElementById("compare-form");
const compareInput = document.getElementById("compare");
const compareBtn = document.getElementById("compare-btn");
const compareClose = document.getElementById("compare-close");
const app = document.getElementById("web");

const debounce = (fn, delay = 400) => {
    let timer;
    const debounced = (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
    debounced.cancel = () => clearTimeout(timer);
    return debounced;
};

const openCompareForm = () => {
    compareForm.style.display = "flex";
    compareForm.style.opacity = "1";
    compareForm.style.transform = "scale(1)";
    app.classList.add("blur");

    if (window.currentSearchUser) {
        renderFirst(window.currentSearchUser);
    } else {
        const slot = document.getElementById("first");
        if (slot) {
            slot.textContent = "Search a user first to compare.";
        }
    }

    note();
};

const closeCompareForm = () => {
    compareForm.style.display = "none";
    compareForm.style.opacity = "";
    compareForm.style.transform = "";
    app.classList.remove("blur");
};

compareBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openCompareForm();
});

compareClose.addEventListener("click", (e) => {
    e.preventDefault();
    closeCompareForm();
});

const compareDebouncedSearch = debounce(async (username) => {
    if (!username) {
        const container = document.getElementById("second");
        if (container) {
            container.textContent = "";
        }
        animateCompareReset();
        return;
    }

    try {
        loadingnd();
        const data = await getuser(username);
        rendernd(data);
    } catch (err) {
        errornd(err.message);
    }
});

compareInput.addEventListener("input", (event) => {
    const username = event.target.value.trim();
    compareDebouncedSearch(username);
});