
/**
 * A thing
 * @typedef {Object} Thing
 * @property {string} in Name of room the thing is in, as string.
 * @property {string|function} click String to display when clicked. Is usually a function returning a value.
 */


/**
 * Current focused object, probably in conversation.
 * @type {Thing}
 */
var dObj;


/**
 * 
 * Delete thing from game. Accepts input as string, so use
 * "ball" instead of game.things.ball. The thing object itself
 * is not permanently destroyed, so it can be restored to use
 * with something like the putThingInRoom function.
 * 
 * @param {string} thingName Name of thing to delete, as string.
 * 
 * @example
 * 
 *  deleteThing("ball");
 * 
 */
function deleteThing(thingName)
{
    const obj = game["things"][thingName];
    if (obj) {
        obj.in = '';
    }
}


/**
 * 
 * Put thing into room. The thing can already be in play, but it
 * doesn't have to be. Thing and room names are string arguments, so
 * used "ball" or "livingRoom" instead of game.things.ball or
 * game.rooms.livingRoom. Note that this function does not fire
 * off the appropriate "thing has moved" messages.
 * 
 * @param {string} thingName Name of thing, as string.
 * @param {string} roomName Name of room, as string.
 * 
 * @example
 * 
 *  silentMoveThingToRoom("bob", "livingRoom");
 * 
 */
function silentMoveThingToRoom(thingName, roomName)
{
    if (game["rooms"][roomName]) {
        game["things"][thingName].in = roomName;
    }
}


/**
 * 
 * Put thing into room. The thing can already be in play, but it
 * doesn't have to be. Thing and room names are string arguments, so
 * used "ball" or "livingRoom" instead of game.things.ball or
 * game.rooms.livingRoom. This function will display the appropriate
 * "thing has moved" messages.
 * 
 * @param {string} thingName Name of thing, as string.
 * @param {string} roomName Name of room, as string.
 * 
 * @example
 * 
 *  moveThingToRoom("bob", "livingRoom");
 * 
 */
function moveThingToRoom(thingName, roomName)
{
    const obj = game["things"][thingName];
    if (obj.moveMessage) {
        obj.moveMessage(roomName);
    }
    silentMoveThingToRoom(thingName, roomName);
}


/**
 * 
 * Gets the current room location of a thing. You must
 * use the string name of a thing and not the literal
 * object, so use "ball" instead of game.things.ball.
 * 
 * @param {string} thingName Name of thing, as string.
 * @returns {string} Name of room, as string.
 * 
 * @example
 * 
 *  const roomName = getRoomOfThing("ball");
 * 
 */
function getRoomOfThing(thingName) {
    return game["things"][thingName].in;
}
