const board = document.getElementById('board');
const rollButton = document.getElementById('rollButton');
const resetButton = document.getElementById(`resetButton`)
const dice = document.getElementById('dice');
const message = document.getElementById('message');
const currentPlayerDisplay = document.getElementById(`currentPlayer`);

let positions = 0;
const boardSize = 30; 
let currentPlayer = 0;

function initBoard() {
    for (let i = 0; i < boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        board.appendChild(cell);
    }
    updatePlayerPositions();
}


function updatePlayerPositions() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('player1', `player2`));
    cells[positions[0]].classList.add('player1');
    cells[positions[1]].classList.add('player2');
}


function rollDice() {
    const rolledValue = Math.floor(Math.random() * 6) + 1;
    dice.textContent = rolledValue;
    dice.src = `images/images/dice${rolledValue}.png`
    positions[currentPlayer] += rolledValue;

    if (positions[currentPlayer] >= boardSize) {
        positions[currentPlayer] = boardSize - 1; 
        message.textContent = `Player ${currentPlayer + 1} has reached the end!`;
        rollButton.disabled = true; 
    } else {
        message.textContent = `Player ${currentPlayer + 1} moved to position ${positions[currentPlayer] + 1}`;
    }

    updatePlayerPositions();

    currentPlayer = currentPlayer === 0 ? 1 : 0;
    currentPlayerDisplay.textContent = `Current Player: Player ${currentPlayer + 1}`;
}

function resetGame () {
    positions = [0, 0];
    rollButton.disabled = false;
    dice.src = `images/images/dice1.png`;
    message.textContent = ``;
    updatePlayerPositions();
    currentPlayer = 0;
    currentPlayerDisplay.textContent = `Current Player: Player ${currentPlayer + 1}`;
}


rollButton.addEventListener('click', rollDice);
resetButton.addEventListener(`click`, resetGame);


initBoard();
