
var game;
var nextButtonVisible = false;
var skipNextMenuClose = false;


function setStyleSheet(url, filename) {
    const e = document.getElementById(filename);
    skipNextMenuClose = true;
    if (e) {
        e.href = url;
    }
}


function setCrt(value) {
    const e = document.getElementById("PlayScreen");
    skipNextMenuClose = true;
    if (e) {
        if (value) {
            e.className = `crt`;
        }
        else {
            e.className = ``;
        }
    }
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


function applyEmphasis(text) {
    return `<div class="emphasis">${text}</div>`;
}


function getIndexOf(str, chr, occ) {
    var k = 0;
    for (var i = 0; i < str.length; ++i) {
        if (str.charAt(i) === chr) {
            k++;
        }
        if (k === occ) {
            return i;
        }
    }
    return 0;
}


function applyDropCaps(text) {
    var firstLetter;
    var remainingText;
    if (text.charAt(0) === `"` || text.charAt(0) === `'`) {
        firstLetter = `${text.charAt(1)}`;
        remainingText = text.slice(2);
    }
    else {
        firstLetter = text.charAt(0);
        remainingText = text.slice(1);
    }
    const i = getIndexOf(remainingText, ` `, 3);
    if (i) {
        remainingText = `<span class="smallCaps">` + remainingText.slice(0, i) + `</span>` + remainingText.slice(i);
    }
    text = `<span class="drop">${firstLetter}</span>${remainingText}`;
    return text;
}


function addNextButton() {
    const e = document.getElementById('Actions');
    if (e && nextButtonVisible === false) {
        game.mode = "normal";
        e.innerHTML += `<p><button type="submit" id="Next-Button" onclick="showRoom();">➞</button></p>`;
        nextButtonVisible = true;
    }
}


function finishSetText(text) {
    const e = document.getElementById("Readout");
    text = applyDropCaps(text);
    if (e) {
        e.style.animation = 'fadein 0.25s';
        e.innerHTML = fixQuotes(text);
    }
    const h = document.getElementById("Page-header");
    const r = document.getElementById("Readout").offsetHeight;
    const f = document.getElementById("Page-footer");
    var t = ``;
    if (game.mode === "normal") {
        t = game.buildFooterText();
    }
    h.innerHTML = `<span style="text-decoration-line: underline;">${versionInfo.title}</span><br /><hr class="blurMe" />`
    if (r < (window.innerHeight * 0.75)) {
        f.innerHTML = `<hr id="Page-hr" /><br />${t}`;
    }
    else {
        f.innerHTML = `<br /><hr /><br />${t}`;
    }
}


function finishActionAnimation(e) {
    e.style.opacity = 1;
}


function handleTopic(topic) {
    var d = ``;
    var npcs = [];
    var things = game.currentRoom.contains;
    if (things) {
        for (t of things) {
            if (typeof t.states !== "undefined") {
                npcs.push(t);
            }
        }
    }
    npcs.sort(function(a, b) { return a.priority - b.priority; });
    for (n of npcs) {
        n.currentTopic = topic;
        var s = n.getState();
        if (s) {
            var t = s.topics.get(topic);
            if (typeof t === "string") {
               d = d + t;
            }
            else if (typeof t === "function") {
                var f = t(s, n);
                if (f) {
                    d = d + f;
                }
            }
        }
        n.currentTopic = '';
    }
    addDisplayMessage(d);
    showRoom();
}


function beginConversation(npc) {
    var t = getThing(npc);
    if (t) {
        t.currentTopic = '';
        t.timesConversedWith++;
        var s = t.getState();
        if (s) {
            game.currentNPCConversing = npc;
            var c = s.hello(s, t);
            if (c) {
                addDisplayMessage(c);
            }
        }
    }
}


function endConversation() {
    var n = game.currentNPCConversing;
    var t = getThing(n);
    if (t) {
        var s = t.getState();
        if (s) {
            var c = s.bye(s, t);
            if (c) {
                addDisplayMessage(c);
            }
        }
    }
    game.currentNPCConversing = '';
}


function clearActionsPane()
{
    const e = document.getElementById('Actions');
    if (e) {
        e.innerHTML = ``;
    }
    nextButtonVisible = false;
}


function showRoom() {
    var d = ``;
    game.turns += 1;
    game.currentRoom.turns += 1;
    if (game.messages.length > 0) {
        d = game.messages.pop();
        addNextButton();
    }
    else if (game.currentNPCConversing) {
        var n = game.currentNPCConversing;
        var t = getThing(n);
        if (t) {
            var s = t.getState();
            if (s) {
                var c = s.conversation(s, t);
                if (c) {
                    d = d + c;
                    clearActionsPane();
                }
            }
        }
    }
    else {
        d = game.currentRoom.display();
        clearActionsPane();
    }
    for (const e of game.environmentalMessages) {
        d = d + ` <p> ` + e + `</p>`;
    }
    game.environmentalMessages = [];
    if (game.currentRoom.environmentalEffects.length) {
        if (!rng(5) && game.mode === "normal") {
            d = d + ` <p> ` + randomText(game.currentRoom.environmentalEffects) + `</p>`;
        }
    }
    var things = game.currentRoom.contains;
    if (things) {
        for (var thing of things) {
            if (typeof thing.id !== "undefined") {
                while (d.indexOf(`$${thing.id}`) > -1) {
                    const x = d.indexOf(`$${thing.id}`);
                    const len = thing.id.length;
                    if (game.currentNPCConversing !== thing.id) {
                        d = d.slice(0, x) +
                        `<a href="javascript:void(0);" onclick="handleThingFocus('${thing.id}');">${thing.noun()}</a>` +
                        d.slice(x + len + 1, d.length);
                    }
                    else {
                        d = d.slice(0, x) + `${thing.noun()}` + d.slice(x + len + 1, d.length);
                    }
                }
            }
            if (typeof thing.states !== 'undefined') {
                var state = thing.getState();
                if (state) {
                    if (!rng(5) && game.mode === "normal") {
                        d = d + ` <p> ` + state.getShuffledMessage(state, thing) + `</p>`;
                    }
                    var topics = state.topics.keys();
                    if (topics) {
                        for (var topic of topics) {
                            while (d.indexOf(`@${topic}`) > -1) {
                                const x = d.indexOf(`@${topic}`);
                                const len = topic.length;
                                d = d.slice(0, x) +
                                `<a href="javascript:void(0);" onclick="handleTopic('${topic}');">${topic}</a>` +
                                d.slice(x + len + 1, d.length);
                            }
                        }
                    }
                }
            }
        }
    }
    setText(d);
}


function getThing(id) {
    var things = game.currentRoom.contains;
    if (things) {
        for (t of things) {
            if (t.id === id) {
                return t;
            }
        }
    }
    return null;
}


function setText(text) {
    const e = document.getElementById("Readout");
    const a = document.getElementById("Actions");
    if (e) {
        var t = handleStringCaps(text);
        e.style.animation = 'fadeout 0.25s';
        window.setTimeout(function() { finishSetText(t); }, 250);
    }
    if (a) {
        a.style.opacity = 0;
        window.setTimeout(function() { finishActionAnimation(a); }, 505);
    }
}


function buildActionsHTML(id, actions) {
    var r = ``;
    const openTag = `<a href="javascript:void(0);" onclick="handleThingAction(`;
    const closeTag = `</a>`;
    var thing = game.currentRoom.getThingById(id);
    if (id && actions && thing) {
        if (actions.length === 0) {
            return ``;
        }
        const len = actions.length - 1;
        r = `<p> [${game.playerNoun} can `;
        if (actions.constructor.name === "Array") {
            var i = 0;
            for (const a of actions) {
                const t = `${openTag}'${id}', '${a.executeFunction}');">${a.verb()}${closeTag}`;
                if (i === 0) {
                    r = r + `${t}`;
                    if (i === len) {
                        r = r + ` ${thing.articleNoun()}.] `;
                    }
                }
                else if (i === len) {
                    r = r + ` or ${t} ${thing.articleNoun()}.] `;
                }
                else {
                    r = r + `, ${t}`;
                }
                i++;
            }
        }
    }
    else {
        `Error: failed to build actions list.`
    }
    return handleStringCaps(r);
}


function handleThingFocus(str)
{
    var thing = game.currentRoom.getThingById(str);
    const e = document.getElementById('Actions');
    clearActionsPane();
    if (thing) {
        var t = ``;
        if (typeof thing.exit === "function") {
            var r = thing.exit();
            if (typeof r === "string") {
                if (game.map.get(r)) {
                    game.handleRoomTransfer(r);
                    return;
                }
                else {
                    t = t + r;
                }
            }
        }
        else if (typeof thing.focus === "function") {
            var actions = thing.buildDefaultActions();
            const a = thing.customActions();
            if (a.constructor.name === "Array") {
                for (const i of a) {
                    if (i.constructor.name === "Action") {
                        actions.push(i);
                    }
                    else if (typeof i === "string") {
                        actions.push(new Action(i, i));        
                    }
                }
            }
            else if (a.constructor.name === "Action") {
                actions.push(a);
            }
            else if (typeof a === "string") {
                actions.push(new Action(a, a));
            }
            var f = thing.focus();
            if (f) {
                t = t + f;
            }
        }
        if (e) {
            e.innerHTML = buildActionsHTML(thing.id, actions);
        }
        addDisplayMessage(t);
        showRoom();
    }
}


function handleThingAction(str, func)
{
    const thing = game.currentRoom.getThingById(str);
    clearActionsPane();
    if (thing) {
        var t = ``;
        if (typeof thing[func] === "function") {
            var r = thing[func]();
            if (typeof r === "string") {
                t += r;
            }
        }
        clearActionsPane();
        addDisplayMessage(t);
        showRoom();
    }
}


function closeTopMenu() {
    if (skipNextMenuClose === true) {
        skipNextMenuClose = false;
        return;
    }
    const e = document.getElementById("MenuScreen");
    const p = document.getElementById("PlayScreen");
    if (e) {
        e.style.animation = 'slideup 0.25s';
    }
    if (p) {
        p.style.animation = 'halfunfade 0.25s';
    }
    setTimeout(function() { finishCloseTopMenu(); }, 0.25);
}


function finishCloseTopMenu() {
    const e = document.getElementById("MenuScreen");
    const p = document.getElementById("PlayScreen");
    if (e) {
        e.style.top = "-100%";
        e.style.height = "0";
    }
    if (p) {
        p.style.pointerEvents = "auto";
        p.style.opacity = 1;
    }
    document.removeEventListener("click", closeTopMenu);
}


function openTopMenu() {
    const e = document.getElementById("MenuScreen");
    const p = document.getElementById("PlayScreen");
    if (e) {
        e.style.animation = 'slidedown 0.25s';
    }
    if (p) {
        p.style.animation = 'halffade 0.25s';
    }
    setTimeout(function() { finishOpenTopMenu(); }, 0.25);
}


function finishOpenTopMenu() {
    const e = document.getElementById("MenuScreen");
    const p = document.getElementById("PlayScreen");
    if (e) {
        e.style.pointerEvents = "auto";
        e.style.top = "0";
        e.style.height = "90%";
    }
    if (p) {
        p.style.opacity = .5;
        p.style.pointerEvents = "none";
    }
    document.addEventListener("click", closeTopMenu);
}


function startGame() {
    window.addEventListener("orientationchange", function() {
        //refreshScreen();
    });
    game = new Game();
    document.title = versionInfo.title;
    if (game.prefaceText) {
        game.mode = "cutscene";
        setText(game.prefaceText);
        setTimeout(function() { addNextButton(); }, 1000);
    }
    else {
        showRoom();
    }
   showRoom();
}


window.addEventListener('load', (event) => {
    startGame();
});
