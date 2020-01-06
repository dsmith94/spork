

Game.rooms.secondRoom = {

    desc: () => `This is the second room. $serenity is here. The $moon is here.`,

    scenery: ["moon"],

}


Game.rooms.start = {

    desc: () => `This is the starting room. Nothing much here. Just a $frog, and a $flower. $serenity is here. The $moon is here.`,

    decorations: {
        "flower": () => `It smells pretty good.`,
    },

    characters: ["player", "serenity"],

    things: ["frog"],

    scenery: ["moon"],

}


Game.scenery.moon = {

    noun: "moon",

    click: () => `The moon shines bright over the ocean.`,

}


Game.characters.serenity = {

    noun: "Serenity",

    properNoun: `The Serenity`,

    click: () => `Clicked serenity`,

    hello() {
        return `Hello`;
    },

    currentState: "bored",

    states: {

        "hungry": {
        
            "How are you doing?": () => {
                hideCurrentTopic();
                return `Good, I guess`;
            },

            "Bye bye": () => {
                endConversation();
                return `See ya later`;
            }

        },


        "bored": {
        
            "Feel stupid?": () => {
                return `Yes, very much.`;
            },

            "Bye bye": () => {
                dChr.currentState = "hungry";
                return `Dinkey on purpose`;
            }

        }

    }
    
}


Game.things.frog = {

    ribbets: 0,

    desc: () => `The $frog is here.`,

    noun: `frog`,

    properNoun: `the frog`,

    actions: {

        hug: () => `The frog doesn't want a hug.`,

        kiss: () => `Even the frog thinks you're weird.`,

    },

    random: () => `It ribbits ${dObj.ribbets} times. `,

    click(context) {
        dObj.ribbets++;
        return `The frog regards you with great curiosity. ${dObj.random()}`;
    }

}

