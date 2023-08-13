const gameboardModule = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const makeGameboard = () => {
        const theBoard = document.querySelector("#gameboard-container");
        for (let i = 0; i < gameboard.length; i++) {
            const gameboardSpace = document.createElement("button");
            gameboardSpace.id = i;
            gameboardSpace.classList.add("gameboard-space");
            gameboardSpace.textContent = gameboard[i];
            theBoard.append(gameboardSpace);
        }
    }

    const resetGameboard = () => {
        const allSpaces = document.querySelectorAll(".gameboard-space");
        allSpaces.forEach(space => space.remove());
    }
    return {gameboard, makeGameboard, resetGameboard}; 
})();

function createPlayer(name, symbol) {
    return {name, symbol}
}

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");

const gameController = (() => {
    const gameboard = gameboardModule.gameboard;
    let round = 0;

    function markSpace(e) {
        let targetSpace = gameboard[`${e.target.id}`];
        if (targetSpace === "") {
            if (round === 0 || round === 2 || round === 4 || round === 6 || round === 8) {
                targetSpace = player1.symbol;
                gameboard[`${e.target.id}`] = targetSpace;
            } else if (round === 1 || round === 3 || round === 5 || round === 7) {
                targetSpace = player2.symbol;
                gameboard[`${e.target.id}`] = targetSpace;
            }
        } else {
            return;
        }
        round++;
        playGame();
    }

    function playGame() {
        gameboardModule.resetGameboard();
        gameboardModule.makeGameboard();
        const spaces = document.querySelectorAll(".gameboard-space");
        spaces.forEach(space => space.addEventListener("click", markSpace))
    }

    function newGame() {
        round = 0;
        for (let i = 0; i < gameboard.length; i++) {
            gameboardModule.gameboard[i] = "";
        }
        playGame();
    }

    const newGameButton = document.querySelector("#new-game-button");
    newGameButton.addEventListener("click", newGame);

    return {playGame};
})();

gameController.playGame();