/*
 * General purpose utilities
 */


 /*
  * restartGame()
  *
  * Call to set current game to starting state.
  * This function will do so instantly, and without
  * consulting the player, so use appropriately.
  */
function restartGame() {
    const m = Object.create(metaInfo);
    document.title = m.title;
    __currentPlayer = m.startingPlayer;
    __currentNPCConversing = "";
    __displayObjects = [];
    dObj = null;
    game = Object.create(Game);
    game.title = m.title;
    buildConversationSchema();
}
