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

    desc: () => `Mistress Badger took a closer look at the telescope. "Actually... I do see a tiny little--"
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
