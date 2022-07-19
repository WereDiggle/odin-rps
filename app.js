const rpsValues = ['rock', 'paper', 'scissors']
function getComputerChoice() {
  return rpsValues[Math.floor(Math.random()*rpsValues.length)]
}

function playRound(playerSelection, computerSelection) {
  // Check that values are valid 
  if (!(rpsValues.includes(playerSelection) && rpsValues.includes(computerSelection))) {
    return null
  }
  
  // It's a tie if both selections are the same
  if (playerSelection === computerSelection) {
    return 'tie';
  }
  // TODO: find a better way to do this later
  if (playerSelection === 'rock') {
    if (computerSelection === 'scissors') {
      return 'player'
    } else {
      return 'computer'
    }
  }
  if (playerSelection === 'paper') {
    if (computerSelection === 'rock') {
      return 'player'
    } else {
      return 'computer'
    }
  }
  if (playerSelection === 'scissors') {
    if (computerSelection === 'paper') {
      return 'player'
    } else {
      return 'computer'
    }
  }
}

function game(numRounds) {
  // TODO: stores wins for both computer and player
  // TODO: loop for numRounds
    // TODO: get player prompt for rps
    // TODO: check for correctness, case-insensitive

  // TODO: declare final winner
}