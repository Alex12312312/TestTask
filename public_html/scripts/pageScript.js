import {Table} from "./tableScript.js"
import {SideBar} from "./sideBar.js"
import {Collage} from "./collageScript.js"

function loadUsers(){
    users.getUsersFromServer();
}

let users = null;

window.onload = () => {
    users = new Table();
    Collage.startCycle();
    loadUsers();
    };

for(var element = 0;
element < document.getElementsByClassName("headButton").length; element++){
    document.getElementsByClassName("headButton")[element].onclick = sortUsers;}
document.getElementById("nextPage").onclick = movePage;
document.getElementById("previousPage").onclick = returnPage;

function sortUsers(){users.sortUsers(this.innerText);}
function movePage(){users.nextPage();}
function returnPage(){users.previousPage();}