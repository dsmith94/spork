

Game.rooms.secondRoom = {

    desc() {
        return `This is the second room. $serenity is here.`;
    }

}


Game.rooms.start = {

    desc() {
        return `This is the starting room. Nothing much here. Just a $frog, and a $flower. $serenity is here.`;
    },

    decorations: [
        ["flower", "It smells pretty good."],
    ],

    characters: ["player", "serenity"],

    things: ["frog"],

}


Game.characters.serenity = {

    noun: `Serenity`,

    properNoun: `The Serenity`,

    click() {
        console.log("hello");
    }
    
}


Game.things.frog = {

    ribbets: 0,

    desc() {
        return `The $frog is here.`;
    },

    random() {
        return `It ribbits ${this.ribbets} times. `;
    },

    noun: `frog`,

    properNoun: `the frog`,

    actions: {

        "hug": function() {
            return `The frog doesn't want a hug.`;
        },

        "kiss": function() {
            return `Even the frog thinks you're weird.`;
        },

    },

    click(context) {
        this.ribbets++;
        return `The frog regards you with great curiosity. ${this.random()}`;
    }

}

