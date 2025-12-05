// Global variables for persistent score tracking (Step 4 equivalent)
let humanScore = 0;
let computerScore = 0;
const WINNING_SCORE = 5;

// DOM element references
const humanScoreEl = document.getElementById('human-score');
const computerScoreEl = document.getElementById('computer-score');
const roundResultEl = document.getElementById('round-result');
const gameMessageEl = document.getElementById('game-message');
const buttons = document.querySelectorAll('#button-container button');
const resetButton = document.getElementById('reset-btn');

// Function to get the computer's choice (Step 2 equivalent)
function getComputerChoice() {
    const arr = ['rock', 'paper', 'scissors'];
    const indexNumber = Math.floor(Math.random() * 3);
    return arr[indexNumber];
}

// Function to update the score display in the UI
function updateScoreDisplay() {
    humanScoreEl.textContent = humanScore;
    computerScoreEl.textContent = computerScore;
}

// Function to handle the end of the game
function checkWinner() {
    if (humanScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
        let finalMessage = "";
        if (humanScore === WINNING_SCORE) {
            finalMessage = "🎉 YOU ARE THE CHAMPION! You reached 5 points!";
            gameMessageEl.className = 'text-xl font-extrabold text-center text-green-600';
        } else {
            finalMessage = "🤖 GAME OVER! The computer wins this time.";
            gameMessageEl.className = 'text-xl font-extrabold text-center text-red-600';
        }

        roundResultEl.textContent = "Game Complete.";
        gameMessageEl.textContent = finalMessage;

        // Disable all game buttons
        buttons.forEach(btn => btn.disabled = true);

        // Show the reset button
        resetButton.classList.remove('hidden');

        return true; // Game is over
    }
    return false; // Game continues
}

// The core game logic for a single round (Refactored from Step 5)
function playRound(humanChoice) {
    // Check if the game is already over before proceeding
    if (humanScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
        return;
    }

    const computerChoice = getComputerChoice();
    let resultMessage = "";
    humanChoice = humanChoice.toLowerCase();

    // 1. Handle Tie
    if (humanChoice === computerChoice) {
        resultMessage = `It's a tie! Both chose ${humanChoice}.`;
    }
    // 2. Handle Human Win
    else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "paper") ||
        (humanChoice === "paper" && computerChoice === "rock")
    ) {
        humanScore += 1;
        resultMessage = `You win! ${humanChoice} beats ${computerChoice}.`;
    }
    // 3. Handle Computer Win
    else {
        computerScore += 1;
        resultMessage = `You lose! ${computerChoice} beats ${humanChoice}.`;
    }

    // Update the results display
    roundResultEl.textContent = resultMessage;
    gameMessageEl.textContent = `You chose ${humanChoice}, Computer chose ${computerChoice}.`;
    gameMessageEl.className = 'text-base font-semibold text-center text-gray-700';

    // Update the running score display
    updateScoreDisplay();

    // Announce winner if score limit reached
    checkWinner();
}

// Function to reset the game state
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    updateScoreDisplay();
    roundResultEl.textContent = "Click a button to start the game!";
    gameMessageEl.textContent = "First to 5 points wins!";
    gameMessageEl.className = 'text-xl font-extrabold text-center text-indigo-600';
    buttons.forEach(btn => btn.disabled = false);
    resetButton.classList.add('hidden');
}

// Add event listeners to buttons (Step 6 equivalent)
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // The humanChoice is derived from the button's ID (e.g., 'rock-btn' -> 'rock')
        const humanSelection = button.id.split('-')[0];
        playRound(humanSelection);
    });
});

// Initialize score display on load
updateScoreDisplay();

// console.log("Hello World"); // Initial console log check, kept for consistency with original Step 1