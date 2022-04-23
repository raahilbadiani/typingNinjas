const { customAlphabet } = require('nanoid');
const alphabet = '0123456789abcdefghjkmnopqrstuvwxyz';
const nanoid = (length)=>customAlphabet(alphabet,length)();


let colors = ['#ff5733','#ffd000','#9bff00','#00ff0c','#00ffeb','#0062ff','#a500ff','#ff006f','#ff0000']
function getRandomColor(){
   return colors[Math.floor(Math.random()*colors.length)];
}


module.exports = {
    nanoid,
    getRandomColor
}
