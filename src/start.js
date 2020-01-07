Game.rooms.start = {

    desc: () => `<h1>${game.title}</h1>
    <h2>an Interactive Book by Donald Smith</h2>
    <p>$Acknowledgements
    <p>$Introduction
    <p>$Start
    <p>$About the Author`,

    exits: {
        "Acknowledgements": {
            room: "acknowledgementsPage"
        },
        "Introduction": {
            room: "introductionPage"
        },
        "Start": {
            room: "lookingSpot"
        },
        "About the Author": {
            room: "aboutPage"
        },
    },

    characters = ["player"]

}