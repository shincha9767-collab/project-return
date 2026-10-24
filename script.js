
const enterScreen = document.getElementById("enterScreen");
const questionsScreen = document.getElementById("questionsScreen");
const letterScreen = document.getElementById("letterScreen");

const enterButton = document.getElementById("enterButton");
const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const questionGif = document.getElementById("questionGif");

const questions = [
  {
    text: "Am I really special to you? 💗",
    answers: [
      "Yes, of course! 🩷",
      "No 🙈",
      "Arey pagal, you're too much! 😭💕",
      "Maybe... 👀"
    ],
    gif: "dudu-bubu-1.gif"
  },
  {
    text: "Did you like this surprise? 🎀",
    answers: [
      "Yes, I loved it! 🥹💗",
      "No 🙈",
      "I honestly didn't expect this! 😭",
      "Like, whyyy? 😂"
    ],
    gif: "dudu-bubu-2.gif"
  },
  {
    text: "Are you ready to be my pasandida aurat? 🫶🏻",
    answers: [
      "Nahi, bilkul nahi! 😂",
      "Yes, of course! 💗",
      "Not sure yet 🙈",
      "Of course! From the very beginning, I could see your efforts, and that means so much to me. 🥹🩷"
    ],
    gif: "dudu-bubu-3.gif"
  }
];

let currentQuestion = 0;
let isAdvancing = false;

function showScreen(screenToShow) {
  [enterScreen, questionsScreen, letterScreen].forEach((screen) => {
    screen.classList.remove("active");
    screen.classList.add("hidden");
  });

  screenToShow.classList.remove("hidden");
  screenToShow.classList.add("active");
}

function renderQuestion() {
  const question = questions[currentQuestion];

  questionCount.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionText.textContent = question.text;
  questionGif.src = question.gif;
  questionGif.alt = "Cute Dudu and Bubu";

  answersContainer.replaceChildren();

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      if (isAdvancing) return;
      isAdvancing = true;

      currentQuestion++;

      if (currentQuestion < questions.length) {
        renderQuestion();
      } else {
        showScreen(letterScreen);
      }

      isAdvancing = false;
    });

    answersContainer.appendChild(button);
  });
}

enterButton.addEventListener("click", () => {
  currentQuestion = 0;
  renderQuestion();
  showScreen(questionsScreen);
});
