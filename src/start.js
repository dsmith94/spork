Game.rooms.start = {

    text: () => `# ${game.title}
    ## an Interactive Book by Dj Smith

    $Acknowledgements
    
    $Introduction
    
    $Start
    
    $About the Author`,

    links: {
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