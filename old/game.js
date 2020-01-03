

class Game extends CoreGameClass {

    buildFooterText() {
        return `Score: 0`;
    }

    constructor() {
        super();
        this.registry = new Map([
            ['lovesBooks', false],
        ]);
    
        this.map = new Map([
            [ 'inTheLibrary', new StartRoom() ],
        ]);

        this.playerNoun = `you`;

        this.turns = 0;
        this.currentRoom = this.map.get('inTheLibrary');
    
        this.prefaceText = applyEmphasis(`This is a template game. Mostly I use it to do testing.`);
    
    }
        
}

