const colors = ['yellow', 'red', 'blue', 'violet', 'green'];
const windowWidth = window.innerWidth;
let num = 0;
const total = 100;
let currentBalloon = 0;
let gameOver = false;
const scoreBoard = document.querySelectorAll('.point');
const rand = () => {
    return Math.random();
}
function createBalloon() {
    const BalloonDiv = document.createElement('div');
    let randNum = Math.floor(rand() * colors.length);
    BalloonDiv.classList.add('balloon', colors[randNum]);

    const xPos = Math.floor(rand() * (windowWidth - 100))

    BalloonDiv.style.left = `${xPos}px`

    BalloonDiv.setAttribute('data-number', currentBalloon)
    //BalloonDiv.dataset.number = currentBalloon;
    currentBalloon++;

    animateBalloon(BalloonDiv)
    document.body.insertAdjacentElement('beforeend', BalloonDiv)
}

function animateBalloon(elem) {
    let yPos = 0;
    let random = Math.floor(rand() * 6 - 3)
    // increase game speed after 10 balloons are released
    let interval = setInterval(frame, Math.abs(10 - Math.floor(num / 10)))

    function frame() {

        if (yPos >= window.innerHeight + 200 && document.querySelector(`[data-number='${elem.dataset.number}']`) !== null) {
            clearInterval(interval)
            gameOver = true;
            deleteBalloon(elem)
        } else {
            yPos++;
            elem.style.top = `${window.innerHeight - yPos}px`
        }
    }
}

function deleteBalloon(elem) {
    // if (document.querySelector(`[data-number='${elem.dataset.number}']`) !== null) {
    //     elem.remove()
    //     updateScore()
    // }
    elem.remove()
    playBallSound()
    num++
}

function startGame() {
    restartGame();
    let timeout = 0;
    let loop = setInterval(function () {
        timeout = Math.floor(rand() * 600 - 100)
        if (!gameOver && num !== total) {
            createBalloon()
        } else if (num !== total) {
            clearInterval(loop);
            document.querySelector('.total-shadow').style.display = 'flex'
            document.querySelector('.lose').style.display = 'block'
        } else {
            clearInterval(loop);
            document.querySelector('.total-shadow').style.display = 'flex'
            document.querySelector('.win').style.display = 'block'
        }
    }, 800 + timeout)
}

startGame()

// on clicking on yes button, clear all balloons
function restartGame() {
    let forRemoving = document.querySelectorAll('.balloon');
    forRemoving.forEach(balloon => {
        balloon.remove()
    })
    // reset the game parameters
    gameOver = false
    num = 0
    updateScore()
}

function updateScore() {
    scoreBoard.forEach(board => {
        board.textContent = num;
    })
}

function playBallSound() {
    let audio = new Audio('/media/sounds/pop.mp3');
    audio.play()
}


window.addEventListener('click', e => {
    if (e.target.classList.contains('balloon')) {

        deleteBalloon(e.target)
        updateScore()
    }

})

document.querySelector('.restart').addEventListener('click', e => {
    document.querySelector('.total-shadow').style.display = 'none'
    document.querySelector('.win').style.display = 'none'
    document.querySelector('.lose').style.display = 'none'
    // to enusre that the game starts
    num = 0
    startGame()
})

document.querySelector('.cancel').addEventListener('click', e => {
    document.querySelector('.total-shadow').style.display = 'none'
})