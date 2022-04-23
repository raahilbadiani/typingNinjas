let Text;
let typedText = '';
let cursorIdx = 0;
let details = {};
details.correctnessList = 0;
details.backSpaceCnt = 0;
details.oldKey;
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
        details.correctnessList[cursorIdx]=1;
        Letters[cursorIdx].classList.add('correct');
    } else{
        details.correctnessList[cursorIdx]=-1;
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
        details.correctnessList[cursorIdx-1] = 0;
        details.backSpaceCnt++;
        return -1;
    } else if(cursorIdx<Text.length){
        if(isPrintableKey(e)){
            // append
            typedText+=e.key;
            checkCharacter(e.key);
            return 1;
        } else{
            return 0;
        }
    }
}

function updateCursor(e){
    let moveForward = processCharacter(e);
    progress = typedText.length/Text.length*100;
    Letters[cursorIdx]?.classList.remove('cursor'); // remove cursor from previous character
    if(moveForward>0){
        cursorIdx++;    
    } else if(moveForward<0){
        cursorIdx--;
    }
    if(cursorIdx>=Text.length){
        getAccuracy();
        return;
    }
    Letters[cursorIdx].classList.add('cursor'); // add cursor over current character
}

function showAccuracy(){
    let analysisDiv = document.querySelector('.analysis');
    analysisDiv.innerText = 'Accuracy: '+((details.accuracy*100).toFixed(2));
}

function getAccuracy(){
    // acc = correct/total = 1- errors/total
    let sum=0;
    for(let i=0;i< Text.length;i++){
        if(details.correctnessList[i]>0){
            sum++;
        }
    }
    details.accuracy = sum/Text.length;
    showAccuracy();
}

function run(roomName=""){
    Text = fetchParagraph(roomName);
    details.correctnessList = new Array(Text.length).fill(0);
    loadParagraph(roomName);
    Letters = document.querySelectorAll('letter');
    Letters[cursorIdx].classList.add('cursor');
    // document.onkeydown = updateCursor;
}


// edge cases -> 
// typo during space
// typing after end of paragraph
// backspacing till the very begining to see if cursor index becomes negative
// handling of keys with symbols due to 2 symbols present on them
// floating point issues while handling accuracy