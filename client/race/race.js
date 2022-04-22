function getPlayerName(){
    let pname = localStorage.getItem('name');
    if(pname){
        return pname.substring(0,8);
    } else{
        return 'nan';
    }
}
let sock = io({query:{roomName:roomName,username:getPlayerName()}});