const ParagraphDiv = document.querySelector('.paragraph');
const Text = 'The quick brown fox jumps over the lazy dog';

for (let i = 0; i < Text.length; i++) {
    let letter = document.createElement('letter');
    letter.innerText = Text[i];
    letter.style.color = 'blue';
    ParagraphDiv.append(letter);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Text1 = document.getElementsByTagName('letter')

let i = 0;
setInterval(() => {
    if(i>0)
    Text1[i - 1].classList.remove('cursor');
    Text1[i].classList.add('cursor');
    i++;
}, 300);
