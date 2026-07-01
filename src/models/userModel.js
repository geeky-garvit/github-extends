const cache = {};

export async function getuser(username) {
    if (cache[username]) {
        return cache[username];
    }

    const userre = await fetch(
        `https://api.github.com/users/${username}`
    );

    if (userre.status === 404) {
        throw new Error("User Not Found");
    }

    if (userre.status === 403) {
        throw new Error("Limit Exceeded");
    }

    const user = await userre.json();

    cache[username] = user;

    return user;
}

export async function followers(username) {

    const followerre = await fetch(
        `https://api.github.com/users/${username}/followers`
    );

    return await followerre.json();
}

export async function following(username) {

    const followingre = await fetch(
        `https://api.github.com/users/${username}/following`
    );

    return await followingre.json();
}
export async function getRepos(username) {

    const reposre = await fetch(
        `https://api.github.com/users/${username}/repos`
    );

    if (reposre.status === 404) {
        throw new Error("Repositories Not Found");
    }

    if (reposre.status === 403) {
        throw new Error("Limit Exceeded");
    }

    return await reposre.json();
}