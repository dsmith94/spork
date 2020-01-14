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
