
const enterScreen = document.getElementById("enterScreen");
const questionsScreen = document.getElementById("questionsScreen");
const letterScreen = document.getElementById("letterScreen");

const enterButton = document.getElementById("enterButton");
const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const questionGif = document.getElementById("questionGif");

// Connect to Supabase safely.
// If Supabase fails to load, the Enter button will still work.

let supabaseClient = null;

if (
  window.supabase &&
  window.SUPABASE_URL &&
  window.SUPABASE_PUBLISHABLE_KEY
) {
  supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_PUBLISHABLE_KEY
  );
} else {
  console.error("Supabase library or configuration is missing.");
}

try {
  if (
    window.supabase &&
    typeof SUPABASE_URL !== "undefined" &&
    typeof SUPABASE_PUBLISHABLE_KEY !== "undefined" &&
    SUPABASE_URL &&
    SUPABASE_PUBLISHABLE_KEY
  ) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );
  } else {
    console.error(
      "Supabase library or configuration is missing. Answers cannot be saved yet."
    );
  }
} catch (error) {
  console.error("Supabase initialization failed:", error);
}

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
let isSaving = false;

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

    button.addEventListener("click", async () => {
      if (isSaving) return;

      isSaving = true;

      const allButtons =
        answersContainer.querySelectorAll("button");

      allButtons.forEach((item) => {
        item.disabled = true;
      });

      button.textContent = "Saving your answer… 💗";

      try {
        // Don't advance if the database isn't connected.
        if (!supabaseClient) {
          throw new Error(
            "Supabase is not connected. Check supabase-config.js and index.html."
          );
        }

        const { error } = await supabaseClient
          .from("project_return_answers")
          .insert({
            question_number: currentQuestion + 1,
            question_text: question.text,
            selected_answer: answer
          });

        if (error) throw error;

        // Move forward only after the answer is saved.
        currentQuestion++;

        if (currentQuestion < questions.length) {
          renderQuestion();
        } else {
          showScreen(letterScreen);
        }
      } catch (error) {
        console.error("Answer saving failed:", error);

        alert(
          "Couldn't save your answer. Please check the browser Console for details and try again."
        );

        allButtons.forEach((item) => {
          item.disabled = false;
        });

        button.textContent = answer;
      } finally {
        isSaving = false;
      }
    });

    answersContainer.appendChild(button);
  });
}

enterButton.addEventListener("click", () => {
  currentQuestion = 0;
  renderQuestion();
  showScreen(questionsScreen);
});
