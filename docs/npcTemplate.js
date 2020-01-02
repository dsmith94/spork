
class NPCTalks extends NPCState {

    hasBeenAsked = false;

    shuffledMessages = [
        `THUMP. $librarian stamps a book.`,
        `Pages rustle as $librarian checks a book for damage.`,
        `The $librarian yawns.`,
    ];


    hello(parentState, parentNPC) {
        return `"Good evening," you say.
        <p>"Hello. Welcome to the Library."`;
    }

    bye(parentState, parentNPC) {
        return `"Thanks."
        <p>"Thank you."`;
    }


    howAreYou(parentState, parentNPC) {
        if (parentState.hasBeenAsked === false) {
            parentState.hasBeenAsked = true;
            return `"How's your night?" <p>"Good. Not too many overdue books."`;
        } else {
            return `"How's your night?" <p>"Still good."`;
        }
    }

    bookRecommendation(parentState, parentNPC) {
        parentState.removeTopic(parentNPC.currentTopic);
        return `"Read anything good lately?"
        <p>"<i>Moby Dick</i> is pretty good."
        <p>"I read that. It's very much a product of it's time."
        <p>"True."`;
    }


    areYouScottish(parentState, parentNPC) {
        parentState.removeTopic(parentNPC.currentTopic);
        return `"Are you Scottish?"
        <p>"A tiny bit, on my mother's side."`;
    }


    topics = new Map([
        [`ask how she is doing`, this.howAreYou ],
        [`ask for a book recommendation`, this.bookRecommendation ],
        [`ask if she is Scottish`, this.areYouScottish ],
        [`say goodbye`, function(s, n) { endConversation(); } ],
    ]);

}


class Librarian extends NPC {

    id = `librarian`;

    gender = `her`;

    properNoun() {
        return `the librarian`;
    }

    desc() {
        return `$librarian is middle-aged and wears bright clothes.
        Her hair is a bit of an orangish frazzle, and her green eyes twinkle slightly as she talks. `
    }

    currentState = 'talking';

    states = new Map([
        ['talking', new LibrarianTalks()],
    ]);

    focus() {
        beginConversation(this.id);
    }

}

