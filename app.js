// defines RPS reltions, key beats value
const rpsMap = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["scissors", "rock"],
};
const rpsValues = Object.keys(rpsMap);

const playerScoreNode = document.querySelector("#player-score");
const computerScoreNode = document.querySelector("#computer-score");
const winnerDeclareNode = document.querySelector("#winner-declaration");
const explanationNode = document.querySelector("#result-explanation");
const choiceCompareNode = document.querySelector("#choice-compare");
const selectionButtons = document.querySelectorAll("#left-panel > button");
const gameOverModal = document.querySelector("#game-over");

// Game state
let roundNum = 1;
let winCount = {
  player: 0,
  computer: 0,
};

function getComputerChoice() {
  return rpsValues[Math.floor(Math.random() * rpsValues.length)];
}

function decideWinner(playerSelection, computerSelection) {
  // It's a tie if both selections are the same
  if (playerSelection === computerSelection) {
    return null;
  }
  if (rpsMap[playerSelection].includes(computerSelection)) {
    return "player";
  } else {
    return "computer";
  }
}

function playRound(e) {
  if (winCount.player >= 5 || winCount.computer >= 5) return;
  const playerSelection = this.getAttribute("data-key");
  const computerSelection = getComputerChoice();
  const winner = decideWinner(playerSelection, computerSelection);

  // Update Score
  winCount[winner]++;
  playerScoreNode.textContent = `${winCount.player}`;
  computerScoreNode.textContent = `${winCount.computer}`;

  // Update selection
  choiceCompareNode.textContent = `${playerSelection} vs ${computerSelection}`;

  // Update Explanation
  if (winner === "player") {
    explanationNode.textContent = `${playerSelection} beats ${computerSelection}`;
    winnerDeclareNode.textContent = "Player wins";
  } else if (winner === "computer") {
    explanationNode.textContent = `${playerSelection} loses to ${computerSelection}`;
    winnerDeclareNode.textContent = "Computer wins";
  } else {
    explanationNode.textContent = "";
    winnerDeclareNode.textContent = "It's a tie";
  }

  if (winCount[winner] >= 5) {
    declareWinner(winner);
  }
}

selectionButtons.forEach((btn) => btn.addEventListener("click", playRound));

function game(numRounds) {
  let playerWins = 0;
  let computerWins = 0;
  for (let i = 1; i <= numRounds; i++) {
    console.log(`Round ${i}`);

    let playerChoice = prompt("Select your weapon", "rock").toLowerCase();
    while (!rpsValues.includes(playerChoice)) {
      playerChoice = prompt("Invalid choice, try again", "rock").toLowerCase();
    }

    let computerChoice = getComputerChoice();
    console.log(`${playerChoice} VS ${computerChoice}`);
    let result = playRound(playerChoice, computerChoice);

    if (result === "tie") {
      console.log("It is a tie");
    } else {
      console.log(`The winner is ${result}`);
      if (result === "player") {
        playerWins++;
      } else if (result === "computer") {
        computerWins++;
      } else {
        console.log(`Result is ${result}, shouldn't be possible`);
      }
    }
  }

  console.log(`player: ${playerWins}, computer: ${computerWins}`);
  if (playerWins > computerWins) {
    console.log("Congratulations, you win!");
  } else if (computerWins > playerWins) {
    console.log("Oh no, you lost :(");
  } else {
    console.log("OMG, a tie!");
  }
}

//game(5);
