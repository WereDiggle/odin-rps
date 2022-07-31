// defines RPS reltions, key beats value
const rpsMap = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["scissors", "rock"],
};
const rpsValues = Object.keys(rpsMap);

const icons = {
  rock: "./images/rock.svg",
  paper: "./images/paper.svg",
  scissors: "./images/scissors.svg",
  lizard: "./images/lizard.svg",
  spock: "./images/spock.svg",
};

const $ = (query) => document.querySelector(query);

// Game state
let roundNum = 1;
let winCount = {
  player: 0,
  computer: 0,
};
let playerSelection = null;
let computerSelection = null;
let roundWinner = null;

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

function endGame(winner) {
  const gameOverModal = document.querySelector("#game-over");
  // make game-over node overlay everything
  gameOverModal.classList.add("active");

  // Add game over text
  const gameOverText = document.querySelector("#game-over-text");
  gameOverText.textContent = `${winner} has won`;
}

function updateDisplay() {
  $("#player-score").textContent = `${winCount.player}`;
  $("#computer-score").textContent = `${winCount.computer}`;
  $("#player-choice").classList.remove("active");
  $("#computer-choice").classList.remove("active");
  $("#versus").classList.remove("active");
  if (!playerSelection || !computerSelection) {
    $("#player-choice").setAttribute("src", "");
    $("#computer-choice").setAttribute("src", "");
    $("#result-explanation").textContent = "";
    $("#winner-declaration").textContent = "";
    return;
  }

  // Update selection
  $("#player-choice").setAttribute("src", icons[playerSelection]);
  setTimeout(() => {
    $("#player-choice").classList.add("active");
  }, 0);

  $("#computer-choice").setAttribute("src", icons[computerSelection]);
  setTimeout(() => {
    $("#computer-choice").classList.add("active");
  }, 0);

  setTimeout(() => {
    $("#versus").classList.add("active");
  });

  // Update Explanation
  if (roundWinner === "player") {
    $(
      "#result-explanation"
    ).textContent = `${playerSelection} beats ${computerSelection}`;
    $("#winner-declaration").textContent = "Player wins";
  } else if (roundWinner === "computer") {
    $(
      "#result-explanation"
    ).textContent = `${playerSelection} loses to ${computerSelection}`;
    $("#winner-declaration").textContent = "Computer wins";
  } else {
    $("#result-explanation").textContent = "";
    $("#winner-declaration").textContent = "It's a tie";
  }
}

function playRound(e) {
  if (winCount.player >= 5 || winCount.computer >= 5) return;
  playerSelection = this.getAttribute("data-key");
  computerSelection = getComputerChoice();
  roundWinner = decideWinner(playerSelection, computerSelection);

  // Update Score
  winCount[roundWinner]++;

  updateDisplay();

  if (winCount[roundWinner] >= 5) {
    endGame(roundWinner);
  }
}

function resetGame() {
  // Reset game state
  roundNum = 1;
  winCount = {
    player: 0,
    computer: 0,
  };
  playerSelection = computerSelection = roundWinner = null;

  updateDisplay();

  // Remove game over screen
  const gameOverModal = document.querySelector("#game-over");
  gameOverModal.classList.remove("active");
}

document.querySelector("#play-again-btn").addEventListener("click", resetGame);
const selectionButtons = document.querySelectorAll("#left-panel > button");
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
