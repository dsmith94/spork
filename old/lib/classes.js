

Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [this[i], this[rand]] = [this[rand], this[i]]
    }
}


function randomText(array) {
    array.shuffle();
    return array[0];
}


function rng(i)
{
    var v = Math.floor(Math.random() * (i + 1));
    return v;
}


function addEnvironmentalMessage(m) {
    if (m) {
        game.environmentalMessages.unshift(m);
    }
}


function addDisplayMessage(m)
{
    if (m) {
        game.messages.unshift(m);
    }
}


class Action {

    verb() {
        return this.verbText;
    }

    verbText = ``;
    executeFunction = ``;

    constructor(verbText, executeFunction) {
        this.verbText = verbText;
        this.executeFunction = executeFunction;
    }

}


class Thing {

    noun() {
        return `${this.id}`;
    }


    open() {
        this.isClosed = false;
        return `${this.articleNoun()} is now opened. `;
    }


    close() {
        this.isClosed = true;
        return `${this.articleNoun()} is now closed. `;
    }


    read() {
        return `${game.playerNoun} read ${this.articleNoun()}, and learn nothing interesting.`;
    }


    turnOn() {
        this.isOn = true;
        return `${game.playerNoun} turn on ${this.articleNoun()}.`;
    }


    turnOff() {
        this.isOn = false;
        return `${game.playerNoun} turn off ${this.articleNoun()}.`;
    }


    buildDefaultActions() {
        var a = [];
        if (this.canBeOpened) {
            if (this.isClosed === true) {
                a.push(new Action(`open`, "open"));
            }
            else if (this.isClosed === false) {
                a.push(new Action(`close`, "close"));
            }
        }
        if (this.canBeTurnedOn) {
            if (this.isOn === true) {
                a.push(new Action(`turn off`, "turnOff"));
            }
            else if (this.isOn === false) {
                a.push(new Action(`turn on`, "turnOn"));
            }
        }
        if (this.canBeRead) {
            a.push(new Action(`read`, "read"));
        }
        return a;
    }


    customActions() {
        return [];
    }


    focus() {
        return ``;
    }


    articleNoun() {
        return `the ${this.noun()}`;
    }


    insertIntoText(container, inserted) {
        return `${game.playerNoun} put ${inserted.articleNoun()} into ${container.articleNoun()}. `;
    }


    failedInsertText(container, inserted) {
        return `${game.playerNoun} can't put ${inserted.articleNoun()} into ${container.articleNoun()}. `;
    }


    insert(thing) {
        if (this.canInsertInto === true && this.contains.indexOf(thing) > -1) {
            this.contains.push(thing);
            return this.insertIntoText(this, thing);
        }
        else if (this.canInsertInto === false) {
            return this.failedInsertText(this, thing);
        }
    }


    getRoom() {
        for (const [key, value] of game.map.entries()) {
            for (const thing of value.contains) {
                if (typeof thing.id !== "undefined" && typeof this.id !== "undefined") {
                    if (thing.id === this.id) {
                        return key;
                    }
                }
            }
        }
        return ``;
    }


    moveToRoom(room) {
        var current = game.map.get(this.getRoom());
        var nextRoom = game.map.get(room);
        if (nextRoom && current) {
            nextRoom.contains.push(this);
            current.removeThing(this.id);
        }
    }


    isIn(room) {
        var r = game.map.get(room);
        if (r) {
            for (var thing of r.contains) {
                if (typeof thing.id !== "undefined" && typeof this.id !== "undefined") {
                    if (thing.id === this.id) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    constructor() {
        this.contains = new Array();
        this.canInsertInto = false;
        this.canBeOpened = false;
        this.isClosed = true;
        this.canBeTurnedOn = false;
        this.isOn = false;
        this.canBeRead = false;
    }

}


function buildConversationSuggestions(parentState, parentNPC) {
    var d = `<p> [${game.playerNoun} can `;
    var i = 0;
    var len = parentState.topics.size - 1;
    for (var t of parentState.topics.keys()) {
        if (i === 0) {
            d = d + `@${t}`;
        }
        else if (i === (len)) {
            d = d + `. Or, ${game.playerNoun} can @${t}.] `;
        }
        else {
            d = d + `, or @${t}`;
        }
        i++;
    }
    return d;
}


class NPC extends Thing {

    name = ``;

    properNoun() {
        return `${this.name}`;
    }


    learnName(name) {
        this.name = name;
        this.properNoun = function() { return `${this.name}`; }
    }


    noun() {
        var n = this.properNoun();
        if (n) {
            return n;
        }
        return `${this.id}`;
    }

    focus() {
        var s = this.getState();
        if (s) {
            var focus = s.focus();
            if (focus) {
                return focus;
            }
        }
        return `${this.pronoun()} doesn't appear to be all the interested in ${game.playerNoun} right now.`;
    }

    desc() {
        const s = this.states.get(this.currentState);
        if (s) {
            const t = s.desc(s, this);
            if (t) {
                return t;
            }
        }
        return ``;
    }

    pronoun() {
        if (this.gender === `him`) {
            return `he`;
        }
        if (this.gender === `her`) {
            return `she`;
        }
        return `it`;
    }

    possesive() {
        if (this.gender === `him`) {
            return `his`;
        }
        if (this.gender === `her`) {
            return `her`;
        }
        return `its`;
    }

    getState() {
        return this.states.get(this.currentState);
    }

    constructor() {
        super();
        this.states = new Map();
        this.gender = `her`;
        this.currentTopic = '';
        this.currentState = '';
        this.timesConversedWith = 0;
    }

}


class NPCState {

    hello(parentState, parentNPC) {
        return `"Hello."`;
    }

    bye(parentState, parentNPC) {
        return `"Bye."`;
    }

    getShuffledMessage(parentState, parentNPC) {
        var d = randomText(parentState.shuffledMessages);
        if (d) {
            if (typeof parentNPC.id !== "undefined") {
                const id = "$" + parentNPC.id;
                while (d.indexOf(id) > -1) {
                    const x = d.indexOf(id);
                    const len = parentNPC.id.length;
                    d = d.slice(0, x) + `${parentNPC.noun()}` + d.slice(x + len + 1, d.length);
                }
            }
            return d;
        }
        return ``;
    }

    addTopic(topic, obj) {
        var m = new Map();
        m.set(topic, obj);
        for (t of this.topics.keys()) {
            m.set(t, this.topics.get(t));
        }
        this.topics = m;
    }

    removeTopic(topic) {
        this.topics.delete(topic);
    }

    desc(parentState, parentNPC) {
        return ``;
    }

    focus() {
        beginConversation(this.id);
    }

    conversation(parentState, parentNPC) {
        var t = parentNPC.desc();
        t += buildConversationSuggestions(parentState, parentNPC);
        return t;
    }

    constructor() {
        this.topics = new Map();
        this.hasDiscussed = new Map();
        this.shuffledMessages = [];
    }

}


class Decoration extends Thing {

    decorationText = ``;

    focus() {
        return this.decorationText;
    }

}


function decorate(id, focus) {
    var d = new Decoration();
    d.id = id;
    d.decorationText = focus;
    return d;
}


class RoomExit extends Thing {

    linkToRoom = `For some reason, you can't seem to go that way.`;

    noun() {
        return `exit`;
    }

    exit() {
        return this.linkToRoom;
    }

}


function exitTo(id, room) {
    var r = new RoomExit();
    r.id = id;
    r.noun = function() { return id };
    r.linkToRoom = room;
    return r;
}


class Room {

    environmentalEffects = [];

    getThingById(str) {
        for (var t of this.contains) {
            if (t.id !== 'undefined') {
                if (t.id === str.trim()) {
                    return t;
                }
            }
        }
        return null;
    }


    removeThing(str) {
        for (var i = 0; i < this.contains.length; ++i) {
            if (this.contains[i].id === str) {
                this.contains.splice(i, 1);
                return;
            }
        }
    }


    display() {
        var d = this.desc();
        this.visited = true;
        return d;
    }    

    desc() {
        return `No room description yet.`;
    }

    constructor() {
        this.turns = 0;
        this.visited = false;
        this.contains = [];
    }

}
