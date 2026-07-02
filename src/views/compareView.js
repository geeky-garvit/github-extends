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

function renderCompareCard(user, containerId) {
    const container = clearElement(containerId);
    if (!container) return;

    const avatar = document.createElement("img");
    avatar.width = 100;
    avatar.height = 100;
    avatar.src = user.avatar_url;
    avatar.alt = user.login;

    const title = createText("h2", user.name ?? user.login);
    const bio = createText("p", `Bio: ${user.bio ?? "No bio available"}`);
    const followers = createText("p", `Followers: ${user.followers}`);
    const following = createText("p", `Following: ${user.following}`);
    const repos = createText("p", `Repositories: ${user.public_repos}`);

    container.append(avatar, title, bio, followers, following, repos);
}

export function renderFirst(user) {
    renderCompareCard(user, "first");
}

export function rendernd(user) {
    renderCompareCard(user, "second");
}

export function loadingnd() {
    const container = clearElement("second");
    if (!container) return;
    container.appendChild(createText("h2", "Loading..."));
}

export function errornd(message) {
    const container = clearElement("second");
    if (!container) return;
    const errorBox = document.createElement("div");
    errorBox.className = "compare-error";
    errorBox.append(
        createText("h2", "Error"),
        createText("p", message)
    );
    container.appendChild(errorBox);
}

export function note() {
    const noteElement = document.getElementById("note");
    if (!noteElement) return;
    noteElement.textContent = "Search a second user to compare profiles.";
}
