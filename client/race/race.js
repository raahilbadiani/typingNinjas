let carsDiv = document.querySelector("#cars");
let carHtmlString = "";
let players = {};

function getPlayerName(){
    let pname = localStorage.getItem('name');
    if(pname){
        return pname.substring(0,8);
    } else{
        return 'nan';
    }
}
let sock = io({query:{roomName:roomName,username:getPlayerName()}});

let listInterval = setInterval(() => {
    sock.emit("list");
}, 1000);

let progressInterval = setInterval(() => {
    sock.emit("progress",progress);
}, 1000);

sock.on("list",(data)=>{
    players = data;
    addNewCars();
    cleanUpDeadCars();
    moveCars();
});

function addNewCars(){
    for(const key in players){
        let element = document.getElementById(key);
        if(!element){
            element = getCarHTML(key);
            carsDiv.appendChild(element);
        }
        players[key].element = element;
    }
}

function cleanUpDeadCars(){
    let cars = carsDiv.children;
    for(const car of cars){
        if(car.id in players){}
        else{
            car.remove();
            delete players[key];
        }
    }
}


function moveCars(){
    for(const key in players){
        console.log(key,players[key].progress);
        let car = players[key].element.children[0];
        car.style = `margin-left: ${players[key].progress}%;`;
    }
}