let board = ["", "", "", "", "", "", "", "", ""];
let human = "X";
let ai = "O";
let currentPlayer = human;
let round = 1;
let scores = [83, 85, 87];

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

function updateStatus(message) {
    statusText.textContent = message + " | Round: " + round + " | Score: " + scores[round - 1];
}

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        let index = cell.getAttribute("data-index");
        if (board[index] === "" && currentPlayer === human) {
            board[index] = human;
            cell.textContent = human;
            if (checkWinner(board, human)) {
                updateStatus("You win!");
            } else if (board.every(cell => cell !== "")) {
                updateStatus("Draw!");
            } else {
                currentPlayer = ai;
                let aiMove = minimax(board, ai).index;
                board[aiMove] = ai;
                cells[aiMove].textContent = ai;
                if (checkWinner(board, ai)) {
                    updateStatus("AI wins!");
                } else if (board.every(cell => cell !== "")) {
                    updateStatus("Draw!");
                } else {
                    currentPlayer = human;
                }
            }
        }
    });
});

function checkWinner(board, player) {
    const winCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winCombos.some(combo =>
        combo.every(index => board[index] === player)
    );
}

function minimax(newBoard, player) {
    const availSpots = newBoard.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);

    if (checkWinner(newBoard, human)) return {score: -10};
    if (checkWinner(newBoard, ai)) return {score: 10};
    if (availSpots.length === 0) return {score: 0};

    let moves = [];

    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player;

        if (player === ai) {
            let result = minimax(newBoard, human);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, ai);
           Board[availSpots[i]] = "";
        moves.push(move);
    }

    let bestMove;
    if (player === ai) {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = human;
    cells.forEach(cell => cell.textContent = "");
    if (round < 3) {
        round++;
    }
    updateStatus("New round started");
}
