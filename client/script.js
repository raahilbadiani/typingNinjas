const Text = fetchParagraph();
let typedText = '';
let cursorIdx = 0;
let details = {};
let Letters;
let progress = 0;

function loadParagraph(){
    const ParagraphDiv = document.querySelector('.paragraph');
    for (let i = 0; i < Text.length; i++) {
        let letter = document.createElement('letter');
        letter.innerText = Text[i];
        letter.classList.add('untyped');
        ParagraphDiv.append(letter);
    }
}


function isPrintableKey(e){
    return (e.key && e.key.length === 1);
}

function checkCharacter(key){
    // console.log(`${key},${Letters[cursorIdx].innerText}`);
    Letters[cursorIdx].classList.remove('untyped');
    if(Letters[cursorIdx].innerText===key){
        Letters[cursorIdx].classList.add('correct');
    } else{
        if(Letters[cursorIdx].innerText==' '){
            Letters[cursorIdx].classList.add('wrong-space');
        } else{
            Letters[cursorIdx].classList.add('wrong');
        }
    }
}

function processCharacter(e){
    if(e.key=='Backspace'){
        Letters[cursorIdx-1].classList = 'untyped';
        typedText = typedText.slice(0,typedText.length-1);
        return -1;
    } else if(cursorIdx<Text.length){
        if(isPrintableKey(e)){
            // append
            typedText+=e.key;
            checkCharacter(e.key);
            return 1;
        } else{
            // check for Backspace
            return 0;
        }
    }
}

document.onkeydown = function updateCursor(e){
    let moveForward = processCharacter(e);
    progress = typedText.length/Text.length*100;
    Letters[cursorIdx]?.classList.remove('cursor'); // remove cursor from previous character
    if(moveForward>0){
        cursorIdx++;    
    } else if(moveForward<0){
        cursorIdx--;
    }
    if(cursorIdx>=Text.length) return;
    Letters[cursorIdx].classList.add('cursor'); // add cursor over current character
}

function run(){
    loadParagraph();

    Letters = document.querySelectorAll('letter');
    Letters[cursorIdx].classList.add('cursor');
}

run();
// edge cases -> 
// typo during space
// typing after end of paragraph
// backspacing till the very begining to see if cursor index becomes negative
