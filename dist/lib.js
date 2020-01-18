var dChr,game,__currentPlayer;function endConversation(){setNPCConversation("")}function beginConversation(e){const t=game.characters[e];if(t){const n={name:e,it:t};if(t.hello){dChr=t;const o=parseTextToDisplayObject(t.hello(n));o&&(setNPCConversation(e),msg(`<p>${o}`),refresh())}}}function setNPCstate(e,t){game.characters[e].currentState=t}function setState(e){dChr.currentState=e}function getNPCstate(e,t){return game.characters[e].currentState}function showTopic(e,t,n){t?game.characters[e].states[t].__hidden[n]=!1:game.characters[e].topics.__hidden[n]=!1}function hideNPCTopic(e,t,n){t?game.characters[e].states[t].__hidden[n]=!0:game.characters[e].topics.__hidden[n]=!0}function hideTopic(){hideNPCTopic(__currentNPCConversing,__currentConversingState,__currentConversingTopic)}function deleteTopic(e,t,n){t?delete game.characters[e].states[t][n]:delete game.characters[e].topics[n]}function deleteCurrentTopic(){deleteTopic(__currentNPCConversing,__currentConversingState,__currentConversingTopic)}function silentMoveCharacterToRoom(e,t){game.rooms[t]&&(game.characters[e].in=t)}function moveCharacterToRoom(e,t){const n=game.characters[e];n.moveMessage&&n.moveMessage(t),silentMoveCharacterToRoom(e,t)}function getRoomOfCharacter(e){return game.characters[e].in}var dObj,__displayObjects=[],__currentNPCConversing="",__currentConversingState="",__currentConversingTopic="",__transitionText="";function lookForBreaks(e){var t="",n=!1;for(var o=(e=e+" ").length,r=0;r<o;)"<"===e[r]&&(n=!0),">"===e[r]&&(n=!1),"~"===e[r]&&"~"===e[r+1]&&!1===n?(t+="<br>&nbsp;<br>",r++):"-"===e[r]&&"-"===e[r+1]&&!1===n?(t+="&mdash;",r++):t+=e[r],r++;return t}function fixQuotes(e){for(var t=!1,n="",o=lookForBreaks(e),r=o.length,c=0;c<r;c++){if("<"===o[c]&&(t=!0),">"===o[c]&&(t=!1),'"'===o[c]&&!1===t)(s=o[c+1])&&(!0===checkValidCharacter(s)?n+="&ldquo;":n+="&rdquo;");else if("'"===o[c]&&!1===t){var s;!0===checkValidCharacter(s=o[c-1])?n+="&rsquo;":n+="&lsquo;"}else n+=o[c]}return n}function handleHeadingTags(e){for(let t=6;t>0;t--){const n="#".repeat(t),o=new RegExp(n+" .*","g"),r=e.match(o);if(r)for(const n of r){const o=n.replace(/#/g,"");e=e.replace(n,`<h${t}>${o}</h${t}>`)}}return e}function handleItalicsTags(e){const t=[[/_.+_/,"_"],[/\*.+\*/,"\\*"]];for(pattern of t){const[t,n]=pattern,o=e.match(t);if(o)for(const t of o)if("___"!==t){const o=new RegExp(n,"g"),r=t.replace(o,"");e=e.replace(t,`<i>${r}</i>`)}}return e}function handleBoldTags(e){const t=e.match(/\*\*.*\*\*/g);if(t)for(const n of t){const t=n.replace(/\*\*/g,"");e=e.replace(n,`<b>${t}</b>`)}return e}function handleRuleTags(e){const t=[/\n\s*___/g,/\n\s*\*\*\*/g,/\n\s*\_\_\_/g];for(pattern of t){const t=e.match(pattern);if(t)for(const n of t)e=e.replace(n,"<hr />")}return e}function handleLongDashTags(e){const t=e.match(/--/g);if(t)for(const n of t)e=e.replace(n,"&mdash;");return e}function handleBlockQuotes(e){e=e.split(/\n/);let t="",n=!1;for(line of e)"> "===line.trim().slice(0,2)?(!1===n&&(t+="<blockquote>"),n=!0,t+=line.trim().slice(2,line.length)+"<br />"):(!0===n&&(t+="</blockquote>",n=!1),t+=line+"\n");return t}function addParagraphs(e){return e.replace(/\n\s*\n/g,"<p>")}function checkIfDigit(e){var t=Number(e);return NaN!=t&&Boolean([!0,!0,!0,!0,!0,!0,!0,!0,!0,!0][t])}function setNPCConversation(e){__currentNPCConversing=e}function setRoomTransition(e){__transitionText=parseTextToDisplayObject(e)}function checkIfLetter(e){return e.toUpperCase()!=e.toLowerCase()}function checkValidCharacter(e){return">"!==e&&""!==e.trim()}function parseTextToDisplayObject(e){switch(typeof e){case"function":return e();case"object":return Array.isArray(e)?e.join(""):"";default:return e}}function msg(e){const t=parseTextToDisplayObject(e);__displayObjects.push(t)}function checkIfLetter(e){return e.toUpperCase()!=e.toLowerCase()}function refresh(){var e="";const t=getRoomOfCharacter(__currentPlayer),n=game.rooms[t];if(hideNextButton(),hideActions(),""===__currentNPCConversing)if(0===__displayObjects.length){__transitionText&&(msg(`<p>${__transitionText}`),__transitionText=""),msg(`<p>${parseTextToDisplayObject(n.text)}`),getSpecialDescriptions(t)}else showNextButton();else{if(0===__displayObjects.length){msg(`<p>${parseTextToDisplayObject(game.characters[__currentNPCConversing].desc)}`)}const e=getConversationTopics();if(e){document.getElementById("Actions").innerHTML=buildTopicsHTML(e,__currentNPCConversing)}}const o=document.getElementById("Readout");if(o){for(const t of __displayObjects)e+=t;e=fixQuotes(e=handleLongDashTags(e=addHyperLinks(t,e=addParagraphs(e=handleStringCaps(e=handleBlockQuotes(e=handleRuleTags(e=handleItalicsTags(e=handleBoldTags(e=handleHeadingTags(e)))))))))),o.innerHTML=e}__displayObjects=[],""===__currentNPCConversing&&""!==dChr&&(dChr=null)}function showNextButton(){document.getElementById("Next-Button").innerHTML='<p><button type="submit" id="Next-Button" onclick="refresh();">➞</button></p>'}function hideNextButton(){document.getElementById("Next-Button").innerHTML=""}function hideActions(){document.getElementById("Actions").innerHTML=""}function handleStringCaps(e){for(var t="",n=(e=e+" ").length,o=0,r=!1,c=!0,s=!1;o<n;){if("&"===e[o]&&(s=!0),";"===e[o]&&(s=!1),"<"===e[o]&&(r=!0),">"===e[o]&&(r=!1),!1===r&&!1===s){var a=e[o];"."===a||"!"===a||"?"===a?('"'!==e[o+1]&&(c=!0),t+=a):!0===c&&checkIfLetter(a)?(t+=a.toUpperCase(),c=!1):t+=a}else t+=e[o];o++}return t}function getSpecialDescriptions(e){const t=["things","characters","scenery"];for(const n of t)if(game[n])for(const t of Object.keys(game[n]))if(game[n][t].in===e&&game[n][t].text){msg(`<p>${parseTextToDisplayObject(game[n][t].text)}</p>`)}}function getConversationTopics(){if(game.characters[__currentNPCConversing]){if((dChr=game.characters[__currentNPCConversing]).states&&dChr.currentState){const e=dChr.currentState;if(dChr.states[e])return dChr.states[e]}if(dChr.topics)return dChr.topics}return null}function determineTopicShow(e){if("function"==typeof e)return!0;if("string"==typeof e)return!0;if("object"==typeof e){if("function"!=typeof e.shown)return!!e.shown;if(e.shown())return!0}return!1}function buildTopicsHTML(e,t){var n="<ul>";for(const[o,r]of Object.entries(e))determineTopicShow(r)&&(n+=`<a href="javascript:void(0);" onclick="handleTopic(\`${t}\`, \`${o}\`);"><li>${o}</li></a>`);return`${n}</ul>`}function getNoun(e,t){var n=t;if(game[e][t]){var o=game[e][t];o&&(o.properNoun?n="function"==typeof o.properNoun?o.properNoun():o.properNoun:o.noun&&(n="function"==typeof o.noun?o.noun():o.noun))}return n}function addHyperLinks(e,t){const n='<a href="javascript:void(0);" onclick="handle',o=["things","characters"];for(const r of o)if(game[r])for(const o of Object.keys(game[r]))if(game[r][o].in===e){const c=t.indexOf(`$${o}`);if(c>-1){const s=o.length,a=c+s+1,i=getNoun(r,o);t=__currentNPCConversing!==o?`${t.slice(0,c)}${n}Click('${r}','${e}','${o}');">${i}</a>${t.slice(a,t.length)}`:`${t.slice(0,c)}${i}${t.slice(c+s+1,t.length)}`}}if(game.rooms[e].decorations)for(const o of Object.keys(game.rooms[e].decorations))for(;t.indexOf(`$${o}`)>-1;){const r=t.indexOf(`$${o}`),c=o.length;t=`${t.slice(0,r)}${n}Decorator('${o}', '${e}');">${o}</a>${t.slice(r+c+1,t.length)}`}if(game.scenery)for(const o of Object.keys(game.scenery))for(;t.indexOf(`$${o}`)>-1;){const r=t.indexOf(`$${o}`),c=o.length,s=getNoun("scenery",o);t=`${t.slice(0,r)}${n}Click('scenery','${e}','${o}');">${s}</a>${t.slice(r+c+1,t.length)}`}if(game.rooms[e].exits)for(const o of Object.keys(game.rooms[e].exits))for(;t.indexOf(`$${o}`)>-1;){const r=t.indexOf(`$${o}`),c=o.length;t=`${t.slice(0,r)}${n}Exit('${o}', '${e}');">${o}</a>${t.slice(r+c+1,t.length)}`}return t}function handleDecorator(e,t){msg(game.rooms[t].decorations[e]()),refresh()}function handleExit(e,t){const n=game.rooms[t].exits[e];n&&(n.room&&(n.preMove&&msg(n.preMove),n.postMove&&setRoomTransition(n.postMove),moveCharacterToRoom(__currentPlayer,n.room)),n.preventMove&&msg(n.preventMove)),refresh()}function handleTopic(e,t){var n,o=game.characters[e];if(o){if(o.states&&o.currentState?(n=o.states[o.currentState],__currentConversingState=o.currentState):n=o.topics,__currentConversingTopic=t,"object"==typeof n[t]){const e=n[t].text();e&&msg(e)}else{const e=n[t]();e&&msg(e)}refresh()}}function handleAction(e,t,n){var o=game[e][t];if(o){const e=o.actions[n]();e&&(msg(e),refresh())}}function handleClick(e,t,n){var o=game[e][n];if(o){dObj=o;var r={catagory:e,container:t,name:n,it:o};if("characters"===e&&o.hello){dChr=o;const e=parseTextToDisplayObject(o.hello(r));if(e)return setNPCConversation(n),msg(`<p>${e}`),void refresh()}if(o.click){const t=o.click(r);if(t&&(msg(t),refresh()),o.actions){const t=buildActionsHTML(e,o.actions,n);document.getElementById("Actions").innerHTML=handleStringCaps(t)}}}}function checkNameDuplication(){const e=["things","characters"];for(const n of e){var t={};for(const e of Object.keys(Game.rooms))if(Game.rooms[e][n])for(const o of Game.rooms[e][n]){if(t[o]){const r=`Duplication of name: catagory ${n} ${o} in rooms: ${t[o]} and ${e}`;throw alert(r),r}t[o]=e}}}function checkLostNames(){const e=["things","characters","scenery"];for(const t of e){let e=Object.keys(Game[t]);for(const n of Object.keys(Game.rooms))if(Game.rooms[n][t]){let o=Game.rooms[n][t].filter(t=>!e.includes(t));if(o.length>0){const e=`Missing name -- catagory ${t}:${o[0]} in room: ${n}`;throw alert(e),e}}}}function checkGame(){}function buildConversationSchema(){for(const e of Object.keys(game.characters))if(game.characters[e].topics&&(game.characters[e].topics.__hidden||(game.characters[e].topics.__hidden={})),game.characters[e].states)for(const t of Object.keys(game.characters[e].states))game.characters[e].states[t].__hidden||(game.characters[e].states[t].__hidden={})}function startGame(){window.addEventListener("orientationchange",function(){}),checkGame(),restartGame(),refresh()}function deleteThing(e){const t=getRoomOfThing(e);if(game.rooms[t].things){const n=game.rooms[t].things.indexOf(e);game.rooms[t].things.splice(n,1)}}function putThingInRoom(e,t){game.rooms[t]&&(game.rooms[t].things||(game.rooms[t].things=[]),game.rooms[t].things.push(e))}function silentMoveThingToRoom(e,t){deleteThing(e),putThingInRoom(e,t)}function moveThingToRoom(e,t){const n=game.things[e];n.moveMessage&&n.moveMessage(t),silentMoveThingToRoom(e,t)}function getRoomOfThing(e){const t=game.rooms;for(const[n,o]of Object.entries(t))if(o.thing&&o.thing.indexOf(e)>-1)return n;return""}function restartGame(){const e=Object.create(metaInfo);document.title=e.title,__currentPlayer=e.startingPlayer,__currentNPCConversing="",__displayObjects=[],dObj=null,dChr=null,(game=Object.create(Game)).title=e.title}