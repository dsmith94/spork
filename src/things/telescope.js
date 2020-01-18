Game.things.telescope = {

    in: "lookingSpot",

    click: () => `"My precious telescope!" sobbed the Owl. "O, what shall I do!"
    
    Badger examined the telescope. The finely polished brass fittings were in top-shape. Owl
    had poured his heart and soul into this marvel of optical wizardry.
    
    But it surely needed a new spying-glass.`,

    actions: {
        "look in the viewfinder": () => `Badger peered into the telescope and perceived only blackness.`,
        "repair": () => `Not without a new spying-glass.`,
    },

}
