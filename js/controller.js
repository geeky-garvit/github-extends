import { getuser } from "./model.js";
import { render,loading,error } from "./view.js";
const input =document.getElementById("search");
input.addEventListener("input",async (event)=>{
    
    const username = event.target.value.trim();
    if(!username){
        document.getElementById("user").innerHTML = "";
        return;
    }
    try{
        loading();
        const data= await getuser(username);
        render(data);
    }
    catch (err){
        error(err.message);
    }

})