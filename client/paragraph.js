const DATA = [
    `It is a love based on giving and receiving as well as having and sharing. And the love that they give and have is shared and received.`,
    `It takes more than a calorie of fossil fuel energy to produce a calorie of food. From the standpoint of industrial efficiency, it's too bad.`,
    `She was more like a beauty queen from a movie scene. I said, "Don't mind, but what do you mean, I am the one who will dance on the floor in the round?"`,
    `As a teacher, I shall try my best to impart man-making education. Some say that money is the honey of life. But I do not agree with them.`,
    `As much money and life as you could want! The two things most human beings would choose above all - the trouble is, humans do have a knack of choosing precisely those things that are worst for them.`,
    `Rajesh, our youngest classmate, did not know how to swim. But he came unnoticed and tried to imitate us in the river. And what was feared happened?`,
    `There are some abuses of science. It has given us the frightful nuclear weapons that can destroy the whole world. But science cannot be blamed for this.`,
    `Exercise sharpens our intellect. It keeps a balance between our body and mind. With the help of regular physical training, we will stay healthier, happier, and more alert.`,
]

/**
 * 
 * @param {string} roomName room code string
 * @returns paragraph
 */
function fetchParagraph(roomName){
    let idx =0;
    if(roomName.length==0){ // No roomName implies Practice mode, return random paragraph
        idx = Math.floor(Math.random() * DATA.length);
    }else{ // Use roomName as input to return same paragraph for all users
        idx = roomName.charCodeAt(0) % DATA.length;
    }
    const paragraph = DATA[idx];
    return paragraph;
}