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

let timeLeft = 120;
const timerDisplay = document.getElementById("time");
const countadown = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(countadown);
    alert("time's up!");
    submitQuiz();
  }
}, 1000);

function submitQuiz() {
  const totalQuestions = questions.length;
  const percentage = (score / totalQuestions) * 100;

  // Get the result div (create it in HTML if you haven't)
  const resultDiv = document.getElementById("result");

  // Show percentage and remarks
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `You scored ${percentage.toFixed(2)} % !`;

  // Add remarks based on score
  if (percentage >= 80) {
    resultDiv.innerHTML += "<br>🎉 Congratulations! Great job! Keep it up 🎉";
    // resultDiv.innerHTML.style.fontSize = 14;
    document.body.style.backgroundColor = "#DFF2BF"; // Light green background

    // Add a video element dynamically
    resultDiv.innerHTML += `<br>
      <video width="520" height="400" autoplay>
        <source src="party.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>`;
  } else if (percentage >= 50) {
    resultDiv.innerHTML += "<br>👍 Good effort! Keep practicing!";
    document.body.style.backgroundColor = "#FEEFB3"; // Light yellow background
  } else {
    resultDiv.innerHTML += "<br>😟 Don't give up! You can do better next time!";
    document.body.style.backgroundColor = "#FFBABA"; // Light red background
  }

  // Add a reset quiz button
  resultDiv.innerHTML += `<br><button id="reset-btn" class="btn">Reset Quiz</button>`;

  // Add event listener to reset button to reset the quiz
  document.getElementById("reset-btn").addEventListener("click", resetQuiz);

  // Stop the timer and disable further interactions
  clearInterval(countadown);
}

function resetQuiz() {
  // Reset the score and index
  score = 0;
  index = 0;

  // Reset the timer
  timeLeft = 120;
  timerDisplay.textContent = timeLeft;

  // Hide the result div
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "none";

  // Reset the background color to default
  document.body.style.backgroundColor = "";

  // Start the quiz again
  startQuiz();
}

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
  questionElement.innerHTML = `You Marks ${score} out of ${questions.length}!`;
  submitQuiz(); // Automatically show results
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

// let timeLeft = 180;
// const timerDisplay = document.getElementById("time");
// const countadown = setInterval(() => {
//   timeLeft--;
//   timerDisplay.textContent = timeLeft;
//   if (timeLeft <= 0) {
//     clearInterval(countadown);
//     alert("time's up!");
//     submitQuiz();
//   }
// }, 1000);

// function submitQuiz() {
//   const totalQuestions = questions.length;
//   const percentage = (score / totalQuestions) * 100;

//   // Get the result div (create it in HTML if you haven't)
//   const resultDiv = document.getElementById("result");

//   // Show percentage and remarks
//   resultDiv.style.display = "block";
//   resultDiv.innerHTML = `You scored ${percentage.toFixed(2)}%!`;

//   // Add remarks based on score
//   if (percentage >= 80) {
//     resultDiv.innerHTML += "<br>🎉 Congratulations! Great job! 🎉";
//     document.body.style.backgroundColor = "#DFF2BF"; // Light green background
//     resultDiv.innerHTML += '<br><img src="path/to/party-popper.png" alt="Party Popper" width="100">';
//   } else if (percentage >= 50) {
//     resultDiv.innerHTML += "<br>👍 Good effort! Keep practicing!";
//     document.body.style.backgroundColor = "#FEEFB3"; // Light yellow background
//   } else {
//     resultDiv.innerHTML += "<br>😟 Don't give up! You can do better next time!";
//     document.body.style.backgroundColor = "#FFBABA"; // Light red background
//   }

//   // Stop the timer and disable further interactions
//   clearInterval(countadown);
// }

// const questionElement = document.getElementById("question");
// const answersButton = document.getElementById("answer-buttons");
// const prevButton = document.getElementById("prev-btn");
// const nextButton = document.getElementById("next-btn");

// let index = 0;
// let score = 0;

// function startQuiz() {
//   index = 0;
//   score = 0;
//   nextButton.innerHTML = "Next";
//   showQuestion();
// }

// function showQuestion() {
//   resetState();
//   let currentQuestion = questions[index];
//   let questionNo = index + 1;
//   questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
//   currentQuestion.answers.forEach((answer) => {
//     const button = document.createElement("button");
//     button.innerHTML = answer.text;
//     button.classList.add("btn");
//     answersButton.appendChild(button);
//     if (answer.correct) {
//       button.dataset.correct = answer.correct;
//     }
//     button.addEventListener("click", selectAnswer);
//     handleButtonVisibility();
//     nextButton.style.display = "block";
//   });
// }

// function resetState() {
//   nextButton.style.display = "none";
//   while (answersButton.firstChild) {
//     answersButton.removeChild(answersButton.firstChild);
//   }
// }

// function selectAnswer(e) {
//   const selsectedButton = e.target;
//   const isCorrect = selsectedButton.dataset.correct === "true";
//   if (isCorrect) {
//     selsectedButton.classList.add("correct");
//     score++;
//   } else {
//     selsectedButton.classList.add("incorrect");
//   }
//   Array.from(answersButton.children).forEach((button) => {
//     if (button.dataset.correct === "true") {
//       button.classList.add("correct");
//     }
//     button.disabled = true;
//   });
//   nextButton.style.display = "block";
// }

// function showScore() {
//   resetState();
//   questionElement.innerHTML = `You Marks ${score} out of ${questions.length}!`;
//   submitQuiz(); // Automatically show results
// }

// function handleNextButton() {
//   index++;
//   if (index < questions.length) {
//     showQuestion();
//   } else {
//     showScore();
//   }
// }

// nextButton.addEventListener("click", () => {
//   if (index < questions.length) {
//     handleNextButton();
//   } else {
//     startQuiz();
//   }
// });

// // Function to handle the visibility of the 'Previous' button
// function handleButtonVisibility() {
//   if (index === 0) {
//     prevButton.style.display = "none"; // Hide 'Previous' button on first question
//   } else {
//     prevButton.style.display = "inline-block"; // Show 'Previous' button after first question
//   }
// }

// // Event listener for 'Show Previous' button
// prevButton.addEventListener("click", () => {
//   if (index > 0) {
//     index--;
//     showQuestion(index);
//   } else {
//     alert("This is the first question!");
//   }
// });

// startQuiz();

// function submitQuiz() {
//   alert("Quiz is being submitted automatically.");
// }

// const questionElement = document.getElementById("question");
// const answersButton = document.getElementById("answer-buttons");
// const prevButton = document.getElementById("prev-btn");
// const nextButton = document.getElementById("next-btn");

// let index = 0;
// let score = 0;

// function startQuiz() {
//   index = 0;
//   score = 0;
//   nextButton.innerHTML = "Next";
//   showQuestion();
// }

// function showQuestion() {
//   resetState();
//   let currentQuestion = questions[index];
//   let questionNo = index + 1;
//   questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
//   currentQuestion.answers.forEach((answer) => {
//     const button = document.createElement("button");
//     button.innerHTML = answer.text;
//     button.classList.add("btn");
//     answersButton.appendChild(button);
//     if (answer.correct) {
//       button.dataset.correct = answer.correct;
//     }
//     button.addEventListener("click", selectAnswer);
//     handleButtonVisibility();
//     nextButton.style.display = "block";
//   });
// }
// function resetState() {
//   nextButton.style.display = "none";
//   while (answersButton.firstChild) {
//     answersButton.removeChild(answersButton.firstChild);
//   }
// }

// function selectAnswer(e) {
//   const selsectedButton = e.target;
//   const isCorrect = selsectedButton.dataset.correct === "true";
//   if (isCorrect) {
//     selsectedButton.classList.add("correct");
//     score++;
//   } else {
//     selsectedButton.classList.add("incorrect");
//   }
//   Array.from(answersButton.children).forEach((button) => {
//     if (button.dataset.correct === "true") {
//       button.classList.add("correct");
//     }
//     button.disabled = true;
//   });
//   nextButton.style.display = "block";
// }
// function showScore() {
//   resetState();
//   questionElement.innerHTML = `You Marks ${score} out of ${questions.length}!`;
//   nextButton.innerHTML = "Play Again";
//   nextButton.style.display = "block";
// }

// function handleNextButton() {
//   index++;
//   if (index < questions.length) {
//     showQuestion();
//   } else {
//     showScore();
//   }
// }

// nextButton.addEventListener("click", () => {
//   if (index < questions.length) {
//     handleNextButton();
//   } else {
//     startQuiz();
//   }
// });
// // Function to handle the visibility of the 'Previous' button
// function handleButtonVisibility() {
//   if (index === 0) {
//     prevButton.style.display = "none"; // Hide 'Previous' button on first question
//   } else {
//     prevButton.style.display = "inline-block"; // Show 'Previous' button after first question
//   }
// }

// // Event listener for 'Show Previous' button
// prevButton.addEventListener("click", () => {
//   if (index > 0) {
//     index--;
//     showQuestion(index);
//   } else {
//     alert("This is the first question!");
//   }
// });

// startQuiz();
