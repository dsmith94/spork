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

    desc: () => `A bunch of acknowledgements here.
    <p>Return to $title.`,

    exits: {
        "title": {
            room: "start"
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
            <p>"Good-evening, Mistress Badger," said Otter with smile. "Fare thee well?"`;
        } else {
            return `"Good-evening, Mr Otter!" said Badger.
            <p>"Good-evening, Mistress Badger," said Otter`;
        }
    },

    currentState: "normal",

    states: {

        "normal": {
        
            '"Fine, I suppose"': () => {
                dChr.currentState = "spying-glass news"
                return `"Fine, I suppose," said the Mistress Badger, "Though I'd say Owl has
                had better nights than this one."
                <p>"I heard," said the Otter. He winced. "Poor fellow. Any news on a fresh spying-glass?"`;
            },

            '"Can\'t chat, I have to run"': () => {
                endConversation();
                return `"Can't chat, I have to run," said the Badger, "Must go to help poor Owl."
                <p>"Of course, of course," said the Otter with a tone of grave sincerity. "Pray let me know if I can help."`;
            }

        },

        "spying-glass news": {

            '"Nothing yet"': () => {
                dChr.currentState = "resigned"
                return `"Nothing yet," said the Mistress Badger, "Still on the lookout."
                <p>"Perhaps that Walus fellow could help," said Otter. "Though his company is less than wholesome,
                he seems to have access to an array of queer artifacts."
                <p>Badger stroked her chin.`;
            },

            '"I\'ve some ideas"': () => {
                dChr.currentState = "resigned"
                return `"I've some ideas." said the Mistress Badger, stammering a bit. In truth,
                she had no ideas at all, but was wholly discouraged at the notion of admitting it to anyone else.
                <p>Otter smiled. "You always do, dear Mistress Badger. You always do."`;
            },

            '"Can\'t chat, I have to run"': () => {
                endConversation();
                return `"Can't chat, I have to run," said the Badger suddenly, "Must go to help poor Owl."
                <p>"Of course," said the Otter with a tone of grave sincerity. "Pray let me know if I can help."`;
            }

        },

        "resigned": {

            '"Shan\'t give up"': () => {
                hideCurrentTopic();
                return `"Well, we shan\'t give up yet," said the Mistress Badger.
                "Never!" cried the Otter. "A staunch animal never quits."`;
            },

            '"Can\'t chat, I have to run"': () => {
                endConversation();
                return `"Can't chat, I have to run," said the Badger, "Must go to help poor Owl."
                <p>"Of course," said the Otter. "Perhaps a chat with Mr Walrus may be helpful. He appears to
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
    <p>His best friend, Squirrel, was grasping at the far end of the telescope, where the spying-glass was. "Let me see!
    It's my turn!"
    <p>"Now, boys," said Owl. "Be careful with my telescope. I've waited my whole life for tonight." Owl spoke with a kind of
    didactic inflection, professorially punctauting each syllable. Anybody with any sense considered
    Owl to be the very wisest on the matter of heaven-gazing. He was almost the wisest of all the animals, save perhaps for
    Mistress Badger.
    <p>"You had your turn!" said Chipmunk.
    <p>Owl scarcely noticed the boys, as he was now fully engaged in his own lecture. "Halley's Comet appears in the heavens only
    once every quarter-century. I saw it once before, as a very young Owl." Tears welled in his eyes. "And tonight, I shall see
    it again!"
    <p>"When will we see it?" asked Squirrel, grabbing the telescope again.
    <p>"Soon," said Owl. "Very soon. And with my beautiful telescope, at last I will see it close!"
    <p>"Can't you just fly up with your wings?" asked the Squirrel.
    <p>"Mine!" cried the Chipmunk, tugging the telescope again.
    <p>"No, mine!" shouted Squirrel.
    <p>The Badger, who had been quiet the entire time said: "Boys, oughten we be careful with Owl's telescope?"
    <p>Just as words were out of her mouth, the telescope tumbled. "No!" cried the Owl, unable to snatch it as it fell.
    <p>The boys were gone quick as a wind.
    <p>"I think it's okay!" said Owl, examining the view-lens. "It looks..."
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
    <p><i>Crack!</i> The glass fractured in a spiderweb pattern from the edge, and splintered into
    glitter on the ground.
    <p>Owl's lower beak began to shudder, and his eyes began to water. "My... the comet... no..." His words
    reduced to gibberish, and he fell to his knees. "Ack! Now my rheumatism...  Oh... Heavens..."
    <p>$Okay Badger, now what?`,

    exits: {
        "Okay Badger, now what?": {
            room: "lookingSpot"
        }
    }

}


Game.rooms.noDamageTelescopeRoom = {

    desc: () => `"It's okay!" said Owl. "It's really okay!"
    <p>"I believe so," said Mistress Badger. "It really does appear to be undamaged."
    <p>Owl did a little dance. While he was performing a sort of one-animal waltz, he accidentally tipped
    the telescope over. The glass fractured in a spiderweb pattern from the edge, and splintered into
    glitter on the ground.
    <p>Owl's lower beak began to shudder, and his eyes began to water. "My... the comet... no..." His words
    reduced to gibberish, and he fell to his knees. "Ack! Now my rheumatism...  Oh... Heavens..."
    <p>$Okay Badger, now what?`,

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
Game.scenery.moon = {

    noun: "moon",

    click: () => `The moon shines with a cheery brightness.`,

}

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

    characters: ["player"]

}