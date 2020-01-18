Game.rooms.start = {

    text: () => `# ${game.title}
    ## an Interactive Book by Dj Smith

    $Acknowledgements
    
    $Introduction
    
    $Start
    
    $About the Author`,

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

}