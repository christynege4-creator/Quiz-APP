const questions = [
  {
    question: "What is the name of @Beluga's Channel?",
    answers: [
      "Beluga",
      "Begula",
      "@Beluga1",
      "BelugaTV"
    ],
    correct: 0
  },

  {
    question: "What coding languages does Bloxd.io support?",
    answers: [
      "Text and Markdown",
      "TypeScript and JavaScript",
      "Python and C++",
      "HTML and CSS"
    ],
    correct: 1
  },

  {
    question: "How many games are available on Bloxd.io?",
    answers: [
      "I don't know",
      "100+",
      "50+",
      "10+"
    ],
    correct: 1
  },

  {
    question: "What is the capital of Nigeria?",
    answers: [
      "Lagos",
      "Abuja",
      "Kano",
      "Port Harcourt"
    ],
    correct: 1
  },

  {
    question: "What is the largest planet in our solar system?",
    answers: [
      "Earth",
      "Jupiter",
      "Saturn",
      "Mars"
    ],
    correct: 1
  },

  {
    question: "What is the smallest country in the world?",
    answers: [
      "Vatican City",
      "Monaco",
      "Nauru",
      "San Marino"
    ],
    correct: 0
  },

  {
    question: "What is the currency of Japan?",
    answers: [
      "Yen",
      "Dollar",
      "Euro",
      "Pound"
    ],
    correct: 0
  },

  {
    question: "What is the highest mountain in the world?",
    answers: [
      "Mount Everest",
      "K2",
      "Kangchenjunga",
      "Lhotse"
    ],
    correct: 0
  },

  {
    question: "What is the largest ocean in the world?",
    answers: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean"
    ],
    correct: 3
  }
];
/* CONSTANTS */
const quizContainer = document.getElementById("quizContainer");
const resultPage = document.getElementById("resultPage");

const question = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answerBtn");

const currentQuestion = document.getElementById("currentQuestion");
const totalQuestion = document.getElementById("totalQuestion");

const time = document.getElementById("time");

const nextBtn = document.getElementById("nextBtn");

const score = document.getElementById("score");

const finalScore = document.getElementById("finalScore");
const message = document.getElementById("message");

const restartBtn = document.getElementById("restartBtn");


let questionIndex = 0;
let playerScore = 0;
let timeLeft = 60;
let timer;


totalQuestion.textContent = questions.length;


function startQuiz() {
  questionIndex = 0;
  playerScore = 0;

  score.textContent = playerScore;

  quizContainer.style.display = "block";
  resultPage.style.display = "none";

  startTimer();
  showQuestion();
}


function showQuestion() {
  const current = questions[questionIndex];

  question.textContent = current.question;

  currentQuestion.textContent = questionIndex + 1;

  answerButtons.forEach((button, index) => {
    button.textContent = current.answers[index];

    button.classList.remove("correct");
    button.classList.remove("wrong");

    button.disabled = false;

    button.onclick = () => selectAnswer(index);
  });

  nextBtn.style.display = "none";
}


function selectAnswer(selectedIndex) {
  const current = questions[questionIndex];

  answerButtons.forEach(button => {
    button.disabled = true;
  });

  if (selectedIndex === current.correct) {
    answerButtons[selectedIndex].classList.add("correct");

    playerScore++;

    score.textContent = playerScore;
  } else {
    answerButtons[selectedIndex].classList.add("wrong");

    answerButtons[current.correct].classList.add("correct");
  }

  nextBtn.style.display = "block";
}


nextBtn.addEventListener("click", () => {
  questionIndex++;

  if (questionIndex < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
});


function startTimer() {
  clearInterval(timer);

  timeLeft = 60;
  time.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;

    time.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);

      finishQuiz();
    }
  }, 1000);
}


function finishQuiz() {
  clearInterval(timer);

  quizContainer.style.display = "none";
  resultPage.style.display = "block";

  finalScore.textContent =
    `Your Score: ${playerScore} / ${questions.length}`;

  const percentage =
    (playerScore / questions.length) * 100;

  if (percentage === 100) {
    message.textContent = "Perfect score! Excellent work!";
  } else if (percentage >= 80) {
    message.textContent = "Great job!";
  } else if (percentage >= 50) {
    message.textContent = "Good effort!";
  } else {
    message.textContent = "Keep practising and try again!";
  }
}


restartBtn.addEventListener("click", () => {
  startQuiz();
});


startQuiz();