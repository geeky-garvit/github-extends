const search=document.getElementById("search");
search.addEventListener("input",async function(event){
    const username=event.target.value;
    const user = await fetch(`https://api.github.com/users/${username}`);
    const userre=await user.json();
    const followersre=await fetch(`https://api.github.com/users/${username}/followers`);
    const reposr= await fetch(`https://api.github.com/users/${username}/repos`);
    const followers=await followersre.json();
    const repos=await reposr.json();
   document.getElementById("user").innerHTML=`<img height="50vh" src="${userre.avatar_url}" alt="${userre.name}"> <h2>${userre.name}</h2> <p>Followers: ${followers.length}</p> <p>Repos: ${repos.length}</p>`;
   
});