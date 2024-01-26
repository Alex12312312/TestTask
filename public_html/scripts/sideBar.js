export class SideBar{

static #element = document.getElementById("sideMenu");
static #postsPlace = document.getElementById("postsPlace");
static #backButton = document.getElementById("backButton");
static #titleText = document.getElementById("sideMenuTitle");

/*
 * Отображение постов пользователя в боковом меню
 */
static showInfo(userId){
    SideBar.#postsPlace.innerHTML = "";
    fetch(`https://dummyjson.com/users/${userId}`)
    .then(res => res.json())
    .then(data => {
        SideBar.#titleText.innerText = `Посты пользователя ${data["username"]}`;
    });
    fetch(`https://dummyjson.com/users/${userId}/posts`)
    .then(res => res.json())
    .then(data => {
        for(var post in data.posts){
            let postBlock = document.createElement("div");
            postBlock.classList.add("postBlock");
            let postTitle = document.createElement("div");
            postTitle.classList.add("postTitle");
            postTitle.innerText = data.posts[post].title;
            postBlock.append(postTitle);
            let postText = document.createElement("div");
            postText.classList.add("postText");
            postText.innerText = data.posts[post].body;
            postBlock.append(postText);
            SideBar.#postsPlace.append(postBlock);
        }
    });
    SideBar.#element.style.left = `50%`;
    SideBar.#backButton.onclick = SideBar.closeMenu;
}

/*
 * Функция закрытия бокового меню
 */
static closeMenu(){
    SideBar.#element.style.left = `100%`;
}
}
