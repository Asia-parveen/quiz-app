const questions = [
  {
    question: " What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Model", correct: false },
      { text: "Document Order Model ", correct: false },
      { text: "Display Object Mangament", correct: false },
    ],
  },
  {
    question: " What is Next.js primarily used for?",
    answers: [
      { text: "styling react components", correct: false },
      { text: "Managing Databese", correct: false },
      { text: "creating Full-Stack React application", correct: true },
      { text: "Testing javascript code", correct: false },
    ],
  },
  {
    question: "What is the correct way to declare a JavaScript variable?",
    answers: [
      { text: "var myVariable;", correct: false },
      { text: "let myVariable;", correct: false },
      { text: "const myVariable;", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question: "Next>js is a framework of?",
    answers: [
      { text: "javascript;", correct: false },
      { text: "typescript;", correct: false },
      { text: "React", correct: true },
      { text: "All of the above", correct: false },
    ],
  },
  {
    question:
      "Which of the following is NOT a primitive data type in JavaScript?",
    answers: [
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Object", correct: true },
      { text: "Number", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answersButton = document.getElementById("answer-buttons");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

let index = 0;
let score = 0;

function startQuiz() {
  index = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[index];
  let questionNo = index + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answersButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    handleButtonVisibility();
    nextButton.style.display = "block";
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answersButton.firstChild) {
    answersButton.removeChild(answersButton.firstChild);
  }
}

function selectAnswer(e) {
  const selsectedButton = e.target;
  const isCorrect = selsectedButton.dataset.correct === "true";
  if (isCorrect) {
    selsectedButton.classList.add("correct");
    score++;
  } else {
    selsectedButton.classList.add("incorrect");
  }
  Array.from(answersButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  index++;
  if (index < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (index < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
// Function to handle the visibility of the 'Previous' button
function handleButtonVisibility() {
  if (index === 0) {
    prevButton.style.display = "none"; // Hide 'Previous' button on first question
  } else {
    prevButton.style.display = "inline-block"; // Show 'Previous' button after first question
  }
}

// Event listener for 'Show Previous' button
prevButton.addEventListener("click", () => {
  if (index > 0) {
    index--;
    showQuestion(index);
  } else {
    alert("This is the first question!");
  }
});

startQuiz();
