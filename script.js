// DOM
const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

const CHOICES = [
  {
    name: 'rock',
    beats: 'scissors',
  },
  {
    name: 'paper',
    beats: 'rock',
  },
  {
    name: 'scissors',
    beats: 'paper',
  },
];
const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.results');
const userChoice = document.querySelector('.results__user-image');
const aiChoice = document.querySelector('.results__ai-image');

const resultWinner = document.querySelector('.results__winner');
const resultText = document.querySelector('.results__text');

const playAgainBtn = document.querySelector('.play-again');

const scoreNumber = document.querySelector('.score__number');
let score = 0;

function choose(choice) {
  const aichoice = aiChoose();
  displayResults(choice, aichoice);
  displayWinner(choice, aichoice);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(choice, aichoice) {
  userChoice.innerHTML = `
          <div class="choice ${choice.name}">
            <img src="images/icon-${choice.name}.svg" alt="${choice.name}" />
          </div>
        `;
  setTimeout(() => {
    aiChoice.innerHTML = `
          <div class="choice ${aichoice.name}">
            <img src="images/icon-${aichoice.name}.svg" alt="${aichoice.name}" />
          </div>
        `;
  }, 600);

  gameDiv.classList.toggle('hidden');
  resultsDiv.classList.toggle('hidden');
}

function displayWinner(choice, aichoice) {
  setTimeout(() => {
    const userWins = isWinner(choice, aichoice);
    const aiWins = isWinner(aichoice, choice);

    if (userWins) {
      resultText.innerText = 'you win';
      userChoice.classList.toggle('winner');
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = 'you lose';
      aiChoice.classList.toggle('winner');
      keepScore(-1);
    } else {
      resultText.innerText = 'draw';
    }
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('show-winner');
  }, 1500);
}

function isWinner(choice, aichoice) {
  return choice.beats === aichoice.name;
}

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
}

playAgainBtn.addEventListener('click', () => {
  gameDiv.classList.toggle('hidden');
  resultsDiv.classList.toggle('hidden');

  userChoice.innerHTML = '';
  userChoice.classList.remove('winner');

  aiChoice.innerHTML = '';
  aiChoice.classList.remove('winner');

  resultText.innerText = '';
  resultWinner.classList.toggle('hidden');
  resultsDiv.classList.toggle('show-winner');
});

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});
btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});
