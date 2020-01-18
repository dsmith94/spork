/*
 * NPC functions
 *
 * NPCs are far and away the most complicated
 * feature of this program, so there's a lot
 * here to manage, mostly around conversations.
 */

 
/* Reference to direct character, or the NPC we're performing actions on. */
var dChr;


/*
 * endConversation()
 *
 * Terminate current NPC conversation
 * and return to normal game mode.
 */
function endConversation() {
    setNPCConversation('');
}


/*
 * beginConversation(npcName)
 *
 * Begin conversation with given npc.
 */
function beginConversation(npcName) {
    const obj = game["characters"][npcName];
    if (obj) {
        const context = {
            name: npcName,
            it: obj
        };
        if (obj.hello) {
            dChr = obj;
            const c = parseTextToDisplayObject(obj.hello(context));
            if (c) {
                setNPCConversation(npcName)
                msg(`<p>${c}`);
                refresh();
            }
        }
    }
}


/*
 * setNPCstate(character, state)
 *
 * Set current NPC state. This function assumes that
 * you're using a STATEful NPC, so it will crash the
 * game if you use it on a simple NPC.
 */
function setNPCstate(character, state)
{
    game["characters"][character].currentState = state;
}


function setState(state)
{
    dChr.currentState = state;
}


/*
 * getNPCstate(character, state)
 *
 * Returns current NPC state. This function assumes that
 * you're using a STATEful NPC, so it will crash the
 * game if you use it on a simple NPC.
 */
function getNPCstate(character, state)
{
    return game["characters"][character].currentState;
}


/*
 * showTopic(character, state, topic)
 *
 * Shows a previously hidden topic. By default, at game start,
 * all topics are shown.
 */
function showTopic(character, state, topic)
{
    if (state) {
        game["characters"][character]["states"][state]["__hidden"][topic] = false;
    }
    else {
        game["characters"][character]["topics"]["__hidden"][topic] = false;
    }
}


/*
 * hideNPCTopic(character, state, topic)
 *
 * Hides a topic. It still exists, but will no longer be shown
 * on NPC topic lists.
 */
function hideNPCTopic(character, state, topic)
{
    if (state) {
        game["characters"][character]["states"][state]["__hidden"][topic] = true;
    }
    else {
        game["characters"][character]["topics"]["__hidden"][topic] = true;
    }
}


/*
 * hideTopic()
 *
 * Hides the topic current active. Can be used to prevent
 * one topic from being selected over and over.
 */
function hideTopic()
{
    hideNPCTopic(__currentNPCConversing, __currentConversingState, __currentConversingTopic);
}


/*
 * deleteTopic(character, state, topic)
 *
 * Permanently deletes topic. This action cannot
 * be undone, so hiding topics is preferred.
 */
function deleteTopic(character, state, topic)
{
    if (state) {
        delete game["characters"][character]["states"][state][topic];
    }
    else {
        delete game["characters"][character]["topics"][topic];
    }
    
}


/*
 * deleteCurrentTopic()
 *
 * Permanently deletes current topic. This action cannot
 * be undone, so hiding topics is preferred.
 */
function deleteCurrentTopic()
{
    deleteTopic(__currentNPCConversing, __currentConversingState, __currentConversingTopic);
}


/* 
 * silentMoveCharacterToRoom(character, room)
 *
 * Move the character into a room, without firing the
 * movement messages of the thing.
 */
function silentMoveCharacterToRoom(character, room)
{
    if (game["rooms"][room]) {
        game["characters"][character].in = room;
    }
}


/*
 * moveCharacterToRoom(thing, room)
 *
 * Move thing into room, firing off the appropriate
 * movement message of thing.
 */
function moveCharacterToRoom(character, room)
{
    const obj = game["characters"][character];
    if (obj.moveMessage) {
        obj.moveMessage(room);
    }
    silentMoveCharacterToRoom(character, room);
}


/*
 * getRoomOfCharacter(t)
 *
 * Get current location room of character, as string.
 */
function getRoomOfCharacter(c) {
    return game["characters"][c].in;
}

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
var __transitionText = "";


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


function handleHeadingTags(str) {
    for (let i = 6; i > 0; i--) {
        const pounds = '#'.repeat(i);
        const re = new RegExp(pounds + ' .*', 'g');
        const matches = str.match(re);
        if (matches) {
            for (const s of matches) {
                const finalString = s.replace(/#/g, "");
                str = str.replace(s, `<h${i}>${finalString}</h${i}>`);
            }
        }
    }
    return str;
}


function handleItalicsTags(str) {
    const patterns = [
        [/_.+_/, '_'], 
        [/\*.+\*/, '\\*']
    ];
    for (pattern of patterns) {
        const [re, symbol] = pattern;
        const matches = str.match(re);
        if (matches) {
            for (const s of matches) {
                if (s !== "___") {
                    const replacePattern = new RegExp(symbol, 'g');
                    const finalString = s.replace(replacePattern, "");
                    str = str.replace(s, `<i>${finalString}</i>`);
                }
            }
        }
    }
    return str;
}


function handleBoldTags(str) {
    const matches = str.match(/\*\*.*\*\*/g);
    if (matches) {
        for (const s of matches) {
            const finalString = s.replace(/\*\*/g, "");
            str = str.replace(s, `<b>${finalString}</b>`);
        }
    }
    return str;
}


function handleRuleTags(str) {
    const patterns = [/\n\s*___/g, /\n\s*\*\*\*/g, /\n\s*\_\_\_/g];
    for (pattern of patterns) {
        const matches = str.match(pattern);
        if (matches) {
            for (const s of matches) {
                str = str.replace(s, `<hr />`);
            }
        }
    }
    return str;
}


function handleLongDashTags(str) {
    const matches = str.match(/--/g);
    if (matches) {
        for (const s of matches) {
            str = str.replace(s, `&mdash;`);
        }
    }
    return str;
}


function handleBlockQuotes(str) {
    str = str.split(/\n/);
    let text = ``;
    let inBlockQuote = false;
    for (line of str) {
        if (line.trim().slice(0, 2) === "> ") {
            if (inBlockQuote === false) {
                text += "<blockquote>";
            }
            inBlockQuote = true;
            text += line.trim().slice(2, line.length) + '<br />';
        } else {
            if (inBlockQuote === true) {
                text += "</blockquote>";
                inBlockQuote = false;
            }
            text += line + '\n';
        }
    }
    return text;
}


function addParagraphs(str) {
    return str.replace(/\n\s*\n/g, '<p>');
}


function checkIfDigit(n) {
    var x = Number(n);
    if (x != NaN) {
        return Boolean([true, true, true, true, true, true, true, true, true, true][x]);
    }
    return false;
}


function setNPCConversation(npcName)
{
    __currentNPCConversing = npcName;
}


function setRoomTransition(text)
{
    __transitionText = parseTextToDisplayObject(text);
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


function refresh() {
    var text = ``;
    const roomName = getRoomOfCharacter(__currentPlayer);
    const currentRoom = game["rooms"][roomName];
    hideNextButton();
    hideActions();
    if (__currentNPCConversing === '') {
        if (__displayObjects.length === 0) {
            if (__transitionText) {
                msg(`<p>${__transitionText}`);
                __transitionText = ``;
            }
            const t = parseTextToDisplayObject(currentRoom.text);
            msg(`<p>${t}`);
            getSpecialDescriptions(roomName);
        }
        else {
            showNextButton();
        }
    }
    else {
        if (__displayObjects.length === 0) {
            const t = parseTextToDisplayObject(game["characters"][__currentNPCConversing].desc);
            msg(`<p>${t}`);
        }
        const topics = getConversationTopics();
        if (topics) {
            const actions = document.getElementById("Actions");
            actions.innerHTML = buildTopicsHTML(topics, __currentNPCConversing);
        }
    }
    const readout = document.getElementById("Readout");
    if (readout) {
        for (const d of __displayObjects) {
            text += d;
        }
        text = handleHeadingTags(text);
        text = handleBoldTags(text);
        text = handleItalicsTags(text);
        text = handleRuleTags(text);
        text = handleBlockQuotes(text);
        text = handleStringCaps(text);
        text = addParagraphs(text);
        text = addHyperLinks(roomName, text);
        text = handleLongDashTags(text);
        text = fixQuotes(text);
        readout.innerHTML = text;
    }
    __displayObjects = [];
    if (__currentNPCConversing === '' && dChr !== '') {
        dChr = null;
    }
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
    var inAmperstand = false;
    while (i < length) {
        if (text[i] === '&') {
            inAmperstand = true;
        }
        if (text[i] === ';') {
            inAmperstand = false;
        }
        if (text[i] === '<') {
            skip = true;
        }
        if (text[i] === '>') {
            skip = false;
        }
        if (skip === false && inAmperstand === false) {
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
        if (game[catagory]) {
            for (const k of Object.keys(game[catagory])) {
                if (game[catagory][k].in === roomName) {
                    if (game[catagory][k].text) {
                        const t = `<p>${parseTextToDisplayObject(game[catagory][k].text)}</p>`;
                        msg(t);
                    }
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


function determineTopicShow(response) {
    if (typeof response === "function") {
        return true;
    }
    if (typeof response === "string") {
        return true;
    }
    if (typeof response === "object") {
        if (typeof response.shown === "function") {
            if (response.shown()) {
                return true;
            }
        } else {
            if (response.shown) {
                return true;
            }
            return false;
        }
    }
    return false;
}


function buildTopicsHTML(topics, name) {
    const openTag = `<a href="javascript:void(0);" onclick="handleTopic(`;
    const closeTag = `</li></a>`;
    var r = `<ul>`;
    for (const [topic, response] of Object.entries(topics)) {
        if (determineTopicShow(response)) {
            r += `${openTag}\`${name}\`, \`${topic}\`);"><li>${topic}${closeTag}`;
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
    const catagories = ["things", "characters"];
    for (const catagory of catagories) {
        if (game[catagory]) {
            for (const k of Object.keys(game[catagory])) {
                if (game[catagory][k].in === roomName) {
                    const x = d.indexOf(`$${k}`);
                    if (x > -1) {
                        const len = k.length;
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
    if (game["scenery"]) {
        for (const noun of Object.keys(game["scenery"])) {
            while (d.indexOf(`$${noun}`) > -1) {
                const x = d.indexOf(`$${noun}`);
                const len = noun.length;
                const label = getNoun("scenery", noun);
                d = `${d.slice(0, x)}${startTag}Click('scenery','${roomName}','${noun}');">${label}</a>${d.slice(x + len + 1, d.length)}`;
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
            if (e.preMove) {
                msg(e.preMove);
            }
            if (e.postMove) {
                setRoomTransition(e.postMove);
            }
            moveCharacterToRoom(__currentPlayer, e.room);
        }
        if (e.preventMove) {
            msg(e.preventMove);
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
        if (typeof topics[topic] === 'object') {
            const c = topics[topic];
            console.log(topic);
            const t = c.text();
            if (t) {
                msg(t);
            }
        } else {
            const c = topics[topic]();
            if (c) {
                msg(c);
            }
        }
        refresh();
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
            dChr = obj;
            const c = parseTextToDisplayObject(obj.hello(context));
            if (c) {
                setNPCConversation(name);
                msg(`<p>${c}`);
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


function checkNameDuplication() {
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


function checkLostNames() {
    const catagories = ["things", "characters", "scenery"];
    for (const catagory of catagories) {
        let names = Object.keys(Game[catagory]);
        for (const room of Object.keys(Game.rooms)) {
            if (Game["rooms"][room][catagory]) {
                let missing = Game["rooms"][room][catagory].filter(x => (!names.includes(x)));
                if (missing.length > 0) {
                    const e = `Missing name -- catagory ${catagory}:${missing[0]} in room: ${room}`;
                    alert(e);
                    throw e;
                }
            }
        }
    }
}


function checkGame() {
    //checkNameDuplication();
    //checkLostNames();
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



/*
 * Common thing helper functions
 */

/* current direct object, or thing we're performing actions on */
var dObj;


 /*
  * deleteThing(thing)
  *
  * Remove thing references from all rooms. Note that the
  * thing itself can be used in the game again, but it has
  * to be added back with a function like putThingInRoom.
  */
function deleteThing(thing)
{
    const oldRoom = getRoomOfThing(thing);
    if (game["rooms"][oldRoom].things) {
        const index = game["rooms"][oldRoom].things.indexOf(thing);
        game["rooms"][oldRoom].things.splice(index, 1);
    }
}


/*
 * putThingInRoom(thing, room)
 *
 * Put thing in room. Note that this could lead to
 * a thing named reference duplication. Usually,
 * you want moveThingToRoom to prevent that unwanted
 * behavior.
 */
function putThingInRoom(thing, room)
{
    if (game["rooms"][room]) {
        if (!game["rooms"][room]["things"]) {
            game["rooms"][room]["things"] = [];
        }
        game["rooms"][room]["things"].push(thing);
    }
}


/* 
 * silentMoveThingToRoom(thing, room)
 *
 * Move the thing into a room, without firing the
 * movement messages of the thing.
 */
function silentMoveThingToRoom(thing, room)
{
    deleteThing(thing);
    putThingInRoom(thing, room);
}


/*
 * moveThingToRoom(thing, room)
 *
 * Move thing into room, firing off the appropriate
 * movement message of thing.
 */
function moveThingToRoom(thing, room)
{
    const obj = game["things"][thing];
    if (obj.moveMessage) {
        obj.moveMessage(room);
    }
    silentMoveThingToRoom(thing, room);
}


/*
 * getRoomOfThing(t)
 *
 * Get current location room of thing, as string.
 */
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

/*
 * General purpose utilities
 */


 /*
  * restartGame()
  *
  * Call to set current game to starting state.
  * This function will do so instantly, and without
  * consulting the player, so use appropriately.
  */
function restartGame() {
    const m = Object.create(metaInfo);
    document.title = m.title;
    __currentPlayer = m.startingPlayer;
    __currentNPCConversing = "";
    __displayObjects = [];
    dObj = null;
    dChr = null;
    game = Object.create(Game);
    game.title = m.title;
    //buildConversationSchema();
}
