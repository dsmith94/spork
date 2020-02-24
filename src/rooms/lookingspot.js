Game.rooms.lookingSpot = {

    text: () => `A great gleaming slab of grey rock rising from a patch of messy shrubs formed the Looking Spot. It was
    certaintly the highest point on the island, a raised clearing in a forest of tall weathered $birches. Lit by the $moon
    was a sandy trail which led down to the beach, winding near the trodden mud path to Frog's $Swamp.`,

    decorations: {
        "birches": () => `Something about the smell of old trees mingled
        with the night air gave the Badger a pleasantness that sank deep into her bones.`,
    },

    links: {
        "Swamp": {
            room: "swamp",
            postMove: `Badger made her way down to the Frog's Swamp. `
        },
    },

}

