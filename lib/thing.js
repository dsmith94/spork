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
