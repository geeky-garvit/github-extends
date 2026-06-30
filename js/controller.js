import { getuser } from "./model.js";
import {
    render,
    loading,
    error,
    rendernd,
    loadingnd
} from "./view.js";

const input = document.getElementById("search");

// Main Search
input.addEventListener("input", async (event) => {
    const username = event.target.value.trim();
    if (!username) {
        document.getElementById("user").innerHTML = "";
        return;
    }
    try {
        loading();
        const data = await getuser(username);
        console.log(data);
        render(data);
    } catch (err) {
        error(err.message);
    }

});

const floating = document.getElementById("floating");
const dot = document.getElementById("dot");

dot.addEventListener("click",(e)=>{

    e.stopPropagation();

    floating.classList.toggle("open");

});

document.addEventListener("click",(e)=>{

    if(!floating.contains(e.target)){

        floating.classList.remove("open");

    }

});

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