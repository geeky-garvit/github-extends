const cache = {};

export async function getuser(username) {

    if (cache[username]) {
        return cache[username].user;
    }

    const userre =
        await 
            fetch(`https://api.github.com/users/${username}`);
        if (userre.status === 404) {
        throw new Error("User Not Found");
    }

    if (userre.status === 403) {
        throw new Error("GitHub API Rate Limit Exceeded");
    }
        const user=await userre.json();
    

    cache[username] = user;

    return user
};
export async function followers(username){
    const followerre=await fetch(`https://api.github.com/users/${username}/followers`);
    return followerre;
} 
export async function following(username){
    const follwingre=await fetch(`https://api.github.com/users/${username}/following`);
    return followingre;
} 