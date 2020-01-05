
var gCould = `could`;
var gPlayer = `you`;
var gSay = `say`;


function buildActionsHTML(catagory, actions, name) {
    const openTag = `<a href="javascript:void(0);" onclick="handleAction(`;
    const closeTag = `</a>`;
    const noun = getNoun(catagory, name);
    var r = `<p> [${gPlayer} ${gCould} `;
    var i = 0;
    actions = Object.keys(actions);
    const len = actions.length - 1;
    for (const action of actions) {
        const t = `${openTag} '${catagory}', '${name}', '${action}');">${action}${closeTag}`;
        if (i === 0) {
            r = r + `${t}`;
            if (i === len) {
                r = r + ` ${noun}.] `;
            }
        }
        else if (i === len) {
            r = r + ` or ${t} ${noun}.] `;
        }
        else {
            r = r + `, ${t}`;
        }
        i++;
    }
    return r;
}


function buildTopicsHTML(topics, name) {
    const openTag = `<a href="javascript:void(0);" onclick="handleTopic(`;
    const closeTag = `</a>`;
    var r = `<p> [${gPlayer} ${gCould}`;
    var i = 0;
    topics = Object.keys(topics);
    const len = topics.length - 1;
    for (const topic of Object.keys(topics)) {
        const t = `${openTag}'${name}', '${topic}');">${topic}${closeTag}`;
        if (i === 0) {
            r = r + `${t}`;
            if (i === len) {
                r = r + `.] `;
            }
        }
        else if (i === len) {
            r = r + ` or ${t}.] `;
        }
        else {
            r = r + `, ${t}`;
        }
        i++;
    }
    return r;
}

