
var game;
var __currentPlayer;
var __displayObjects = [];
var __currentNPCConversing = "";


function parseTextToDisplayObject(text) {
    switch (typeof text) {
        case "function":
            return text();
        case "object":
            if (Array.isArray(text)) {
                return text.join("");
            }
            return "";
        default:
            return text;
    }
}


function msg(text) {
    const parsedText = parseTextToDisplayObject(text);
    __displayObjects.push(parsedText);
}


function checkIfLetter(char) {
    return (char.toUpperCase() != char.toLowerCase());
}


function showNextButton() {
    const nextButtonElement = document.getElementById("Next-Button");
    nextButtonElement.innerHTML = `<p><button type="submit" id="Next-Button" onclick="refresh();">➞</button></p>`;
}


function hideNextButton() {
    const nextButtonElement = document.getElementById("Next-Button");
    nextButtonElement.innerHTML = ``;
}


function hideActions() {
    const actionsElement = document.getElementById("Actions");
    actionsElement.innerHTML = ``;
}


function handleStringCaps(text) {
    var v = ``;
    var text = text + ` `;
    var length = text.length;
    var i = 0;
    var skip = false;
    var readyToCap = true;
    while (i < length) {
        if (text[i] === '<') {
            skip = true;
        }
        if (text[i] === '>') {
            skip = false;
        }
        if (skip === false) {
            var c = text[i];
            if (c === `.` || c === `!` || c === `?`) {
                if (text[i + 1] !== '"') {
                    readyToCap = true;
                }
                v = v + c;
            }
            else if (readyToCap === true && checkIfLetter(c)) {
                v = v + c.toUpperCase();
                readyToCap = false;
            }
            else {
                v = v + c;
            }
        }
        else {
            v = v + text[i];
        }
        i++;
    }
    return v;
}


function getSpecialDescriptions(roomName)
{
    const catagories = ["things", "characters", "scenery"];
    for (const catagory of catagories) {
        if (game["rooms"][roomName][catagory]) {
            for (const k of game["rooms"][roomName][catagory]) {
                if (game[catagory][k].desc) {
                    const t = `<p>${parseTextToDisplayObject(game[catagory][k].desc)}</p>`;
                    msg(t);
                }
            }
        }
    }
}


function refresh() {
    var text = ``;
    const roomName = getRoomOfCharacter(__currentPlayer);
    const currentRoom = game["rooms"][roomName];
    hideNextButton();
    hideActions();   
    if (__displayObjects.length === 0) {
        msg(currentRoom.desc);
        getSpecialDescriptions(roomName);
    }
    else if (__currentNPCConversing === ``) {
        showNextButton();
    }
    const readout = document.getElementById("Readout");
    if (readout) {
        for (const d of __displayObjects) {
            text += d;
        }
        text = addHyperLinks(roomName, text);
        text = handleStringCaps(text);
        readout.innerHTML = text;
    }
    __displayObjects = [];
}


function getNoun(catagory, name) {
    var noun = name;
    if (game[catagory][name]) {
        var p = game[catagory][name];
        if (p) {
            if (p.properNoun) {
                if (typeof p.properNoun === "function") {
                    noun = p.properNoun();
                }
                else {
                    noun = p.properNoun;
                }
            } else if (p.noun) {
                if (typeof p.noun === "function") {
                    noun = p.noun();
                }
                else {
                    noun = p.noun;
                }
            }
        }
    }
    return noun;
}


function addHyperLinks(roomName, d)
{
    const startTag = `<a href="javascript:void(0);" onclick="handle`;
    const catagories = ["things", "characters", "scenery"];
    for (const catagory of catagories) {
        if (game["rooms"][roomName][catagory]) {
            for (const k of game["rooms"][roomName][catagory]) {
                while (d.indexOf(`$${k}`) > -1) {
                    const x = d.indexOf(`$${k}`);
                    const len = k.length;
                    const noun = getNoun(catagory, k);
                    if (__currentNPCConversing !== k) {
                        d = d.slice(0, x) + startTag + `Click('${catagory}','${roomName}','${k}');">${noun}</a>` + d.slice(x + len + 1, d.length);
                    }
                    else {
                        d = d.slice(0, x) + `${noun}` + d.slice(x + len + 1, d.length);
                    }
                }
            }
        }
    }
    if (game["rooms"][roomName]["decorations"]) {
        for (const [noun, desc] of game["rooms"][roomName]["decorations"]) {
            while (d.indexOf(`$${noun}`) > -1) {
                const x = d.indexOf(`$${noun}`);
                const len = noun.length;
                d = d.slice(0, x) + startTag + `Decorator('${noun}','${desc}');">${noun}</a>` + d.slice(x + len + 1, d.length);
            }
        }
    }
    return d;
}

function handleDecorator(noun, desc) {
    msg(desc);
    refresh();
}


function handleTopic(name, topic) {
    var obj = game.characters[name];
    var topics;
    if (obj) {
        if (obj.states && obj.currentState) {
            topics = obj.states[obj.currentState];
        }
        else {
            topics = obj.topics;
        }
        const c = topics[topic]();
        if (c) {
            msg(c);
            refresh();
        }
    }
}


function handleAction(catagory, name, action) {
    var obj = game[catagory][name];
    if (obj) {
        const c = obj.actions[action]();
        if (c) {
            msg(c);
            refresh();
        }
    }
}


function handleClick(catagory, container, name) {
    var obj = game[catagory][name];
    if (obj) {
        var context = {
            catagory: catagory,
            container: container,
            name: name,
            it: obj
        };
        if (obj.hello) {
            const c = obj.hello(context);
            if (c) {
                __currentNPCConversing = name;
                msg(c);
                refresh();
                return;
            }
        }
        if (obj.click) {
            const c = obj.click(context);
            if (c) {
                msg(c);
                refresh();
            }
            if (obj.actions) {
                const actionsHTML = buildActionsHTML(catagory, obj.actions, name);
                const actionsElement = document.getElementById("Actions");
                actionsElement.innerHTML = handleStringCaps(actionsHTML);
            }
        }
    }
}


function deleteCharacter(character)
{
    const oldRoom = getRoomOfCharacter(character);
    if (game["rooms"][oldRoom].characters) {
        const index = game["rooms"][oldRoom].characters.indexOf(character);
        game["rooms"][oldRoom].characters.splice(index, 1);
    }
}


function putCharacterInRoom(character, room)
{
    if (game["rooms"][room]) {
        if (!game["rooms"][room]["characters"]) {
            game["rooms"][room]["characters"] = [];
        }
        game["rooms"][room]["characters"].push(character);
    }
}


function silentMoveCharacterToRoom(character, room)
{
    deleteCharacter(character);
    putCharacterInRoom(character, room);
}


function moveCharacterToRoom(character, room)
{
    const obj = game["characters"][character];
    if (obj.moveMessage) {
        obj.moveMessage(room);
    }
    silentMoveCharacterToRoom(character, room);
}


function deleteThing(thing)
{
    const oldRoom = getRoomOfThing(thing);
    if (game["rooms"][oldRoom].things) {
        const index = game["rooms"][oldRoom].things.indexOf(thing);
        game["rooms"][oldRoom].things.splice(index, 1);
    }
}


function putThingInRoom(thing, room)
{
    if (game["rooms"][room]) {
        if (!game["rooms"][room]["things"]) {
            game["rooms"][room]["things"] = [];
        }
        game["rooms"][room]["things"].push(thing);
    }
}


function silentMoveThingToRoom(thing, room)
{
    deleteThing(thing);
    putThingInRoom(thing, room);
}


function moveThingToRoom(thing, room)
{
    const obj = game["things"][thing];
    if (obj.moveMessage) {
        obj.moveMessage(room);
    }
    silentMoveThingToRoom(thing, room);
}


function getRoomOfThing(t) {
    const rooms = game["rooms"];
    for (const [name, data] of Object.entries(rooms)) {
        if (data.thing) {
            if (data.thing.indexOf(t) > -1) {
                return name;
            }
        }
    }
    return '';
}


function getRoomOfCharacter(c) {
    const rooms = game["rooms"];
    for (const [name, data] of Object.entries(rooms)) {
        if (data.characters) {
            if (data.characters.indexOf(c) > -1) {
                return name;
            }
        }
    }
    return '';
}


function restartGame() {
    const m = Object.create(metaInfo);
    document.title = m.title;
    __currentPlayer = m.startingPlayer;
    __currentNPCConversing = "";
    game = Object.create(Game);
}


function startGame() {
    window.addEventListener("orientationchange", function() {
        //refreshScreen();
    });
    restartGame();
    refresh();
}


