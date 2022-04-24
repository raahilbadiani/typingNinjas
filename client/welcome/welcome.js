
let roomList = [];
let nameCloseBtn = document.querySelector('#name-close-btn');
let nameText = document.querySelector('#name-input');
fetchRoomList();

// handle dark mode
const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', ()=>{
  document.body.classList.toggle('light');
})

//grab the name
nameCloseBtn.addEventListener('click',()=>{
    localStorage.setItem('name',nameText.value);
})

async function fetchRoomList(){
    const response = await fetch("/room/allrooms");
    const data = await response.json();
    let sortableData= Object.entries(data);
    sortableData.sort((a,b)=>(b[1]-a[1]));
    showRoomList(sortableData);
    setTimeout(fetchRoomList,1000);
}


function showRoomList(data){
    let room_list = document.getElementById('room-list');
    let newRoomList = '';
    for(let [room,size] of data){
        newRoomList+=`<tr class="table-dark">
            <td>${room.toUpperCase()}</td>
            <td>${size}</td>
            <td><a href="room/${room}" class="btn btn-sm btn-outline-primary">Join</a></td>
        </tr>`
        // btn.addEventListener('click',(e)=>{
        //     console.log(e);
        // })
        // newRoomList+=`<button class="btn btn-primary room-list-item">${room} ${data[room]}</button>`;
        // console.log(`room -> ${room}, no of players -> ${data[room]}`);
    }
    if(newRoomList.length ==0) {
        newRoomList = `<td colspan="3"><center class="text-white bg-dark">No rooms online.<br>Create one.</center></td>`;
    }
    if(newRoomList!==roomList){
        room_list.innerHTML = newRoomList;
        roomList = newRoomList;
    }
}