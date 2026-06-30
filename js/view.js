export function render(user) {

    document.getElementById("user").innerHTML = `
        <img width="100px" height="100px" src="${user.avatar_url}" alt="${user.login}">
        <h2>${user.name ?? user.login}</h2>
        <p><strong>Bio:</strong> ${user.bio ?? "No bio available"}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
        <p><strong>Repositories:</strong> ${user.public_repos}</p>
    `;
}

export function loading() {
    document.getElementById("user").innerHTML = "<h2>Loading...</h2>";
}

export function error(message) {
    document.getElementById("user").innerHTML = `<h2>${message}</h2>`;
}

export function empty() {
    document.getElementById("user").innerHTML = "";
}

export function note() {
    document.getElementById("note").innerHTML = `
        "Comparing is not good thing ankurr"
    `;
}

export function renderst(user) {

    document.getElementById("first").innerHTML = `
        <img width="100px" height="100px" src="${user.avatar_url}" alt="${user.login}">
        <h2>${user.name ?? user.login}</h2>
        <p><strong>Bio:</strong> ${user.bio ?? "No bio available"}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
        <p><strong>Repositories:</strong> ${user.public_repos}</p>
    `;
}

export function rendernd(user) {

    document.getElementById("second").innerHTML = `
        <img width="100px" height="100px" src="${user.avatar_url}" alt="${user.login}">
        <h2>${user.name ?? user.login}</h2>
        <p><strong>Bio:</strong> ${user.bio ?? "No bio available"}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
        <p><strong>Repositories:</strong> ${user.public_repos}</p>
    `;
}

export function loadingnd() {
    document.getElementById("second").innerHTML = "<h2>Loading...</h2>";
}

export function loadingst() {
    document.getElementById("first").innerHTML = "<h2>Loading...</h2>";
}