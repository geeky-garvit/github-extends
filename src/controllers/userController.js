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
let repos = [];

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

        const [user, repoData, followerData] = await Promise.all([
            getuser(username),
            getRepos(username),
            followers(username)
        ]);

        repos = repoData;

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

        const [user, repoData, followerData] = await Promise.all([
            getuser(username),
            getRepos(username),
            followers(username)
        ]);

        repos = repoData;

render(user);

renderst(user);

renderRepos(repos);

renderFollowers(followerData);
    } catch (err) {

        error(err.message);

    }

});
const sort = document.getElementById("sort");

sort.addEventListener("change", () => {

    const sortedRepos = [...repos];

    switch (sort.value) {

        case "stars":

            sortedRepos.sort((a, b) =>
                b.stargazers_count - a.stargazers_count
            );

            break;

        case "forks":

            sortedRepos.sort((a, b) =>
                b.forks_count - a.forks_count
            );

            break;

        case "updated":

            sortedRepos.sort((a, b) =>
                new Date(b.updated_at) - new Date(a.updated_at)
            );

            break;

    }

    renderRepos(sortedRepos);

});