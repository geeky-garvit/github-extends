export function render(user) {

    document.getElementById("user").innerHTML = `
    <div id="user-card">
        <img width="100px" height="100px" src="${user.avatar_url}" alt="${user.login}">
        <h2>${user.name ?? user.login}</h2>
        <p><strong>Bio:</strong> ${user.bio ?? "No bio available"}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
        <p><strong>Repositories:</strong> ${user.public_repos}</p>
    </div>`;
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

export function loading() {
    document.getElementById("user").innerHTML = "<h2>Loading...</h2>";
}

export function loadingst() {
    document.getElementById("first").innerHTML = "<h2>Loading...</h2>";
}

export function error(message) {
    document.getElementById("user").innerHTML = `<h2>${message}</h2>`;
}

export function empty() {
    document.getElementById("user").innerHTML = "";
}
export function renderRepos(repos) {

    document.getElementById("repos").innerHTML = repos.map(repo => `
        <div class="repo-card" id="user-info-card">
            <h3>${repo.name}</h3>

            <p>${repo.description ?? "No description available"}</p>

            <p>⭐ ${repo.stargazers_count}</p>

            <p>${repo.language ?? "Unknown"}</p>

            <a href="${repo.html_url}" target="_blank">
                View Repository
            </a>
        </div>
    `).join("");
}
export function renderFollowers(followers) {

    document.getElementById("followers").innerHTML = followers.map(follower => `
        <div class="follower-card" id="user-info-card" data-username="${follower.login}">
            <img
                width="60"
                height="60"
                src="${follower.avatar_url}"
                alt="${follower.login}"
            >

            <h3>${follower.login}</h3>
        </div>
    `).join("");

}