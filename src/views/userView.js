function clearElement(id) {
    const element = document.getElementById(id);
    if (!element) return null;
    element.innerHTML = "";
    return element;
}

function createText(tag, text, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    return element;
}

function createButton(label, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className || "action-btn";
    button.textContent = label;
    return button;
}

function createStat(value, label) {
    const stat = document.createElement("div");
    stat.append(
        createText("span", value),
        createText("small", label)
    );
    return stat;
}

function createSafeLink(url, text) {
    if (!url) return createText("span", "None");

    const normalizedUrl = url.trim();
    const isSafeUrl = normalizedUrl.startsWith("http://") || normalizedUrl.startsWith("https://");
    if (!isSafeUrl) return createText("span", "None");

    const link = document.createElement("a");
    link.href = normalizedUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = text || normalizedUrl;
    return link;
}

export function render(user) {
    const container = clearElement("user");
    if (!container) return;

    const userCard = document.createElement("div");
    userCard.id = "user-card";

    const landscape = document.createElement("div");
    landscape.className = "user-card-landscape";
    const avatar = document.createElement("img");
    avatar.src = user.avatar_url;
    avatar.alt = user.login;
    landscape.append(
        avatar,
        createText("h2", user.name ?? user.login),
        createText("p", user.bio ?? "No bio available")
    );

    const main = document.createElement("div");
    main.className = "user-card-main";

    const header = document.createElement("div");
    header.className = "user-card-header";
    const headerContent = document.createElement("div");
    headerContent.append(
        createText("h2", user.name ?? user.login),
        createText("p", user.bio ?? "No bio available")
    );
    const badge = createText("span", `@${user.login}`);
    badge.className = "user-badge";
    header.append(headerContent, badge);

    const stats = document.createElement("div");
    stats.className = "user-stats";
    stats.append(
        createStat(user.followers, "Followers"),
        createStat(user.following, "Following"),
        createStat(user.public_repos, "Repos")
    );

    const actions = document.createElement("div");
    actions.className = "profile-actions";
    actions.append(
        createButton("View profile"),
        createButton("Open repos"),
        createButton("Follow")
    );

    const tabs = document.createElement("div");
    tabs.className = "profile-tabs";
    [
        ["profile", "Profile", true],
        ["repos", "Repositories", false],
        ["followers", "Followers", false],
        ["following", "Following", false]
    ].forEach(([panel, label, active]) => {
        const tabButton = createButton(label, "tab-button");
        tabButton.dataset.panel = panel;
        if (active) tabButton.classList.add("active");
        tabs.appendChild(tabButton);
    });

    main.append(header, stats, actions, tabs);
    userCard.append(landscape, main);
    container.appendChild(userCard);
}

export function renderProfilePanel(user) {
    const container = clearElement("profile-panel");
    if (!container) return;

    const card = document.createElement("div");
    card.className = "profile-panel-card";

    const fields = [
        ["Name", user.name ?? user.login],
        ["Location", user.location ?? "Unknown"],
        ["Company", user.company ?? "Not set"],
        ["Joined", new Date(user.created_at).toLocaleDateString()]
    ];

    fields.forEach(([label, value]) => {
        const item = document.createElement("div");
        item.className = "profile-panel-item";
        item.append(createText("strong", label), createText("span", value));
        card.appendChild(item);
    });

    const blogItem = document.createElement("div");
    blogItem.className = "profile-panel-item";
    blogItem.append(createText("strong", "Blog"));
    blogItem.append(createSafeLink(user.blog, user.blog));
    card.appendChild(blogItem);

    container.appendChild(card);
}

export function renderst(user) {
    const container = clearElement("first");
    if (!container) return;

    const avatar = document.createElement("img");
    avatar.src = user.avatar_url;
    avatar.alt = user.login;
    avatar.width = 100;
    avatar.height = 100;

    const title = createText("h2", user.name ?? user.login);
    const bio = createText("p", `Bio: ${user.bio ?? "No bio available"}`);
    const followers = createText("p", `Followers: ${user.followers}`);
    const following = createText("p", `Following: ${user.following}`);
    const repos = createText("p", `Repositories: ${user.public_repos}`);

    container.append(avatar, title, bio, followers, following, repos);
}

export function loading() {
    const container = clearElement("user");
    if (!container) return;
    container.appendChild(createText("h2", "Loading..."));
}

export function loadingst() {
    const container = clearElement("first");
    if (!container) return;
    container.appendChild(createText("h2", "Loading..."));
}

export function error(message) {
    const container = clearElement("user");
    if (!container) return;
    container.appendChild(createText("h2", message));
}

export function empty() {
    clearElement("user");
}

export function renderRepos(repos, count = 10) {
    const container = clearElement("repos");
    if (!container) return;

    const visibleRepos = repos.slice(0, count);
    if (!visibleRepos.length) {
        container.appendChild(createText("p", "No repositories available.", "empty-state"));
        return;
    }

    visibleRepos.forEach((repo) => {
        const card = document.createElement("div");
        card.className = "repo-card";
        card.append(
            createText("h3", repo.name),
            createText("p", repo.description ?? "No description available"),
            createText("p", `⭐ ${repo.stargazers_count} • ${repo.language ?? "Unknown"}`)
        );
        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "View repository";
        card.appendChild(link);
        container.appendChild(card);
    });
}

export function renderFollowers(followers, count = 10) {
    const container = clearElement("followers");
    if (!container) return;

    const visibleFollowers = followers.slice(0, count);
    if (!visibleFollowers.length) {
        container.appendChild(createText("p", "No followers yet.", "empty-state"));
        return;
    }

    visibleFollowers.forEach((follower) => {
        const card = document.createElement("div");
        card.className = "follower-card";
        card.dataset.username = follower.login;
        const img = document.createElement("img");
        img.width = 60;
        img.height = 60;
        img.src = follower.avatar_url;
        img.alt = follower.login;
        card.append(img, createText("div", follower.login));
        container.appendChild(card);
    });
}

export function renderFollowing(following, count = 10) {
    const container = clearElement("following");
    if (!container) return;

    const visibleFollowing = following.slice(0, count);
    if (!visibleFollowing.length) {
        container.appendChild(createText("p", "No following users found.", "empty-state"));
        return;
    }

    visibleFollowing.forEach((user) => {
        const card = document.createElement("div");
        card.className = "follower-card";
        const img = document.createElement("img");
        img.width = 60;
        img.height = 60;
        img.src = user.avatar_url;
        img.alt = user.login;
        card.append(img, createText("div", user.login));
        container.appendChild(card);
    });
}
