Game.rooms.lookingSpot = {

    desc: () => `A great gleaming slab of grey rock rising from a patch of messy shrubs formed the Looking Spot. It was
    certaintly the highest point on the island, a raised clearing in a forest of tall weathered $birches. Lit by the $moon
    was a sandy trail which led down to the beach, winding near the trodden mud path to Frog's $Swamp.`,

    decorations: {
        "birches": () => `Something about the smell of old trees mingled
        with the night air gave the Badger a pleasantness that sank deep into her bones.`,
    },

    exits: {
        "Swamp": {
            room: "swamp",
        },
    },

    characters: ["owl"],

    things: ["telescope"],

    scenery: ["moon"],

}


Game.things.telescope = {

    click: () => `"My precious telescope!" sobbed the Owl. "O, what shall I do!
    <p>Badger examined the telescope. The finely polished brass fittings were in top-shape. Owl
    had poured his heart and soul into this marvel of optical wizardry.
    <p>But it surely needed a new spying-glass.`,

    actions: {
        "peer into": () => `Badger looked into the telescope and perceived only blackness.`,
        "repair": () => `Not without a new spying-glass.`,
    },

}