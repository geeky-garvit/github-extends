import { getuser } from "../models/userModel.js";

import {
    render,
    loading,
    error,
    renderst
} from "../views/userView.js";

const input = document.getElementById("search");

let username;

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

        renderst(data);

    } catch (err) {

        error(err.message);

    }

});