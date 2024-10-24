const choices = document.querySelectorAll('.choice');
const userChoiceDisplay = document.querySelector('#user-choice span');
const computerChoiceDisplay = document.querySelector('#computer-choice span');
const winnerDisplay = document.getElementById('winner');
const playAgainBtn = document.querySelector('.play-again');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');

let playerScore = 0;
let computerScore = 0;

const choicesArray = ['rock', 'paper', 'scissors'];

// Add event listeners to the buttons
choices.forEach(choice => {
    choice.addEventListener('click', function () {
        playGame(this.id);
    });
});

function playGame(userChoice) {
    const computerChoice = getComputerChoice();

    // Show choices
    userChoiceDisplay.textContent = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
    computerChoiceDisplay.textContent = "...";

    setTimeout(() => {
        computerChoiceDisplay.textContent = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
        const winner = getWinner(userChoice, computerChoice);
        winnerDisplay.textContent = winner;

        // Update Scores
        updateScores(winner);
        checkGameEnd();

        // Only disable choices if game is over
        if (playerScore === 5 || computerScore === 5) {
            choices.forEach(choice => {
                choice.disabled = true;
            });

            // Show Play Again button
            playAgainBtn.style.display = 'inline-block';
        }

    }, 1000); // 1 second delay to simulate suspense
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choicesArray[randomIndex];
}

function getWinner(user, computer) {
    if (user === computer) {
        return 'It\'s a Draw!';
    }

    if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'scissors' && computer === 'paper') ||
        (user === 'paper' && computer === 'rock')
    ) {
        return 'You Win!';
    } else {
        return 'Computer Wins!';
    }
}

function updateScores(winner) {
    if (winner === 'You Win!') {
        playerScore++;
    } else if (winner === 'Computer Wins!') {
        computerScore++;
    }
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function checkGameEnd() {
    if (playerScore === 5 || computerScore === 5) {
        if (playerScore === 5) {
            winnerDisplay.textContent = 'Congratulations! You won the game!';
        } else {
            winnerDisplay.textContent = 'Game Over! Computer won the game!';
        }
    }
}

// Restart the game when Play Again button is clicked
playAgainBtn.addEventListener('click', () => {
    // Reset scores
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';

    // Hide the play again button
    playAgainBtn.style.display = 'none';
    userChoiceDisplay.textContent = '';
    computerChoiceDisplay.textContent = '';
    winnerDisplay.textContent = '';

    // Enable choices for the next game
    choices.forEach(choice => {
        choice.disabled = false;
    });
});
