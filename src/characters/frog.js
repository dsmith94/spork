Game.characters.frog = {

    hasOfferedTea: false,
    badgerHasTea: false,

    in: "swamp",

    hello: () => `Badger knocked on the door, and the cottage door creaked open, revealing a large round green face.
    "What are you doing out here?" asked Frog. "The night air is bad, don't you know!"

    The little cottage was lavishly adorned with thick colorful rugs and nut-brown
    wood panel walls. At the center was an opulent couch covered in throw pillows, atop which sat Frog,
    perched like a royal vizier.
    Frog regarded Badger with huge, damp eyes. Badger sat opposite in a small but overstuffed armchair.
    ${dNpc.offerTea()}`,

    offerTea() {
        if (!dNpc.hasOfferedTea) {
            setState("tea");
            dNpc.hasOfferedTea = true;
            return `"Would you care for a cup of tea?" offered Frog.`;
        }
        return ``;
    },

    thanksForTea() {
        if (!dNpc.badgerHasTea) {
            return `And thank you for the tea, it was lovely.`;
        } else {
            return "";
        }
    },

    currentState: "chatty",

    states: {

        "tea": {

            "Yes, tea would be lovely": () => {
                setState("chatty");
                dNpc.badgerHasTea = true;
                return `"Yes, tea would go down a treat," said the Badger.
                
                The Frog began preparing the kettle. "I'd be glad for a cup myself, so I'll make two." Soon
                the teapot was singing. Frog poured Badger a steaming $full cup of rich brew, sweetened gently
                with a touch of honey.`;
            },

            "I don't want tea!": {
                shown: () => true,
                text: () => `I don't want tea!!`,
            },

            "No, but thank you": {
                nextState: "chatty",
                text: `"No, but thank you," said Badger.

                "You surely won't mind if I have a cup for myself."

                "Please do."`
            },

        },

        "chatty": {

            'Thanks for letting me come inside': {
                nextState: "pills",
                text: `"Many thanks for letting me come inside," said the Badger.

                "There is a bit of an evening chill."

                "Ill luck rides on a night wind, particularly under this moon," said the Frog. "I'd best take my vitamins.
                Do you need some more?"`
            },

            'Did you hear about Owl': {
                nextState: "owl",
                text: `"Did you hear about Owl's telescope?" asked Badger.

                "No," said Frog. "I hear of nothing but the idle talk of flies, and the murmur of swamp water."

                "There was an accident," said Badger. The spying-glass of Owl's telescope is smashed to bits."

                Frog nodded with dignified empathy. "Poor Owl," he said. "You're a fine animal for helping him.
                Owl may be a bit of an arrogant fellow, but he is not bad at his heart.`
            },

        },

        "owl": {

            'What can we do': {
                shown: () => !dTop.hasBeenClicked,
                text: `"What can we do to help Owl?" asked Badger.

                The Frog sat for a moment with a thoughtful look. "Perhaps I'll mention something to Cat," he said.
                "You'll find her down by Wide Stump. Cat is quiet, but very old, and knows quite a lot on all manner of
                outlandish things.`
            },

            'Telescope': {
                shown: () => !dTop.hasBeenClicked,
                text: `"Do you know anything about telescopes?" asked Badger.

                "Of course not," said Frog, with a face that was the very picture of umbrage. He puffed his chest as
                though putting on airs.
                "This place is my world, my home, and all this is in between. I haven't the foggiest on telescopes or
                anything of the like.

                "But," he added, "You may want to talk to Cat. You'll find her down by Wide Stump. Her world is much
                wider and older than mine."`
            },

            'Thank you': {
                nextState: "",
                text: () => `"Thank you for your hospitality," said the Badger. "Very kind of you. ${dNpc.thanksForTea()} I
                shall do my best to help poor Owl."

                "Come again," said Frog with a cheerful nod.`
            },

        },

        "pills": {
            
            'Still have some': {
                nextState: "chatty",
                text: `"I still have some from last time," said Badger. Actually, she had quite a lot, for she
                couldn't stand Frog's vitamins.

                "Increased dosage will do you wonders," chimed Frog.

                "NO." Badger insisted. "Thank you, but no, I should use what I have."`
            },

            'NO': {
                nextState: "chatty",
                text: `"NO," said the Badger. "NO more vitamins, if you please."

                Frog sniffed with indignance. "Humph. Some animals haven't any manners."`
            },
            
        }

            
    }

}