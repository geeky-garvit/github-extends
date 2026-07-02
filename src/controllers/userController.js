import { getuser, getRepos, followers, following } from "../models/userModel.js";

import {
    render,
    renderRepos,
    renderFollowers,
    renderFollowing,
    renderProfilePanel,
    loading,
    error
} from "../views/userView.js";

const input = document.getElementById("search");
const searchButton = document.getElementById("button");
const loadMoreRepos = document.getElementById("load-more-repos");
const loadMoreFollowers = document.getElementById("load-more-followers");
const loadMoreFollowing = document.getElementById("load-more-following");

let username = "";
let repos = [];
let followersData = [];
let followingData = [];
let visibleRepos = 10;
let visibleFollowers = 10;
let visibleFollowing = 10;

const debounce = (fn, delay = 400) => {
    let timer;
    const debounced = (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
    debounced.cancel = () => clearTimeout(timer);
    return debounced;
};

const updateLoadMoreButtons = () => {
    if (loadMoreRepos) loadMoreRepos.hidden = visibleRepos >= repos.length;
    if (loadMoreFollowers) loadMoreFollowers.hidden = visibleFollowers >= followersData.length;
    if (loadMoreFollowing) loadMoreFollowing.hidden = visibleFollowing >= followingData.length;
};

const switchPanel = (panelName = "profile") => {
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.classList.toggle("active", button.dataset.panel === panelName);
    });

    document.querySelectorAll(".detail-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === `${panelName}-panel`);
    });
};

const openSearchLayout = () => {
    document.body.classList.add("search-open");
    switchPanel("profile");
};

const renderAllLists = () => {
    renderRepos(repos, visibleRepos);
    renderFollowers(followersData, visibleFollowers);
    renderFollowing(followingData, visibleFollowing);
    updateLoadMoreButtons();
};

const performSearch = async () => {
    username = input.value.trim();
    if (!username) return;

    try {
        loading();
        const [user, repoData, followerData, followingList] = await Promise.all([
            getuser(username),
            getRepos(username),
            followers(username),
            following(username)
        ]);

        repos = repoData;
        followersData = followerData;
        followingData = followingList;
        visibleRepos = 10;
        visibleFollowers = 10;
        visibleFollowing = 10;

        render(user);
        window.currentSearchUser = user;
        renderProfilePanel(user);
        renderAllLists();
        openSearchLayout();
    } catch (err) {
        error(err.message);
    }
};

input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        await performSearch();
    }
});

const debouncedSearch = debounce(async () => {
    await performSearch();
});

input.addEventListener("input", () => {
    debouncedSearch();
});

searchButton.addEventListener("click", async () => {
    debouncedSearch.cancel();
    await performSearch();
});

const userContainer = document.getElementById("user");
userContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".tab-button");
    if (!button) return;
    switchPanel(button.dataset.panel);
});

const followerContainer = document.getElementById("followers");
followerContainer.addEventListener("click", async (event) => {
    const card = event.target.closest(".follower-card");
    if (!card) return;

    username = card.dataset.username;
    input.value = username;
    await performSearch();
});

loadMoreRepos.addEventListener("click", () => {
    visibleRepos += 10;
    renderRepos(repos, visibleRepos);
    updateLoadMoreButtons();
});

loadMoreFollowers.addEventListener("click", () => {
    visibleFollowers += 10;
    renderFollowers(followersData, visibleFollowers);
    updateLoadMoreButtons();
});

loadMoreFollowing.addEventListener("click", () => {
    visibleFollowing += 10;
    renderFollowing(followingData, visibleFollowing);
    updateLoadMoreButtons();
});

const sort = document.getElementById("sort");
sort.addEventListener("change", () => {
    const sortedRepos = [...repos];
    switch (sort.value) {
        case "stars":
            sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            break;
        case "forks":
            sortedRepos.sort((a, b) => b.forks_count - a.forks_count);
            break;
        case "updated":
            sortedRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            break;
    }

    switchPanel("repos");
    renderRepos(sortedRepos, visibleRepos);
    updateLoadMoreButtons();
});
