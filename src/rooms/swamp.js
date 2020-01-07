Game.rooms.swamp = {

    desc: () => `Half-sunken into a mire of greenish mud and buried under lily pads was a hardy cottage.
    Orange hearthlight flickered from within, and a curl of smoke gently twirling from the $chimney.
    Flies buzzed just overhead, trading bits of swampy $gossip. Not far away was a trail up to the $Looking Spot,
    and one could readily hear Owl wailing loudly into the night.`,

    decorations: {
        "chimney": () => `Badger thought the narrow flue almost looked like the curled lips of a frog, puckering at the sky.`,
        "gossip": () => `Badger had always tried to ignore gossip, particularly from such a flithy source.`,
    },

    exits: {
        "Looking Spot": {
            room: "lookingSpot",
        },
    },

}