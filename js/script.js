const search=document.getElementById("search");
const cache={};
search.addEventListener("input",async function(event){
    let userre;
    let followers;
    let repos;
    if(event.target.value in cache){
         userre=cache[event.target.value].userre;
         followers=cache[event.target.value].followers;
         repos=cache[event.target.value].repos;
    }
    else{
    const username=event.target.value;
    document.getElementById("user").innerHTML = "<h2>Loading...</h2>";
    const user = await fetch(`https://api.github.com/users/${username}`);
    if(user.status===403){
    document.getElementById("user").innerHTML=
    "GitHub API Rate Limit Exceeded";
}
    userre=await user.json();
    const followersre=await fetch(`https://api.github.com/users/${username}/followers`);
    const reposr= await fetch(`https://api.github.com/users/${username}/repos`);
    followers=await followersre.json();
     repos=await reposr.json();
    cache[username]={
        userre,followers,repos
    };
    }
   document.getElementById("user").innerHTML=`<img height="50vh" src="${userre.avatar_url}" alt="${userre.name}"> <h2>${userre.name}</h2> <p>Followers: ${followers.length}</p> <p>Repos: ${repos.length}</p>`;

});