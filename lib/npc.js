/*
 * NPC functions
 *
 * NPCs are far and away the most complicated
 * feature of this program, so there's a lot
 * here to manage, mostly around conversations.
 */


/**
 * A NPC
 * @typedef {Object} NPC
 * @property {string} in Name of room the NPC is in, as string.
 * @property {string} currentState - The current state of the NPC.
 */

/**
 * A conversation topic
 * @typedef {Object} Topic
 * @property {function|string} text
 * @property {function} shown
 */

 

/**
 * Current focused NPC, probably in conversation.
 * @type {NPC}
 */
var dNpc;


/**
 * Current active conversation topic.
 * @type {Topic}
 */
var dTop;


/**
 * End the current active conversation.
 */
function endConversation() {
    setNPCConversation('');
}


/**
 * Begin conversation with NPC. Note that the name
 * is accepted as a string, as in "Bob" rather than
 * game.characters.bob.
 * @param {string} npcName Name of NPC, as string.
 * 
 * @example
 *  
 *  beginConversation("bob");
 * 
 */
function beginConversation(npcName) {
    const obj = game["characters"][npcName];
    if (obj) {
        const context = {
            name: npcName,
            it: obj
        };
        if (obj.hello) {
            dNpc = obj;
            dNpc.__catagory = "characters";
            dNpc.__name = npcName;
            const c = parseTextToDisplayObject(dNpc.hello(context));
            if (c) {
                setNPCConversation(npcName);
                msg(`${c}`);
            }
        }
    }
}


/**
 * 
 * Set specific NPC to target state.
 * 
 * @param {NPC} npcName Name of NPC, as string.
 * @param {string} state State descriptor, as string.
 * 
 * @example
 * 
 *  setNPCstate("bob", "chatty");
 * 
 */
function setNpcState(npcName, state)
{
    game["characters"][npcName].currentState = state;
}


/**
 * 
 * Set state of current active npc. The state must be
 * in the form of a string, as in "grumpy" or "chatty"
 * instead of an object.
 * 
 * @param {string} state State descriptor, as string.
 * 
 * @example
 * 
 *  setState("angry");
 * 
 */
function setState(state)
{
    dNpc.currentState = state;
}


/**
 * 
 * Returns the state of NPC as a string. You must give
 * the name of the NPC as a string, rather than the
 * object itself, so "bob" instead of game.characters.bob.
 * This function assumes this is a STATEful NPC, so
 * it may return undefined in some circumstances.
 * 
 * @param {string} npcName Name of NPC, as string.
 * @return {string} Current NPC state.
 * 
 * @example
 * 
 *  getNpcState("bob");
 * 
 */
function getNpcState(npcName)
{
    return game["characters"][npcName].currentState;
}


/**
 * 
 * Delete NPC from game. Accepts input as string, so use
 * "bob" instead of game.characters.bob. The NPC object itself
 * is not permanently destroyed, so it can be restored to use
 * with something like the moveNpcToRoom function.
 * 
 * @param {string} npcName Name of NPC to delete, as string.
 * 
 * @example
 * 
 *  deleteThing("bob");
 * 
 */
function deleteNpc(npcName)
{
    const obj = game["characters"][npcName];
    if (obj) {
        obj.in = '';
    }
}


/**
 * 
 * Deletes a topic, permanently. Because this action
 * cannot be undone, hiding topics is preferred. If
 * you are not operating on a STATEful npc, leave the
 * state argument blank.
 * 
 * @param {string} npcName Name of NPC, as string.
 * @param {string} topic Topic text, as string.
 * @param {string} state State descriptor, as string.
 * 
 * @example
 * 
 *  deleteTopic("bob", "angry", "The old house");
 * 
 */
function deleteTopic(npcName, topic, state="")
{
    if (state) {
        delete game["characters"][npcName]["states"][state][topic];
    }
    else {
        delete game["characters"][npcName]["topics"][topic];
    }
    
}


/**
 * 
 * Deletes current active topic.  Because this action
 * cannot be undone, hiding topics is preferred.
 * 
 * @example
 * 
 *  deleteCurrentTopic();
 * 
 */
function deleteCurrentTopic()
{
    deleteTopic(__currentNPCConversing, __currentConversingTopic, __currentConversingState);
}


/**
 * 
 * Move NPC into a room, without displaying the associated
 * movement messages. NPC and room names must be inputed as
 * strings, so use "bob" or "livingRoom" instead of
 * game.characters.bob or game.rooms.livingRoom. Will only
 * make any game changes if a room by that name exists.
 * 
 * @param {string} npcName NPC name, as string.
 * @param {string} roomName Room name, as string.
 * 
 * @example
 * 
 *  silentMoveNpcToRoom("bob", "livingRoom");
 * 
 */
function silentMoveNpcToRoom(npcName, roomName)
{
    if (game["rooms"][roomName]) {
        game["characters"][npcName].in = roomName;
    }
}


/**
 * 
 * Move NPC to room. 
 * 
 * @param {string} npcName NPC name, as string.
 * @param {string} roomName Room name, as string.
 * 
 * @example
 * 
 *  moveNpcToRoom("bob", "livingRoom");
 * 
 */
function moveNpcToRoom(npcName, roomName)
{
    const obj = game["characters"][npcName];
    if (obj.moveMessage) {
        obj.moveMessage(roomName);
    }
    silentMoveNpcToRoom(npcName, roomName);
}



/**
 * 
 * Get room name of NPC, as string. This function
 * requires the input of name strings, not objects,
 * as in "bob" instead of game.characters.bob.
 * 
 * @param {string} npcName Name of NPC as string.
 * @return {string} String name of room or container of NPC.
 * 
 * @example
 * 
 *  getRoomOfCharacter("bob");
 * 
 */
function getRoomOfCharacter(npcName) {
    return game["characters"][npcName].in;
}