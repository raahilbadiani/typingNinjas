let Text;
let typedText = '';
let cursorIdx = 0;
let details = {};
details.correctnessList = 0;
details.correctCnt = 0;
details.incorrectCnt = 0;
details.backSpaceCnt = 0;
details.accuracy = 0;
details.oldKey;
details.wpm = 0;
let Letters;
let progress = 0;
let maxTime = 120;
let analysisInterval;
let timer = new Stopwatch(maxTime);
let analysisDiv = document.querySelector('.analysis');

// toogle to light theme
const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', ()=>{
  document.body.classList.toggle('light');
})

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
        details.correctCnt++;
        Letters[cursorIdx].classList.add('correct');
    } else{
        details.incorrectCnt++;
        if(Letters[cursorIdx].innerText==' '){
            Letters[cursorIdx].classList.add('wrong-space');
        } else{
            Letters[cursorIdx].classList.add('wrong');
        }
    }
}

/**
 * Three cases:
 * move cursor +1 for printable character
 * move cursor -1 for Backspace
 * don't move cursor for modifier keys like Shift, Ctrl
 */
function shouldMoveForward(e){
    if(e.key=='Backspace'){
        if(cursorIdx<=0)return -1;
        Letters[cursorIdx-1].classList = 'untyped';        
        typedText = typedText.slice(0,typedText.length-1);
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
    if(e.key==' ') e.preventDefault(); // Prevent unwanted clicks while typing the paragraph

    let moveForward = shouldMoveForward(e);
    progress = details.correctCnt/Text.length*100;
    Letters[cursorIdx]?.classList.remove('cursor'); // remove cursor from previous character
    if(moveForward>0){
        cursorIdx++;    
    } else if(moveForward<0 && cursorIdx>0){ // handle edge case when cursor is at beginning
        cursorIdx--;
    }
    if(cursorIdx>=Text.length){ // handle edge case when cursor is at the end
        clearInterval(analysisInterval);
        timer.stop();
        return;
    }
    Letters[cursorIdx].classList.add('cursor'); // add cursor over current character
}




function showAnalysis(){
    // Start the timer on first keypress
    if(!timer.isRunning) timer.start();

    // Calculate the speed in WPM and accuracy percentage
    details.wpm = details.correctCnt/timer.getMilliseconds()*60000/5;
    if(details.correctCnt+details.incorrectCnt > 0){ // avoid division by 0
        details.accuracy = (details.correctCnt)/(details.correctCnt+details.incorrectCnt);
    }

    // Display statistics on screen
    analysisDiv.innerText = '';
    analysisDiv.innerText += 'Accuracy: '+((details.accuracy*100).toFixed(2));
    analysisDiv.innerText += '\tWPM: '+ details.wpm.toFixed(0);
}

function run(roomName=""){
    Text = fetchParagraph(roomName);
    details.correctnessList = new Array(Text.length).fill(0);
    loadParagraph(roomName);
    Letters = document.querySelectorAll('letter');
    Letters[cursorIdx].classList.add('cursor');
    analysisInterval = setInterval(() => {
        showAnalysis();
    }, 1000);
}


// edge cases -> 
// typo during space
// typing after end of paragraph
// backspacing till the very begining to see if cursor index becomes negative
// handling of keys with symbols due to 2 symbols present on them
// floating point issues while handling accuracy