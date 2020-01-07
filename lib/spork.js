
/*
 * The following functions are meant to be internal.
 * Of course, this is Javascript, you can call whatever you want.
 * But proceed with caution, and don't tamper with the code below,
 * unless you really REALLY know what you're doing.
 */


var game;
var __currentPlayer;
var __displayObjects = [];
var __currentNPCConversing = "";
var __currentConversingState = "";
var __currentConversingTopic = "";


function lookForBreaks(text) {
    var s = ``;
    var skip = false;
    const m = `&mdash;`;
    const b = `<br>&nbsp;<br>`;
    var text = text + ` `;
    var length = text.length;
    var i = 0;
    while (i < length) {
        if (text[i] === '<') {
            skip = true;
        }
        if (text[i] === '>') {
            skip = false;
        }
        if (text[i] === '~' && text[i + 1] === '~' && skip === false) {
            s = s + b;
            i++;
        }
        else if (text[i] === '-' && text[i + 1] === '-' && skip === false) {
            s = s + m;
            i++;
        }
        else {
            s = s + text[i];
        }
        i++;
    }
    return s;
}


function fixQuotes(str)
{
    var skipQuotes = false;
    var s = "";
    var text = lookForBreaks(str);
    var length = text.length;
    for (var i = 0; i < length; i++) {
        if (text[i] === '<') {
            skipQuotes = true;
        }
        if (text[i] === '>') {
            skipQuotes = false;
        }
        if (text[i] === '"' && skipQuotes === false) {
            var getNextChar = text[i + 1];
            if (getNextChar) {
                if (checkValidCharacter(getNextChar) === true) {
                    s = s + "&ldquo;";
                }
                else {
                    s = s + "&rdquo;";
                }
            }
        }
        else if (text[i] === "'" && skipQuotes === false) {
            var getNextChar = text[i - 1];
            if (checkValidCharacter(getNextChar) === true) {
                s = s + "&rsquo;"
            }
            else {
                s = s + "&lsquo;"
            }
        }
        else {
            s = s + text[i];
        }
    }
    return s;
}


function checkIfDigit(n) {
    var x = Number(n);
    if (x != NaN) {
        return Boolean([true, true, true, true, true, true, true, true, true, true][x]);
    }
    return false;
}


function checkIfLetter(char) {
    return (char.toUpperCase() != char.toLowerCase());
}


function checkValidCharacter(char) {
    if (char === `>`) {
        return false;
    }
    return char.trim() !== '';
}


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


function checkForParagraphIndents(text) {
    text = text.replace(/ __/g, "<p>");
    return text;
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
    else {
        const topics = getConversationTopics();
        if (topics) {
            const actions = document.getElementById("Actions");
            actions.innerHTML = fixQuotes(buildTopicsHTML(topics, __currentNPCConversing));
        }
    }
    const readout = document.getElementById("Readout");
    if (readout) {
        for (const d of __displayObjects) {
            text += d;
        }
        text = checkForParagraphIndents(text);
        text = addHyperLinks(roomName, text);
        text = handleStringCaps(text);
        text = fixQuotes(text);
        readout.innerHTML = text;
    }
    __displayObjects = [];
}


/*
function finishSetText()
{
    const e = document.getElementById("PlayScreen");
    setText();
    if (e) {
        e.style.animation = 'fadein 0.25s';
    }
}
*/


/*
function refresh()
{
    const e = document.getElementById("PlayScreen");
    if (e) {
        e.style.animation = 'fadeout 0.25s';
        window.setTimeout(function() { finishSetText(); }, 250);
    }
 }
 */


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


function getConversationTopics()
{
    if (game["characters"][__currentNPCConversing]) {
        dChr = game["characters"][__currentNPCConversing];
        if (dChr["states"]) {
            if (dChr.currentState) {
                const state = dChr.currentState;
                if (dChr["states"][state]) {
                    return dChr["states"][state];
                }
            }
        }
        if (dChr.topics) {
            return dChr.topics;
        }
    }
    return null;
}


function buildTopicsHTML(topics, name) {
    const openTag = `<a href="javascript:void(0);" onclick="handleTopic(`;
    const closeTag = `</li></a>`;
    var r = `<ul>`;
    const hidden = topics.__hidden;
    topics = Object.keys(topics);
    const len = topics.length - 1;
    for (const topic of topics) {
        if (!hidden[topic] && topic.indexOf("__") != 0) {
            r += `${openTag}'${name}', '${topic}');"><li>${topic}${closeTag}`;
        }
    }
    return `${r}</ul>`;
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
                    const len = k.length;
                    const x = d.indexOf(`$${k}`);
                    const y = x + len + 1;
                    const noun = getNoun(catagory, k);
                    if (__currentNPCConversing !== k) {
                        d = `${d.slice(0, x)}${startTag}Click('${catagory}','${roomName}','${k}');">${noun}</a>${d.slice(y, d.length)}`;
                    }
                    else {
                        d = `${d.slice(0, x)}${noun}${d.slice(x + len + 1, d.length)}`;
                    }
                }
            }
        }
    }
    if (game["rooms"][roomName]["decorations"]) {
        for (const noun of Object.keys(game["rooms"][roomName]["decorations"])) {
            while (d.indexOf(`$${noun}`) > -1) {
                const x = d.indexOf(`$${noun}`);
                const len = noun.length;
                d = `${d.slice(0, x)}${startTag}Decorator('${noun}', '${roomName}');">${noun}</a>${d.slice(x + len + 1, d.length)}`;
            }
        }
    }
    if (game["rooms"][roomName]["exits"]) {
        for (const noun of Object.keys(game["rooms"][roomName]["exits"])) {
            while (d.indexOf(`$${noun}`) > -1) {
                const x = d.indexOf(`$${noun}`);
                const len = noun.length;
                d = `${d.slice(0, x)}${startTag}Exit('${noun}', '${roomName}');">${noun}</a>${d.slice(x + len + 1, d.length)}`;
            }
        }
    }
    return d;
}


function handleDecorator(noun, roomName) {
    const desc = game["rooms"][roomName]["decorations"][noun]();
    msg(desc);
    refresh();
}


function handleExit(noun, roomName) {
    const e = game["rooms"][roomName]["exits"][noun];
    if (e) {
        if (e.room) {
            moveCharacterToRoom(__currentPlayer, e.room);
        }
        if (e.desc) {
            msg(e.desc);
        }
    }
    refresh();
}


function handleTopic(name, topic) {
    var obj = game.characters[name];
    var topics;
    if (obj) {
        if (obj.states && obj.currentState) {
            topics = obj["states"][obj.currentState];
            __currentConversingState = obj.currentState;
        }
        else {
            topics = obj.topics;
        }
        __currentConversingTopic = topic;
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
        dObj = obj;
        var context = {
            catagory: catagory,
            container: container,
            name: name,
            it: obj
        };
        if (catagory === "characters" && obj.hello) {
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


function checkGame() {
    const catagories = ["things", "characters"];
    for (const catagory of catagories) {
        var names = {};
        for (const room of Object.keys(Game.rooms)) {
            if (Game["rooms"][room][catagory]) {
                for (const name of Game["rooms"][room][catagory]) {
                    if (!names[name]) {
                        names[name] = room;
                    }
                    else {
                        const e = `Duplication of name: catagory ${catagory} ${name} in rooms: ${names[name]} and ${room}`;
                        alert(e);
                        throw e;
                    }
                }
            }
        }
    }
}


function buildConversationSchema() {
    for (const c of Object.keys(game.characters)) {
        if (game.characters[c].topics) {
            if (!game.characters[c].topics.__hidden) {
                game.characters[c].topics.__hidden = {};
            }
        }
        if (game.characters[c].states) {
            for (const s of Object.keys(game.characters[c].states)) {
                if (!game.characters[c].states[s].__hidden) {
                    game.characters[c].states[s].__hidden = {};
                }
            }
        }
    }
}


function startGame() {
    window.addEventListener("orientationchange", function() {
        //refreshScreen();
    });
    checkGame();
    restartGame();
    refresh();
}


