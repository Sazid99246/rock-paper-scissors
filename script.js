function getComputerChoice() {
    const arr = ['rock', 'paper', 'scissors'];
    const indexNumber = Math.floor(Math.random() * 3);
    return arr[indexNumber];
}

function getHumanChoice() {
    const userChoice = prompt("Enter your choice: Rock, Paper, or Scissors");
    return userChoice;
}

function playRound(humanChoice, computerChoice, humanScore, computerScore) {
    humanChoice = humanChoice.toLowerCase();
    
    let resultMessage = "";
    
    if (humanChoice === computerChoice) {
        resultMessage = `It's a tie! Both chose ${humanChoice}.`;
    }
    else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "paper") ||
        (humanChoice === "paper" && computerChoice === "rock")
    ) {
        humanScore.value += 1;
        resultMessage = `You win! ${humanChoice} beats ${computerChoice}.`;
    } 
    else {
        computerScore.value += 1;
        resultMessage = `You lose! ${computerChoice} beats ${humanChoice}.`;
    }
    
    console.log(resultMessage);
}


function playGame() {
    const humanScore = { value: 0 };
    const computerScore = { value: 0 };

    console.log("--- Starting Rock Paper Scissors: Best of 5 Rounds ---");

    for (let i = 1; i <= 5; i++) {
        console.log(`\n--- Round ${i} ---`);
        
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        
        playRound(humanSelection, computerSelection, humanScore, computerScore);
        
        console.log(`Current Score: You ${humanScore.value} | Computer ${computerScore.value}`);
    }

    console.log("\n*** FINAL GAME RESULT ***");
    console.log(`Final Score: You ${humanScore.value} | Computer ${computerScore.value}`);

    if (humanScore.value > computerScore.value) {
        console.log("🎉 CONGRATULATIONS! You won the best of 5 game!");
    } else if (computerScore.value > humanScore.value) {
        console.log("🤖 GAME OVER! The computer wins the best of 5 game.");
    } else {
        console.log("🤝 The game ends in a TIE!");
    }
}

playGame();