import {Collage} from "./collageScript.js"
export class ImageWindow{
    
    static #imageWindow = document.getElementById("imageWindow");
    
    static openImage(imageSRC){
        ImageWindow.#imageWindow = document.getElementById("imageWindow");
        ImageWindow.#imageWindow.style.display = "flex";
        let imagefield = document.getElementById("bigImage");
        imagefield.src = imageSRC;
        let downloadButton = document.getElementById("downloadButton");
        downloadButton.href = imageSRC;
        downloadButton.onclick = ImageWindow.saveImage;
        let closeButton = document.getElementById("closeButton");
        closeButton.onclick = ImageWindow.closeWindow;
    }
    
    static async saveImage(){
        const image = await fetch(this.href);
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'dog.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
     static async closeWindow(){
         ImageWindow.#imageWindow.style.display = "none";
         Collage.startCycle();
     }
    
}