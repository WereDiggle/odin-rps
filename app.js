const rpsValues = ['rock', 'paper', 'scissors']
function getComputerChoice() {
  return rpsValues[Math.floor(Math.random()*rpsValues.length)]
}

// defines RPS reltions, key beats value
const rpsMap = {
  'rock': 'scissors',
  'scissors': 'paper',
  'paper': 'rock',
}

function playRound(playerSelection, computerSelection) {
  // It's a tie if both selections are the same
  if (playerSelection === computerSelection) {
    return 'tie';
  }
  if (rpsMap[playerSelection] === computerSelection) {
    return 'player';
  } else {
    return 'computer';
  }
}

function game(numRounds) {
  let playerWins = 0;
  let computerWins = 0;
  for (let i=1; i<=numRounds; i++) {
    console.log(`Round ${i}`);

    let playerChoice = prompt('Select your weapon', 'rock').toLowerCase();
    while (!(rpsValues.includes(playerChoice))) {
      playerChoice = prompt('Invalid choice, try again', 'rock').toLowerCase();
    }

    let computerChoice = getComputerChoice();
    console.log(`${playerChoice} VS ${computerChoice}`);
    let result = playRound(playerChoice, computerChoice);

    if (result === 'tie') {
      console.log('It is a tie');
    } else {
      console.log(`The winner is ${result}`);
      if (result === 'player') {
        playerWins++;
      } else if (result === 'computer') {
        computerWins++;
      } else {
        console.log(`Result is ${result}, shouldn't be possible`);
      }
    }
  }

  console.log(`player: ${playerWins}, computer: ${computerWins}`);
  if (playerWins > computerWins) {
    console.log('Congratulations, you win!');
  } else if (computerWins > playerWins) {
    console.log('Oh no, you lost :(');
  } else {
    console.log('OMG, a tie!');
  }
}

game(5);