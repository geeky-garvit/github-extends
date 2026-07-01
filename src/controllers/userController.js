import { getuser, getRepos, followers } from "../models/userModel.js";

import {
    render,
    renderRepos,
    renderFollowers,
    renderst,
    loading,
    error
} from "../views/userView.js";

const input = document.getElementById("search");

let username = "";

input.addEventListener("input", async (event) => {

    username = event.target.value.trim();

    if (!username) {
        document.getElementById("user").innerHTML = "";
        document.getElementById("repos").innerHTML = "";
        document.getElementById("followers").innerHTML = "";
        return;
    }

    try {

        loading();

        const [user, repos, followerData] = await Promise.all([
            getuser(username),
            getRepos(username),
            followers(username)
        ]);

        render(user);

        renderst(user);

        renderRepos(repos);

        renderFollowers(followerData);

    } catch (err) {

        error(err.message);

    }

});

const followerContainer = document.getElementById("followers");

followerContainer.addEventListener("click", async (event) => {

    const card = event.target.closest(".follower-card");

    if (!card) return;

    username = card.dataset.username;

    input.value = username;

    try {

        loading();

        const [user, repos, followerData] = await Promise.all([
            getuser(username),
            getRepos(username),
            followers(username)
        ]);

        render(user);

        renderst(user);

        renderRepos(repos);

        renderFollowers(followerData);

    } catch (err) {

        error(err.message);

    }

});