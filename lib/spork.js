
/*
 * The following functions are meant to be internal.
 * Of course, this is Javascript, you can call whatever you want.
 * But proceed with caution, and don't tamper with the code below,
 * unless you really REALLY know what you're doing.
 */


var game;
var __currentPlayer;
var __displayObjects = [];
var __toBeDisplayed = [];
var __currentNPCConversing = "";
var __currentConversingState = "";
var __currentConversingTopic = "";
var __transitionText = "";


function clickNextButton() {
    dObj = null;
    dNpc = null;
    refresh();
}


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
    return str.replace(/\n\s*\n/g, ' <p>');
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


function processText(container, text) {
    text = handleHeadingTags(text);
    text = handleBoldTags(text);
    text = handleItalicsTags(text);
    text = handleRuleTags(text);
    text = handleBlockQuotes(text);
    text = handleStringCaps(text);
    text = addParagraphs(text);
    text = addHyperLinks(container, text);
    text = handleLongDashTags(text);
    text = fixQuotes(text);
    return text;
}


function handleNormalMode(containerName) {
    const container = game["rooms"][containerName];
    if (__displayObjects.length === 0 && container) {
        if (__transitionText) {
            msg(`${__transitionText}`);
            __transitionText = ``;
        }
        const t = parseTextToDisplayObject(container.text);
        if (t) {
            msg(`${t}`);
        }
        getSpecialDescriptions(containerName);
    }
    else {
        showNextButton();
    }
}


function handleConversationMode() {
    const topics = getConversationTopics();
    if (topics) {
        return buildTopicsHTML(topics, __currentNPCConversing);
    }
    return ``;
}


function getDisplayContainer() {
    const player = game["characters"][__currentPlayer];
    return player.in;
}


function refresh() {
    $( "#Display" ).fadeOut( "fast", function() {
        let actions = ``;
        const containerName = getDisplayContainer();
        hideNextButton();
        if (__currentNPCConversing === '') {
            handleNormalMode(containerName);
            if (dObj) {
                if (dObj.actions) {
                    actions = buildActionsHTML(dObj.__catagory, dObj.actions, dObj.__name);
                }
            }
        } else {
            actions = handleConversationMode();
        }
        $( "#Display" ).html(processText(containerName, __displayObjects.join(" ")) + actions);
        __displayObjects = [];
        $( "#Display" ).fadeIn( "fast" );
    });
}


function showNextButton() {
    $( "#Next-Button" ).fadeOut( "fast", function() {
        $( "#Next-Button" ).html(`<p><button type="submit" id="Next-Button" onclick="clickNextButton();">➞</button></p>`);
        $( "#Next-Button" ).fadeIn( "fast" );
    }); 
}


function hideNextButton() {
    $( "#Next-Button" ).fadeOut( "fast", function() {
        $( "#Next-Button" ).html(``);
    }); 
}


function hideActions() {
    $( "#Actions" ).html(``);
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


function getSpecialDescriptions(containerName)
{
    const catagories = ["things", "characters", "scenery"];
    for (const catagory of catagories) {
        if (game[catagory]) {
            for (const k of Object.keys(game[catagory])) {
                if (game[catagory][k].in === containerName) {
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
        dNpc = game["characters"][__currentNPCConversing];
        if (dNpc["states"]) {
            if (dNpc.currentState) {
                const state = dNpc.currentState;
                if (dNpc["states"][state]) {
                    return dNpc["states"][state];
                }
            }
        }
        if (dNpc.topics) {
            return dNpc.topics;
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
            if (response.shown === true) {
                return true;
            } else if (response.shown === false) {
                return false;
            }
            return true;
        }
    }
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


function addHyperLinks(containerName, d)
{
    const startTag = `<a href="javascript:void(0);" onclick="handle`;
    const catagories = ["things", "characters"];
    for (const catagory of catagories) {
        if (game[catagory]) {
            for (const k of Object.keys(game[catagory])) {
                if (game[catagory][k].in === containerName) {
                    const x = d.indexOf(`$${k}`);
                    if (x > -1) {
                        const len = k.length;
                        const y = x + len + 1;
                        const noun = getNoun(catagory, k);
                        if (__currentNPCConversing !== k) {
                            d = `${d.slice(0, x)}${startTag}Click('${catagory}','${k}');">${noun}</a>${d.slice(y, d.length)}`;
                        }
                        else {
                            d = `${d.slice(0, x)}${noun}${d.slice(x + len + 1, d.length)}`;
                        }
                    }
                }
            }
        }
    }
    if (game["rooms"][containerName]["decorations"]) {
        for (const noun of Object.keys(game["rooms"][containerName]["decorations"])) {
            while (d.indexOf(`$${noun}`) > -1) {
                const x = d.indexOf(`$${noun}`);
                const len = noun.length;
                d = `${d.slice(0, x)}${startTag}Decorator('${noun}', '${containerName}');">${noun}</a>${d.slice(x + len + 1, d.length)}`;
            }
        }
    }
    if (game["scenery"]) {
        for (const noun of Object.keys(game["scenery"])) {
            while (d.indexOf(`$${noun}`) > -1) {
                const x = d.indexOf(`$${noun}`);
                const len = noun.length;
                const label = getNoun("scenery", noun);
                d = `${d.slice(0, x)}${startTag}Click('scenery','${noun}');">${label}</a>${d.slice(x + len + 1, d.length)}`;
            }
        }
    }
    if (game["rooms"][containerName]["links"]) {
        for (const noun of Object.keys(game["rooms"][containerName]["links"])) {
            while (d.indexOf(`$${noun}`) > -1) {
                const x = d.indexOf(`$${noun}`);
                const len = noun.length;
                d = `${d.slice(0, x)}${startTag}Link('${noun}', '${containerName}');">${noun}</a>${d.slice(x + len + 1, d.length)}`;
            }
        }
    }
    return d;
}


function handleDecorator(noun, roomName) {
    const text = game["rooms"][roomName]["decorations"][noun]();
    msg(text);
    refresh();
}


function handleLink(noun, roomName) {
    const e = game["rooms"][roomName]["links"][noun];
    if (e) {
        if (e.room) {
            if (e.preMove) {
                msg(e.preMove);
            }
            if (e.postMove) {
                setRoomTransition(e.postMove + '<p>');
            }
            moveNpcToRoom(__currentPlayer, e.room);
        }
        if (e.preventMove) {
            msg(e.preventMove);
        }
    }
    refresh();
}


function handleTopic(name, topic) {
    const obj = game.characters[name];
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
        const response = topics[topic];
        if (typeof response === 'object') {
            dTop = response;
            let t = ``;
            if (typeof dTop.text === 'function') {
                t = dTop.text();
            } else {
                t = dTop.text;
            }
            if (t) {
                msg(t);
            }
            if (response.nextState) {
                setState(response.nextState);
            } else if (response.nextState === '') {
                endConversation();
            }
        } else if (typeof response === 'function') {
            const c = response();
            if (c) {
                msg(c);
            }
        } else {
            if (response) {
                msg(response);
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


function handleClick(catagory, name) {
    var obj = game[catagory][name];
    if (obj) {
        dObj = obj;
        dObj.__catagory = catagory;
        dObj.__name = name;
        var context = {
            catagory: catagory,
            name: name,
            it: obj
        };
        if (catagory === "characters" && obj.hello) {
            beginConversation(name);
        }
        else if (obj.click) {
            const c = obj.click(context);
            if (c) {
                msg(c);
            }
        }
        refresh();
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


function startGame() {
    window.addEventListener("orientationchange", function() {
        refresh();
    });
    restartGame();
    refresh();
}

