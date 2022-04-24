let carsDiv = document.querySelector("#cars");
let carHtmlString = "";
let players = {};
let startButton = document.querySelector("#start");
let startParent = document.querySelector("#start-parent");
let countSec = 4;
let nameCloseBtn = document.querySelector('#name-close-btn');
let nameText = document.querySelector('#name-input');

run(roomName);

function handleClick(e){
    sock.emit("start");
}
startButton.addEventListener('click',handleClick);

//grab the name
nameCloseBtn.addEventListener('click',()=>{
    localStorage.setItem('name',nameText.value);
})



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
}, 300);

let progressInterval = setInterval(() => {
    sock.emit("progress",progress);
}, 1000);

function countDown(){
    setTimeout(() => {
        countSec -= 1;
        startButton.innerText = countSec;

        if(countSec>0) countDown();
        else{
            document.onkeydown = updateCursor;
            startButton.innerText = "GO!"
            setTimeout(() => {
                startButton.remove();
            }, 2000);
        }
    }, 1000);
}

sock.on("start",()=>{
    startButton.removeEventListener('click',handleClick);
    countDown();
});

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
            element = getCarHTML(key,players[key].color);
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
        }
    }
}


function moveCars(){
    for(const key in players){
        // console.log(key,players[key].progress);
        let car = players[key].element.children[0];
        car.style = `margin-left: ${players[key].progress}%;`;
    }
}