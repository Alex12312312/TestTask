
import {ImageWindow} from "./ImageWindow.js"
/*
 * Класс, отвечающий за добавление/изменение изображений коллажа
 */
export class Collage{

static #collageCycle;
static #collagePlace = document.getElementById("collagePlace");
static #elemNum = 0;
static #elemCount = 0;
/*
 * Запуск цикла добавления/изменения изображений в коллаже
 */
static startCycle(){
    Collage.#collageCycle = setInterval(()=>{
        fetch(`https://dog.ceo/api/breeds/image/random`)
                .then(data => data.json())
                .then(img => {
                 let imgItem = document.createElement("img");
                 imgItem.classList.add("imgElement");
                 imgItem.onclick = Collage.#openImage;
                 imgItem.src = img.message;
                 imgItem.width = `${Math.floor(Math.random() * 100) + 100}`;
                 imgItem.id = `row-${Collage.#elemCount}`;
                 Collage.#collagePlace.append(imgItem);
                 if(Collage.#checkBorders()){
                     Collage.stopCycle();
                     Collage.updateImages();
                 } else{
                     Collage.#elemCount += 1;
                 }
                });
    }, 3000); 
}

/*
 * Обновление фотографий
 */
static updateImages(){
    Collage.#collageCycle = setInterval(()=>{
        fetch(`https://dog.ceo/api/breeds/image/random`)
                .then(data => data.json())
                .then(img => {
                 let imgItem = document.createElement("img");
                 imgItem.classList.add("imgElement");
                 let item = document.getElementById(`row-${Collage.#elemNum}`);
                 item.src = img.message;
                 Collage.#elemNum = (Collage.#elemNum + 1) % Collage.#elemCount;
            })}, 3000);
}

/*
 * Остановка цикла 
 */    
static stopCycle(){
    clearInterval(Collage.#collageCycle);
}

static #openImage(){
    Collage.stopCycle();
    ImageWindow.openImage(this.src);
}

static #checkBorders(){
    let container = Collage.#collagePlace.getBoundingClientRect();
    let item = Collage.#collagePlace.lastChild.getBoundingClientRect();
    return container.right <= item.left || container.left >= item.right ||
    container.bottom < item.bottom;
}

}

/*
 * 1) Сделать функцию-проверку на выход изображения за границы столбца
 * 2) Реализовать схему - заполнение первой КОЛОННЫ - проверка, что переполнено,
 * - Заполнение второй колонны - при перегрузке обновление старых изображений
 */