
var gCould = `can`;
var gPlayer = `Badger`;
var gSay = `say`;


function setPastTense() {
    gCould = `could`;
    gSay = `said`;
}


function setPresentTense() {
    gCould = `can`;
    gSay = `say`;
}


function setFirstPerson() {
    gPlayer = `I`;
}


function setSecondPerson() {
    gPlayer = `you`;
}


function buildActionsHTML(catagory, actions, name) {
    const openTag = `<a href="javascript:void(0);" onclick="handleAction(`;
    const closeTag = `</a>`;
    const noun = getNoun(catagory, name);
    var r = `<p> [${gPlayer} ${gCould} `;
    var i = 0;
    var article = "";
    actions = Object.keys(actions);
    const len = actions.length - 1;
    if (catagory === "things") {
        article = "the";
    }
    for (const action of actions) {
        const t = `${openTag} '${catagory}', '${name}', '${action}');">${action}${closeTag}`;
        if (i === 0) {
            r = r + `${t}`;
            if (i === len) {
                r = r + ` ${noun}.] `;
            }
        }
        else if (i === len) {
            r = r + ` or ${t} ${article} ${noun}.] `;
        }
        else {
            r = r + `, ${t}`;
        }
        i++;
    }
    return r;
}

