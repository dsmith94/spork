class CoreGameClass {

    constructor() {
        this.map = new Map();
        this.currentNPCConversing = '';
        this.messages = [];
        this.currentExit = ``;
        this.environmentalMessages = [];
        this.mode = "normal";
        this.inventory = [];
    }


    buildHeaderText() {
        return ``;
    }


    buildFooterText() {
        return ``;
    }

    inInventory(id) {
        if (this.inventory.indexOf(id) > -1) {
            return true;
        }
        return false;
    }


    handleRoomTransfer(id) {
        const r = this.map.get(id);
        const e = document.getElementById('Actions');
        if (r) {
            if (e) {
                e.innerHTML = ``;
            }
            this.currentExit = `${id}`;
            if (typeof this.currentRoom.exitText === "function") {
                var t = this.currentRoom.exitText();
                if (t) {
                    this.mode = "cutscene";
                    addDisplayMessage(t);
                }
            }
            this.currentRoom = r;
            if (typeof this.currentRoom.enterText === "function") {
                var t = this.currentRoom.enterText();
                if (t) {
                    this.mode = "cutscene";
                    addDisplayMessage(t);
                }
            }
            this.currentExit = ``;
            showRoom();
        }
    }

}
