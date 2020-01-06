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
    __currentNPCConversing = ``;
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
 * hideTopic(character, state, topic)
 *
 * Hides a topic. It still exists, but will no longer be shown
 * on NPC topic lists.
 */
function hideTopic(character, state, topic)
{
    if (state) {
        game["characters"][character]["states"][state]["__hidden"][topic] = true;
    }
    else {
        game["characters"][character]["topics"]["__hidden"][topic] = true;
    }
}


/*
 * hideCurrentTopic()
 *
 * Hides the topic current active. Can be used to prevent
 * one topic from being selected over and over.
 */
function hideCurrentTopic()
{
    hideTopic(__currentNPCConversing, __currentConversingState, __currentConversingTopic);
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
 *
 *
 * Delete all references to a character. Note that the
 * character still exists, and can be put back into the game
 * with a call to putCharacterInRoom.
 */
function deleteCharacter(character)
{
    const oldRoom = getRoomOfCharacter(character);
    if (game["rooms"][oldRoom].characters) {
        const index = game["rooms"][oldRoom].characters.indexOf(character);
        game["rooms"][oldRoom].characters.splice(index, 1);
    }
}


/* 
 * putCharacterInRoom(character, room)
 *
 * Put a character into a room. Note that this could lead to
 * a character named reference duplication. Usually,
 * you want moveCharacterToRoom to prevent that unwanted
 * behavior.
 */
function putCharacterInRoom(character, room)
{
    if (game["rooms"][room]) {
        if (!game["rooms"][room]["characters"]) {
            game["rooms"][room]["characters"] = [];
        }
        game["rooms"][room]["characters"].push(character);
    }
}


/* 
 * silentMoveCharacterToRoom(character, room)
 *
 * Move the character into a room, without firing the
 * movement messages of the thing.
 */
function silentMoveCharacterToRoom(character, room)
{
    deleteCharacter(character);
    putCharacterInRoom(character, room);
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