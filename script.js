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

const gameController = (() => {
    const gameboard = gameboardModule.gameboard;
    let round = 0;
    let winner = "";
    let gameOver = false;

    function playGame() {
        if (gameOver === false) {
            gameboardModule.resetGameboard();
            gameboardModule.makeGameboard();
            const spaces = document.querySelectorAll(".gameboard-space");
            spaces.forEach(space => space.addEventListener("click", markSpace))
        }
    }

    function markSpace(e) {
        let targetSpace = gameboard[`${e.target.id}`];
        if (targetSpace === "" && round < 9) {
            if (round === 0 || round % 2 === 0) {
                targetSpace = player1.symbol;
                gameboard[`${e.target.id}`] = targetSpace;
            } else if (round % 2 !== 0) {
                targetSpace = player2.symbol;
                gameboard[`${e.target.id}`] = targetSpace;
            }
        } else {
            return;
        }
        round++;
        checkWinner();
        playGame();
    }

    function checkWinner() {
        if (round > 4 &&
            ((gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2] && gameboard[1] !== "") ||
            (gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5] && gameboard[4] !== "") ||
            (gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8] && gameboard[7] !== "") ||
            (gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6] && gameboard[3] !== "") ||
            (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7] && gameboard[4] !== "") ||
            (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8] && gameboard[5] !== "") ||
            (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8] && gameboard[4] !== "") ||
            (gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6] && gameboard[4] !== ""))
        ) {
            gameOver = true;
            if (round % 2 !== 0) {
                winner = player1.name;
            } else {
                winner = player2.name;
            }
        } else if (round === 9 && winner === "") {
            gameOver = true;
            winner = "It's a draw!";
        }

        if (gameOver === true) {
            gameboardModule.resetGameboard();
            gameboardModule.makeGameboard();
            displayWinner();
            const spaces = document.querySelectorAll(".gameboard-space");
            spaces.forEach(space => space.removeEventListener("click", markSpace))
        }
        return;
    }

    function displayWinner() {
        if (gameOver === true) {
            const winnerContainer = document.querySelector(".winner-container");
            const showWinner = document.querySelector(".display-winner");
            if (winner !== "It's a draw!") {
                showWinner.textContent = `${winner} is the winner!`;
            } else {
                showWinner.textContent = "It's a draw!";
            }
            winnerContainer.style.display = "block";
        }
        console.log(winner);
        return;
    }

    function newGame() {
        round = 0;
        winner = "";
        gameOver = false;
        for (let i = 0; i < gameboard.length; i++) {
            gameboardModule.gameboard[i] = "";
        }
        const winnerContainer = document.querySelector(".winner-container");
        winnerContainer.style.display = "none";
        playGame();
    }

    const newGameButton = document.querySelector("#new-game-button");
    newGameButton.addEventListener("click", newGame);

    const changeNamesButton = document.querySelector("#change-name-button");
    changeNamesButton.addEventListener("click", () => {
        player1.name = prompt("Enter name for Player 1: ");
        player2.name = prompt("Enter name for Player 2: ");
        const player1Name = document.querySelector(".player1");
        const player2Name = document.querySelector(".player2");
        player1Name.textContent = player1.name + ": " + player1.symbol;
        player2Name.textContent = player2.name + ": " + player2.symbol;
    })
    

    return {newGame};
})();

function createPlayer(name, symbol) {
    return {name, symbol}
}

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");

gameController.newGame();