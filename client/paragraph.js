const DATA = [
    "It is a love based on giving and receiving as well as having and sharing. And the love that they give and have is shared and received. And through this having and giving and sharing and receiving, we too can share and love and have... and receive.",
    "It takes more than a calorie of fossil fuel energy to produce a calorie of food. From the standpoint of industrial efficiency, it's too bad we can't simply drink the petroleum directly, because there's a lot less energy in a bushel of corn (measured in calories) than there is in the half gallon or so of oil required to produce it. Ecologically this is a fabulously expensive way to produce food.",
    `She was more like a beauty queen from a movie scene. I said, "Don't mind, but what do you mean, I am the one who will dance on the floor in the round?" She said I am the one who will dance on the floor in the round. She told me her name was Billie Jean as she caused a scene. Then every head turned with eyes that dreamed of being the one who will dance on the floor in the round.`,
    `For what it's worth: it's never too late or, in my case, too early to be whoever you want to be. There's no time limit, stop whenever you want. You can change or stay the same, there are no rules to this thing. We can make the best or the worst of it. I hope you make the best of it. And I hope you see things that startle you. I hope you feel things you never felt before. I hope you meet people with a different point of view. I hope you live a life you're proud of. If you find that you're not, I hope you have the strength to start all over again.`,
    `As much money and life as you could want! The two things most human beings would choose above all - the trouble is, humans do have a knack of choosing precisely those things that are worst for them.`,
]

function fetchParagraph(roomName){
    let idx =0;
    if(roomName.length==0){
        idx = Math.floor(Math.random() * DATA.length);
    }else{
        idx = roomName.charCodeAt(0) % DATA.length;
    }
    const paragraph = DATA[idx];
    return paragraph;
}