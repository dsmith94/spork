Game.rooms.aboutPage = {

    desc: () => `Donald Smith wrote this book.
    <p>Return to $title.`,

    exits: {
        "title": {
            room: "start"
        }
    }

}
Game.rooms.acknowledgementsPage = {

    text: () => `
    > When I heard the learn’d astronomer,
    > &nbsp;
    > When the proofs, the figures, were ranged in columns before me,
    > &nbsp;
    > When I was shown the charts and diagrams, to add, divide, and measure them,
    > &nbsp;
    > When I sitting heard the astronomer where he lectured with much applause in the lecture-room,
    > &nbsp;
    > How soon unaccountable I became tired and sick,
    > &nbsp;
    > Till rising and gliding out I wander’d off by myself,
    > &nbsp;
    > In the mystical moist night-air, and from time to time,
    > &nbsp;
    > Look’d up in perfect silence at the stars.
    > &nbsp;
    > _--Walt Whitman_
    
    <p>Return to $title.`,

    exits: {
        "title": {
            room: "start"
        }
    }

}
Game.characters.frog = {

    hasOfferedTea: false,
    badgerHasTea: false,

    hello: () => `Badger knocked on the door, and the cottage door creaked open, revealing a large round green face.
    "What are you doing out here?" asked Frog. "The night air is bad, don't you know!"

    The little cottage was lavishly adorned with thick colorful rugs and nut-brown
    wood panel walls. At the center was an opulent couch covered in throw pillows, atop which sat Frog,
    perched like a royal vizier.
    Frog regarded Badger with huge, damp eyes. Badger sat opposite in a small but overstuffed armchair.
    ${dChr.offerTea()}`,

    offerTea() {
        if (!dChr.hasOfferedTea) {
            setState("tea");
            dChr.hasOfferedTea = true;
            return `"Would you care for a cup of tea?" offered Frog.`;
        }
    },

    thanksForTea() {
        if (!dChr.badgerHasTea) {
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
                dChr.badgerHasTea = true;
                return `"Yes, tea would go down a treat," said the Badger.
                
                The Frog began preparing the kettle. "I'd be glad for a cup myself, so I'll make two." Soon
                the teapot was singing. Frog poured Badger a steaming $full cup of rich brew, sweetened gently
                with a touch of honey.`;
            },

            "No, but thank you": () => {
                setState("chatty");
                return `"No, but thank you," said Badger.

                "You surely won't mind if I have a cup for myself."

                "Please do."`;
            },

        },

        "chatty": {

            'Thanks for letting me come inside': () => {
                hideTopic();
                setState("pills");
                return `"Many thanks for letting me come inside," said the Badger.

                "There is a bit of an evening chill."

                "Ill luck rides on a night wind, particularly under this moon," said the Frog. "I'd best take my vitamins.
                Do you need some more?"`;
            },

            'Did you hear about Owl': () => {
                hideTopic();
                setState("owl");
                return `"Did you hear about Owl's telescope?" asked Badger.

                "No," said Frog. "I hear of nothing but the idle talk of flies, and the murmur of swamp water."

                "There was an accident," said Badger. The spying-glass of Owl's telescope is smashed to bits."

                Frog nodded with dignified empathy. "Poor Owl," he said. "You're a fine animal for helping him.
                Owl may be a bit of an arrogant fellow, but he is not bad at his heart.`;
            },

        },

        "owl": {

            'What can we do': () => {
                hideTopic();
                hideNPCTopic("frog", "Telescope");
                return `"What can we do to help Owl?" asked Badger.

                The Frog sat for a moment with a thoughtful look. "Perhaps I'll mention something to Cat," he said.
                "You'll find her down by Wide Stump. Cat is quiet, but very old, and knows quite a lot on all manner of
                outlandish things.`;
            },

            'Telescope': () => {
                hideTopic();
                hideNPCTopic("frog", "What can we do");
                return `"Do you know anything about telescopes?" asked Badger.

                "Of course not," said Frog, with a face that was the very picture of umbrage. He puffed his chest as
                though putting on airs.
                "This place is my world, my home, and all this is in between. I haven't the foggiest on telescopes or
                anything of the like.

                "But," he added, "You may want to talk to Cat. You'll find her down by Wide Stump. Her world is much
                wider and older than mine."`;
            },

            'Thank you': () => {
                endConversation();
                return `"Thank you for your hospitality," said the Badger. "Very kind of you. ${dChr.thanksForTea()} I
                shall do my best to help poor Owl."

                "Come again," said Frog with a cheerful nod.`;
            },

        },

        "pills": {
            
            'Still have some': () => {
                setState("chatty");
                return `"I still have some from last time," said Badger. Actually, she had quite a lot, for she
                couldn't stand Frog's vitamins.

                "Increased dosage will do you wonders," chimed Frog.

                "NO." Badger insisted. "Thank you, but no, I should use what I have."`
            },

            'NO': () => {
                setState("chatty");
                return `"NO," said the Badger. "NO more vitamins, if you please."

                Frog sniffed with indignance. "Humph. Some animals haven't any manners."`
            },
            
        }

            
    }

}
Game.characters.otter = {

    noun: "Otter",

    properNoun: `Otter`,

    click: () => `Otter doesn't seem to be particularly keen on chatting.`,

    hello() {
        if (dChr.currentState === "normal") {
            return `"Good-evening, Mr Otter!" said Badger.

            "Good-evening, Mistress Badger," said Otter with smile. "Fare thee well?"`;
        } else {
            return `"Good-evening, Mr Otter!" said Badger.

            "Good-evening, Mistress Badger," said Otter`;
        }
    },

    currentState: "normal",

    states: {

        "normal": {
        
            'Fine, I suppose': () => {
                setNPCState("otter", "spying-glass news");
                return `"Fine, I suppose," said the Mistress Badger, "Though I'd say Owl has
                had better nights than this one."

                "I heard," said the Otter. He winced. "Poor fellow. Any news on a fresh spying-glass?"`;
            },

            'Can\'t chat, I have to run': () => {
                endConversation();
                return `"Can't chat, I have to run," said the Badger, "Must go to help poor Owl."

                "Of course, of course," said the Otter with a tone of grave sincerity. "Pray let me know if I can help."`;
            }

        },

        "spying-glass news": {

            'Nothing yet': () => {
                dChr.currentState = "resigned"
                return `"Nothing yet," said the Mistress Badger, "Still on the lookout."

                "Perhaps that Walus fellow could help," said Otter. "Though his company is less than wholesome,
                he seems to have access to an array of queer artifacts."

                Badger stroked her chin.`;
            },

            'I\'ve some ideas': () => {
                dChr.currentState = "resigned"
                return `"I've some ideas." said the Mistress Badger, stammering a bit. In truth,
                she had no ideas at all, but was wholly discouraged at the notion of admitting it to anyone else.

                Otter smiled. "You always do, dear Mistress Badger. You always do."`;
            },

            'Can\'t chat, I have to run': () => {
                endConversation();
                return `"Can't chat, I have to run," said the Badger suddenly, "Must go to help poor Owl."

                "Of course," said the Otter with a tone of grave sincerity. "Pray let me know if I can help."`;
            }

        },

        "resigned": {

            'Shan\'t give up': () => {
                hideTopic();
                return `"Well, we shan\'t give up yet," said the Mistress Badger.

                "Never!" cried the Otter. "A staunch animal never quits."`;
            },

            'Can\'t chat, I have to run': () => {
                endConversation();
                return `"Can't chat, I have to run," said the Badger, "Must go to help poor Owl."
                
                "Of course," said the Otter. "Perhaps a chat with Mr Walrus may be helpful. He appears to
                be an animal of some ability."`;
            },

        },

    },
}

Game.characters.owl = {

    desc: () => `Poor $owl was wailing plaintively next to his smashed $telescope.`,

    noun: "Owl",

    properNoun: `Owl`,

    click: () => `"Mr Owl?" said the Badger.
    <p>But Owl did not respond. He only rolled about in the dark soil, his matted feathers like tar, pouring tears
    like one of the fountains Otter built in the Spring.`

}

/* Game metadata
 * this includes title, description, tags and more */

const metaInfo = {
    title: 'An Awful Evening for Astronomer Owl',
    desc: `Poor Owl's telescope was in a bit of an accident, and now he's inconsolable.
    Can you help him, Badger? He's such a dear fellow. `,
    authorName: 'Donald Smith',
    authorEmail: 'Donald Smith <dsmith94@gmail.com>',
    IFID: '6F089461-A65E-4C94-BFBE-ECD58799096E',
    tags: ['comic', 'comedy', 'talking animals'],
    version: '0.1a',
    startingPlayer: 'player',
};


Game.rooms.introductionPage = {

    desc: () => `<span class="drop">C</span>hipmunk was peering into Owl's telescope, holding still as best he could.
    His paws trembled in excitement. "Wow! It's so clear!"
    His best friend, Squirrel, was grasping at the far end of the telescope, where the spying-glass was. "Let me see!
    It's my turn!"
    "Now, boys," said Owl. "Be careful with my telescope. I've waited my whole life for tonight." Owl spoke with a kind of
    didactic inflection, professorially punctauting each syllable. Anybody with any sense considered
    Owl to be the very wisest on the matter of heaven-gazing. He was almost the wisest of all the animals, save perhaps for
    Mistress Badger, who always knew what to do.
    "You had your turn!" said Chipmunk.
    Owl scarcely noticed the boys, as he was now fully engaged in his own lecture. "Halley's Comet appears in the heavens only
    once every quarter-century. I saw it once before, as a very young Owl." Tears welled in his eyes. "And tonight, I shall see
    it again!"
    "When will we see it?" asked Squirrel, grabbing the telescope again.
    "Soon," said Owl. "Very soon. And with my beautiful telescope, at last I will see it up close!"
    "You won't <i>actually</i> see it up close," said Chipmunk.
    "Well, it will be as if I were up close," said Owl. "That's what a telescope does: it uses an arrangement of 
    lenses, the most important of which is the spying-glass, at the end opposite the viewfinder."
    "Can't you just fly up with your wings?" asked the Squirrel.
    "Mine!" cried the Chipmunk, tugging the telescope again.
    "No, mine!" shouted Squirrel.
    The Badger, who had been quiet the entire time said: "Boys, oughten we be careful with Owl's telescope?"
    Just as words were out of her mouth, the telescope tumbled. "No!" cried the Owl, unable to snatch it as it fell.
    The boys were gone quick as a wind.
    "I think it's okay!" said Owl, examining the view-lens. "It looks..."
    <hr>
    <ul>
    <li><i>$Crack!</i></li>
    <li><i>$No damage</i></li>
    </ul>
    `,
    exits: {
        "Crack!": {
            room: "crackTelescopeRoom"
        },
        "No damage": {
            room: "noDamageTelescopeRoom"
        }
    }
}


Game.rooms.crackTelescopeRoom = {

    desc: () => `Mistress Badger took a closer look at the telescope. "Actually... I do see a tiny teensy little--"
    <i>Crack!</i> The glass fractured in a spiderweb pattern from the edge, and splintered into
    glitter on the ground.
    Owl's lower beak began to shudder, and his eyes began to water. "My... the comet... no..." His words
    reduced to gibberish, and he fell to his knees. "Ack! Now my rheumatism...  Oh... Heavens..."
    $Okay Badger, now what?`,

    exits: {
        "Okay Badger, now what?": {
            room: "lookingSpot"
        }
    }

}


Game.rooms.noDamageTelescopeRoom = {

    desc: () => `"It's okay!" said Owl. "It's really okay!"
    "I believe so," said Mistress Badger. "It really does appear to be undamaged."
    Owl did a little dance. While he was performing a sort of one-animal waltz, he accidentally tipped
    the telescope over. The glass fractured in a spiderweb pattern from the edge, and splintered into
    glitter on the ground.
    Owl's lower beak began to shudder, and his eyes began to water. "My... the comet... no..." His words
    reduced to gibberish, and he fell to his knees. "Ack! Now my rheumatism...  Oh... Heavens..."
    $Okay Badger, now what?`,

    exits: {
        "Okay Badger, now what?": {
            room: "lookingSpot"
        }
    }

}


/* Default player character */

Game.characters.player = {

    properNoun() {
        return `Badger`;
    },

};

Game.rooms.lookingSpot = {

    text: () => `A great gleaming slab of grey rock rising from a patch of messy shrubs formed the Looking Spot. It was
    certaintly the highest point on the island, a raised clearing in a forest of tall weathered $birches. Lit by the $moon
    was a sandy trail which led down to the beach, winding near the trodden mud path to Frog's $Swamp.`,

    decorations: {
        "birches": () => `Something about the smell of old trees mingled
        with the night air gave the Badger a pleasantness that sank deep into her bones.`,
    },

    exits: {
        "Swamp": {
            room: "swamp",
            postMove: "Badger made her way down to the Frog's Swamp."
        },
    },

    characters: ["owl"],

    things: ["telescope"],

    scenery: ["moon"],

}


Game.things.telescope = {

    click: () => `"My precious telescope!" sobbed the Owl. "O, what shall I do!"
    <p>Badger examined the telescope. The finely polished brass fittings were in top-shape. Owl
    had poured his heart and soul into this marvel of optical wizardry.
    <p>But it surely needed a new spying-glass.`,

    actions: {
        "look in the viewfinder": () => `Badger peered into the telescope and perceived only blackness.`,
        "repair": () => `Not without a new spying-glass.`,
    },

}
Game.rooms.swamp = {

    text: () => `Half-sunken into a mire of greenish mud and buried under lily pads was a hardy $cottage.
    Orange hearthlight flickered from within, and a curl of smoke gently twirling from the $chimney.
    Flies buzzed just overhead, trading bits of swampy $gossip. Not far away was a trail up to the $Looking Spot,
    and one could readily hear Owl wailing loudly into the night.`,

    decorations: {
        "chimney": () => `Badger thought the narrow flue almost looked like the curled lips of a frog, puckering at the sky.`,
        "gossip": () => `Badger had always tried to ignore gossip, particularly from such a flithy source.`,
        "full cup of rich brew": () => `Badger took a long sip. The scent was floral, and the flavor was just a touch sweet.`,
    },

    exits: {
        "Looking Spot": {
            room: "lookingSpot",
        },
    },

    things: ["cottage"],

}

Game.things.cottage = {

    click() {
        beginConversation("frog");
    },

}
Game.scenery.moon = {

    noun: "moon",

    click: () => `The moon shines with a cheery brightness.`,

}

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

    characters: ["player"]

}
