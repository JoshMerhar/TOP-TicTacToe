const gameboardModule = (function() {
    let gameboard = ["o", "x", "o", "o", "x", "x", "x", "o", "x"];

    function makeGameboard() {
        const theBoard = document.querySelector("#gameboard-container");
        for (let i = 0; i < gameboard.length; i++) {
            const gameboardSpace = document.createElement("div");
            gameboardSpace.textContent = gameboard[i];
            theBoard.append(gameboardSpace);
        }
    }
    return {
        gameboard: gameboard,
        makeGameboard: makeGameboard,
    }; 
})();

gameboardModule.makeGameboard();
let gameboard = gameboardModule.gameboard;

function createPlayer(name, symbol) {
    return {
        name: name,
        symbol: symbol,
        isTurn: false,
    }
}

const player1 = createPlayer("Player1", "x");
const player2 = createPlayer("Player2", "o");
