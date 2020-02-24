/*
 * General purpose utilities
 */

/**
 * 
 * Restart game. Should be used pretty much only once,
 * at game start, by internal spork code.
 * 
 * @example
 *  
 *  restartGame();
 * 
 */
function restartGame() {
    document.title = metaInfo.title;
    __currentPlayer = metaInfo.startingPlayer;
    __currentNPCConversing = "";
    __displayObjects = [];
    dObj = null;
    dNpc = null;
    game = $.extend(true, metaInfo, Game);
}
