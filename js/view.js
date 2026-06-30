export function render(data){
    
     document.getElementById("user").innerHTML=`<img src="${username.avatar_url}"> ${username.name} followers${username.followers} repos${username.public_repos} bio${username.bio}`;
}
export function loading(){
    document.getElementById("user").innerHTML="Loading...please wait";
}
export function error(message){
     document.getElementById("user").innerHTML=`${message}`;
}
export function empty(){
     document.getElementById("user").innerHTML="serch please";
}
