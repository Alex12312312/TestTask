import {SideBar} from "./sideBar.js"
export class Table{
constructor(){
    this.pageSize = 25; // Максимальное количество строк на 1-ой странице
    this.pageNum = 0; // Номер текущей страницы
    this.currentUsers = []; // Данные пользователей отображённые на странице
    this.usersCount = 0;
}

/**
 * Получение пользователей с сервера
 */
getUsersFromServer() {
    fetch(`https://dummyjson.com/users?limit=${this.pageSize}
&skip=${this.pageNum*this.pageSize}
&select=id,username,email,firstName,lastName,birthDate,height,ip`)
    .then(res => res.json())
    .then(data => {
        this.currentUsers = data.users;
        this.currentUsers.forEach((values) => {
            values["birthDate"] = new Date(values["birthDate"]);
            values["firstName"] = values["lastName"]+ " " + values["firstName"];
            delete values["lastName"];
        });
        this.usersCount = data.total;
        this.drawTable();
        });
}

/**
 * Вывод данных в таблицу
 */
drawTable(){
    let table = document.getElementById('DataPlace');
    table.innerHTML = "";
        this.currentUsers.forEach((element) => {
        let row = document.createElement('tr');
        row.id = element.id;
        row.onclick = this.launchSidebar;
        row.classList.add("userRow");
        for(var key in element){
            let column = document.createElement('td');
            if(key == "birthDate"){
                column.innerText=(element[key].getDay() + 1) + "." + 
                    (element[key].getMonth() + 1) + "." + element[key].getFullYear();
            }
            else{
                column.innerText=element[key].toString();
            }
            row.append(column);
        }
        table.append(row);
    });
}

/**
 * Переход на следующую страницу
 */
nextPage() {
    
    if((this.pageNum + 1) * this.pageSize < this.usersCount){
        this.pageNum += 1;
        this.getUsersFromServer();
    }
}

/**
 * Переход на предыдущую страницу
 */
previousPage() {
    if(this.pageNum > 0){
        this.pageNum -= 1;
        this.getUsersFromServer();
    }
}

/**
 * Изменение параметра для сортировки
 * и выполнение особых сценариев сортировки для отдельных полей
 */
sortUsers(param){
    switch(param){
        case "id": param = "id"; break
        case "Логин": param = "username"; break
        case "Почта": param = "email"; break
        case "Дата рождения": param = "birthDate"; break
        case "Рост": param = "height"; break
        case "IP-адрес":
            this.compareIP();
            this.drawTable();
            return;
        case "ФИО": param = "firstName"; break
    }
    this.stringSort(param);
    this.drawTable();
}

/*
 * Сортировка по параметру
 */
stringSort(param){
    this.currentUsers.sort((a, b) => (a[param] < b[param] && -1)
            || (a[param] > b[param] && 1) || 0);
}

/*
 * Сортировка для IP-адресов
 */
compareIP(){
    this.currentUsers.sort((a, b) => {
        const num1 = Number(a["ip"].split(".").map((num) => (`000${num}`).slice(-3) ).join(""));
        const num2 = Number(b["ip"].split(".").map((num) => (`000${num}`).slice(-3) ).join(""));
        return num1 - num2;
    });
}

/*
 * Вызов бокового меню
 */
launchSidebar(){
    SideBar.showInfo(this.id);
}

}
