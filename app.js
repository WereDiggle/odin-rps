// defines RPS reltions, key beats value
const rpsMap = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["scissors", "rock"],
};
const rpsValues = Object.keys(rpsMap);

function getComputerChoice() {
  return rpsValues[Math.floor(Math.random() * rpsValues.length)];
}

function playRound(playerSelection, computerSelection) {
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

const roundText = document.querySelector("#results > #round-text");
const playerText = document.querySelector("#results > #player-text");
const computerText = document.querySelector("#results > #computer-text");
const playerWins = document.querySelector("#results > #player-wins");
const computerWins = document.querySelector("#results > #computer-wins");
const winnerText = document.querySelector("#results > #winner-text");
const selectionButtons = document.querySelectorAll("#btn-container > button");

let roundNum = 1;
let winCount = {
  player: 0,
  computer: 0,
};

selectionButtons.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    if (winCount.player >= 5 || winCount.computer >= 5) return;
    const playerSelection = this.getAttribute("data-key");
    const computerSelection = getComputerChoice();
    const winner = playRound(playerSelection, computerSelection);
    roundText.textContent = `Round ${roundNum}`;
    playerText.textContent = `Player picks ${playerSelection}`;
    computerText.textContent = `Computer picks ${computerSelection}`;
    if (winner) {
      winCount[winner]++;
    }
    playerWins.textContent = `Player score: ${winCount.player}`;
    computerWins.textContent = `computer score: ${winCount.computer}`;
    if (winCount[winner] >= 5) {
      winnerText.textContent = `Winner is ${winner}`;
      // Remove event listeners
    }
    roundNum++;
  })
);

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
