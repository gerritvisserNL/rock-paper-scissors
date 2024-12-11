'use strict'

const gameIcons = ["\u270A", "\u270B", "\u270C"]; // Unicode Escape Sequences Rock / Paper / Scissors
const buttonIds = ['rockButton', 'paperButton', 'scissorsButton']; 
const buttonsContainer = document.querySelector('.buttons');

// Disable all buttons on page load.
window.onload = () => {
  disableAllButtons();
};

// Function to disable all buttons
const disableAllButtons = () => {
    buttonIds.forEach(id => {
        document.getElementById(id).classList.add('disabled');
    });
};

// Function to enable all buttons
const enableAllButtons = () => {
    buttonIds.forEach(id => {
        document.getElementById(id).classList.remove('disabled');
    });
};

// function to hide startButton (and resetgame)
const hideStartButton = () => { 
    botScore = 0;
    userScore = 0;
    updateScores(botScore, userScore);
    enableAllButtons();
    resetMessage();

    const startButton = document.getElementById('startButton');
    startButton.style.visibility = "hidden";
};

const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    hideStartButton();
});

startButton.addEventListener('touchstart', () => {
    hideStartButton()
});

// function to spin icons
const intervalIconChanger = 100; // 100 milliseconds
let timeoutIconChanger;

const iconChanger = (i) => {
    
    document.getElementById('boxBot').innerText = gameIcons[i];
    document.getElementById('boxUser').innerText = gameIcons[i];
    
    i = (i + 1) % gameIcons.length; // loop over gameIcons
    
    timeoutIconChanger = setTimeout(() => iconChanger(i), intervalIconChanger);
};

startButton.addEventListener('click', () => {
    iconChanger(0);
});

startButton.addEventListener('touchstart', () => {
    iconChanger(0);
});

// add click EvenListeners to gamebuttons
buttonIds.forEach(id => {
    const button = document.getElementById(id);
    
    const handleEvent = () => {
        getRandomGameIcon(gameIcons);
        showChosenGameIcon(id);
    }

    button.addEventListener('click', handleEvent);
    button.addEventListener('touchstart', handleEvent);
});

// function to start breakTimer after rock/paper/scissor is clicked.
const breakTime = 2500 // 2.5 seconds
let timeoutBreakTimer;

const startBreakTimer = () => {
    timeoutBreakTimer = setTimeout(() => {
        iconChanger(0);
        resetMessage();
        enableAllButtons();
    }, breakTime);
};

// function to show random gameIcon in botBox
let randomGameIcon;

const getRandomGameIcon = (gameIcons) => {
    const randomGameIconIndex = Math.floor(Math.random() * gameIcons.length);
    randomGameIcon = gameIcons[randomGameIconIndex];

    document.getElementById('boxBot').innerText = randomGameIcon;
};

// Function to show chosen gameIcon when rock/paper/scissor is clicked.
let userChoice;
    
const showChosenGameIcon = id => {
    if (timeoutIconChanger) {
        clearTimeout(timeoutIconChanger);
    }

    startBreakTimer();

    switch(id) {
        case 'rockButton':
            userChoice = gameIcons[0];
            document.getElementById('boxUser').innerText = gameIcons[0];
            break;
        case 'paperButton': 
            userChoice = gameIcons[1];
            document.getElementById('boxUser').innerText = gameIcons[1];
            break;
        case 'scissorsButton': 
            userChoice = gameIcons[2];
            document.getElementById('boxUser').innerText = gameIcons[2];
            break;
        default: 
            break;
    }
    
    disableAllButtons();
    compareGameIconsChoices(userChoice, randomGameIcon);
};

// function to count botScore
let botScore = 0;
const countBotScore = () => {
    botScore++
    updateScores(botScore, userScore);
    if (botScore === 6) {
        showMessage("Bummer, BOT won!");
        gameOver();
        return;
    }
};

// function to count userScore
let userScore = 0;
const countUserScore = () => {
    userScore++
    updateScores(botScore, userScore);
    if (userScore === 6) {
        confetti();
        showMessage("Congrats! You won!");
        gameOver();
        return;
    }
};

// function to update Scores
const updateScores = (botScore, userScore) => {
document.getElementById(`botScore`).textContent  = `BOT Score:  ${botScore}`;
document.getElementById(`userScore`).textContent  = `Your Score:  ${userScore}`;
};

// function to compare userChoice and randomGameIcon
const compareGameIconsChoices = (userChoice, randomGameIcon) => {
    // rock - rock    
    if (userChoice === gameIcons[0] && randomGameIcon === gameIcons[0]) {
    showMessage("It's a tie");
    }
    
    // rock - paper
    if (userChoice === gameIcons[0] && randomGameIcon === gameIcons[1]) {
    showMessage("You lose!");
    countBotScore();
    }
    
    // rock - scissors
    if (userChoice === gameIcons[0] && randomGameIcon === gameIcons[2]) {
        showMessage("You win!");
        countUserScore();
    }

    // paper - rock
    if (userChoice === gameIcons[1] && randomGameIcon === gameIcons[0]) {
        showMessage("You win!");
        countUserScore();
    }

    // paper - paper
    if (userChoice === gameIcons[1] && randomGameIcon === gameIcons[1]) {
        showMessage("It's a tie!");
    }

    // paper - scissors
    if (userChoice === gameIcons[1] && randomGameIcon === gameIcons[2]) {
        showMessage("You lose!");
        countBotScore();
    }

    // scissors - rock
    if (userChoice === gameIcons[2] && randomGameIcon === gameIcons[0]) {
        showMessage("You lose!");
        countBotScore();
    }
    
    // scissors - paper
    if (userChoice === gameIcons[2] && randomGameIcon === gameIcons[1]) {
        showMessage("You win!");
        countUserScore();
    }

    // scissors - scissors
    if (userChoice === gameIcons[2] && randomGameIcon === gameIcons[2]) {
        showMessage("It's a tie!");
    }
};

// Function to show message
const showMessage = (message) => {
    document.getElementById('message').textContent = message;
};

// Function to reset message
const resetMessage = () => {
    document.getElementById('message').textContent = '\u00A0'
};

// Function to end game
const gameOver = () => {
    if (timeoutBreakTimer) {
        clearTimeout(timeoutBreakTimer);
    }
    disableAllButtons();
    showStartButton();
};

const showStartButton = () => {
    const button = document.getElementById('startButton');
    button.style.visibility = "visible";
};