const colors = ['yellow', 'red', 'blue', 'violet', 'green'];
let poopedBalloons = 0;
let gameOver = false;
let total = 100;
const rand = () => {
	return Math.random();
}

const createBallon = () => {
	const balloonDiv = document.createElement('div');
	//generate random number
	const randNum = Math.floor(rand() * colors.length);
	balloonDiv.classList.add('balloon', colors[randNum]);
	console.log(balloonDiv);
	//append it to the body
	document.body.appendChild(balloonDiv)
	//to get the ballon to be constricted within the width of the browser
	//window.innerWidth - width of ballon container , since the balloon will not touch the edge of the window 
	const windowWidth = Math.floor(rand() * (window.innerWidth - 100));

	balloonTransit(balloonDiv);
	balloonDiv.style.left = windowWidth + 'px';
}

function balloonTransit(div) {
	let xPos = 0;
	let interval = setInterval(frameMotion, 10 - Math.floor(poopedBalloons / 2));
	const windowHeight = window.innerHeight;

	function frameMotion() {
		//		console.log(xPos)
		if (xPos >= (windowHeight + 200)) {
			clearInterval(interval);
			gameOver = true;
			if (gameOver) {
				div.remove();
			}

		} else {
			xPos++;
			div.style.top = windowHeight - xPos + 'px'
		}
	}
}
//to create our balloons dynamically

function startGame() {
	restartGame();
	let timeout = 0;
	let gameLoop = setInterval(function () {
		timeout = Math.floor(Math.random() * 600 - 100)
		if (!gameOver && poopedBalloons < total) {
			createBallon()
		} else if (poopedBalloons !== total) {
			clearInterval(gameLoop);
			document.querySelector('.total-shadow').style.display = 'block';
			document.querySelector('.lose').style.display = 'block'
		} else {
			clearInterval(gameLoop);
			document.querySelector('.total-shadow').style.display = 'block';
			document.querySelector('.win').style.display = 'block'
		}

	}, 800 + timeout)
}


startGame();


function restartGame() {
	let removeBalloon = document.querySelectorAll('.balloon');
	removeBalloon.forEach(balloon => {
		balloon.remove()
	})
	gameOver = false;
	let poopedBalloons = 0;
	const scoreBoard = document.querySelectorAll('.point')

	scoreBoard.forEach(board => {
		board.textContent = `${poopedBalloons}`
	})
	poopedBalloons++;
}

//listen for event on the window
window.addEventListener('click', e => {

	if (e.target.classList.contains('balloon')) {
		e.target.remove();
		const scoreBoard = document.querySelectorAll('.point')
		poopedBalloons++;
		scoreBoard.forEach(board => {
			board.textContent = `${poopedBalloons}`
		})
	}
})

document.querySelector('.restart').addEventListener('click', () => {
	document.querySelector('.total-shadow').style.display = 'none';
	document.querySelector('.lose').style.display = 'none'
	document.querySelector('.win').style.display = 'none'
	startGame();
})

document.querySelector('.cancel').addEventListener('click', () => {
	document.querySelector('.total-shadow').style.display = 'none';
})
