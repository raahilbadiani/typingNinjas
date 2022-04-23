const DATA = [
    "It is a love based on giving and receiving as well as having and sharing. And the love that they give and have is shared and received. And through this having and giving and sharing and receiving, we too can share and love and have... and receive.",
    "It takes more than a calorie of fossil fuel energy to produce a calorie of food. From the standpoint of industrial efficiency, it's too bad we can't simply drink the petroleum directly, because there's a lot less energy in a bushel of corn (measured in calories) than there is in the half gallon or so of oil required to produce it. Ecologically this is a fabulously expensive way to produce food.",
    `She was more like a beauty queen from a movie scene. I said, "Don't mind, but what do you mean, I am the one who will dance on the floor in the round?" She said I am the one who will dance on the floor in the round. She told me her name was Billie Jean as she caused a scene. Then every head turned with eyes that dreamed of being the one who will dance on the floor in the round.`,
    `As a teacher, I shall try my best to impart man-making education. Some say that money is the honey of life. But I do not agree with them. Rather, I think that morality is the real honey of life. I want to be a lovable and respectable person as a teacher in the future.`,
    `As much money and life as you could want! The two things most human beings would choose above all - the trouble is, humans do have a knack of choosing precisely those things that are worst for them.`,
    `Rajesh, our youngest classmate, did not know how to swim. But he came unnoticed and tried to imitate us in the river. And what was feared happened? Rajesh was drowned. After a long search, we recovered the body. The sight made us dumb and tears trickled down our cheeks. The horrible sight still haunts me whenever I am alone.`,
    `There are some abuses of science. It has given us the frightful nuclear weapons that can destroy the whole world. But science cannot be blamed for this. We can use fire for cooking our food or burning other’s houses. It is not the fault of fire, but of its users. Likewise, man is responsible for the uses and abuses of science.`,
    `Exercise sharpens our intellect. It keeps a balance between our body and mind. With the help of regular physical training, we will stay healthier, happier, and more alert. However, over-exercise or exercising in an improper way may tell upon our health and growth. We must therefore do it in a balanced form.`,
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