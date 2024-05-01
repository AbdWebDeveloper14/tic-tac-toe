let gameBoard = document.querySelector('.game-board');
let squares = document.querySelectorAll('.square');
let currentPlayer = 'X';
let gameOver = false;

gameBoard.addEventListener('click', (e) => {
	if (e.target.classList.contains('square') && !gameOver) {
		let square = e.target;
		if (square.textContent === '') {
			square.textContent = currentPlayer;
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			checkWinner();
		}
	}
});

document.getElementById('reset').addEventListener('click', () => {
	squares.forEach((square) => {
		square.textContent = '';
	});
	currentPlayer = 'X';
	gameOver = false;
	document.getElementById('turn').textContent = 'Turn: X';
	document.getElementById('result').textContent = '';
});

function checkWinner() {
	const winningCombinations = [
		['top-left', 'top-middle', 'top-right'],
		['middle-left', 'middle-middle', 'middle-right'],
		['bottom-left', 'bottom-middle', 'bottom-right'],
		['top-left', 'middle-left', 'bottom-left'],
		['top-middle', 'middle-middle', 'bottom-middle'],
		['top-right', 'middle-right', 'bottom-right'],
		['top-left', 'middle-middle', 'bottom-right'],
		['top-right', 'middle-middle', 'bottom-left']
	];
	
	for (let combination of winningCombinations) {
		if (
			document.getElementById(combination[0]).textContent === currentPlayer &&
			document.getElementById(combination[1]).textContent === currentPlayer &&
			document.getElementById(combination[2]).textContent === currentPlayer
		) {
			gameOver = true;
			document.getElementById('result').textContent = `Player ${currentPlayer} wins!`;
			break;
		}
	}
	
	if (!gameOver && Array.from(squares).every((square) => square.textContent !== '')) {
		gameOver = true;
		document.getElementById('result').textContent = 'It\'s a draw!';
	}
	
	document.getElementById('turn').textContent = `Turn: ${currentPlayer}`;
}