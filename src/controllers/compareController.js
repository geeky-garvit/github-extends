import { getuser } from "../models/userModel.js";

import {
    rendernd,
    loadingnd,
    note
} from "../views/compareView.js";

import { error } from "../views/userView.js";

const compareForm = document.getElementById("compare-form");
const compareInput = document.getElementById("compare");
const compareBtn = document.getElementById("compare-btn");

compareBtn.addEventListener("click", (e) => {

    e.preventDefault();

    compareForm.style.display = "flex";
    compareForm.style.opacity = "1";
    compareForm.style.transform = "scale(1)";

    note();

});

compareInput.addEventListener("input", async (event) => {

    const username = event.target.value.trim();

    if (!username) {

        document.getElementById("second").innerHTML = "";

        return;

    }

    try {

        loadingnd();

        const data = await getuser(username);

        console.log(data);

        rendernd(data);

    } catch (err) {

        error(err.message);

    }

});