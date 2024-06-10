// Store the quiz questions and answers
const quizData = [
  {
    question: "Day 1 of being stranded... Do you:", //question for day 1
    answers: [// answer options saves it as value
      { option: "Explore", value: "explore" },
      { option: "Sleep", value: "sleep" },
      { option: "Find water", value: "water" },
      { option: "None of the above", value: "na" },
    ],
  },
  {
    question: "Day 2 of being stranded... Do you:",
    answers: [
      { option: "Check for phone connection", value: "phone" },
      { option: "Seek shelter", value: "shelter" },
      { option: "Forage berries", value: "berries" },
      { option: "Reminisce", value: "reminisce" },
    ],
  },
  {
    question: "Day 3 of being stranded... Do you:",
    answers: [
      { option: "Create a fire", value: "fire" },
      { option: "Draw SOS in the sand", value: "sos" },
      { option: "Swim", value: "swim" },
      { option: "Check your watch", value: "watch" },
    ],
  },
  {
    question: "Day 4 of being stranded... Do you:",
    answers: [
      { option: "Chase pigs", value: "pigs" },
      { option: "Go fishing", value: "fishing" },
      { option: "Gather resources", value: "resources" },
      { option: "Dance", value: "dance" },
    ],
  },
  {
    question: "Day 5 of being stranded... Do you:",
    answers: [
      { option: "Shout", value: "shout" },
      { option: "Journal on the leaves", value: "journal" },
      { option: "Watch the clouds", value: "clouds" },
      { option: "Swim", value: "swimm" },
    ],
  },
];

let currentQuestion = 0;
let userAnswers = []; //stores selected answer

const startQuiz = () => {
  const introContainer = document.getElementById("intro");
  const quizContainer = document.getElementById("quiz");
  introContainer.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
};

const showQuestion = () => { //display questions and options
  const quizForm = document.getElementById("quizForm");
  const questions = document.getElementsByClassName("question");

  if (currentQuestion >= quizData.length) { 
    showResult();
    return;
  }

  for (let i = 0; i < questions.length; i++) {
    if (i === currentQuestion) {
      questions[i].style.display = "block";
    } else {
      questions[i].style.display = "none";
    }
  }

  if (currentQuestion === 0) {
    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "none";
  }

  if (currentQuestion === quizData.length - 1) {
    const nextButton = document.getElementById("nextButton");
    const submitButton = document.getElementById("submitButton");
    nextButton.style.display = "none";
    submitButton.style.display = "block";
  }

  quizForm.reset();

  const currentQuestionData = quizData[currentQuestion];
  const questionElement = document.getElementById(`question${currentQuestion + 1}`);
  const questionTitle = questionElement.querySelector("h2");
  const answerList = questionElement.querySelector("ul");

  questionTitle.innerText = currentQuestionData.question;
  answerList.innerHTML = "";

  for (let i = 0; i < currentQuestionData.answers.length; i++) {
    const answer = currentQuestionData.answers[i];
    const listItem = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");

    input.setAttribute("type", "radio");
    input.setAttribute("id", `q${currentQuestion + 1}a${i + 1}`);
    input.setAttribute("name", `q${currentQuestion + 1}`);
    input.setAttribute("value", answer.value);

    label.setAttribute("for", `q${currentQuestion + 1}a${i + 1}`);
    label.innerText = answer.option;

    listItem.appendChild(input);
    listItem.appendChild(label);
    answerList.appendChild(listItem);
  }
};

const nextQuestion = () => {
  const quizForm = document.getElementById("quizForm");
  const selectedAnswer = quizForm.elements[`q${currentQuestion + 1}`].value;

  if (selectedAnswer) {
    userAnswers.push(selectedAnswer);
    currentQuestion++;
    showQuestion();
  }
};
const showResult = () => {
  const quizContainer = document.getElementById("quiz");
  const resultContainer = document.getElementById("result");
  const resultText = document.getElementById("resultText");
  const resultImage = document.getElementById("resultImage");

  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

const escapeAnswers = ["water", "shelter", "fire", "resources", "swim"];
const rescueAnswers = ["explore", "berries", "sos", "fishing", "shout"];
const userScore = userAnswers.filter(answer => escapeAnswers.includes(answer)|| rescueAnswers.includes(answer)).length;

if (userScore >= 4) {
  resultText.innerText = "After all the choices you made, you were able to sustain yourself and escape the island! You survived, congratulations!";
  resultImage.setAttribute("src", "survived.png");
  resultImage.setAttribute("alt", "Survived");
} else if (userScore >= 2) {
  resultText.innerText = "You were spotted by people, and they sent a rescue team to save you! Congratulations!";
  resultImage.setAttribute("src", "rescue.png");
  resultImage.setAttribute("alt", "Rescued");
  } else {
    resultText.innerText = "You are stranded! Try again?";
    resultImage.setAttribute("src", "stranded.png");
    resultImage.setAttribute("alt", "Stranded");
  }
  
};

const restartQuiz = () => { //to restart quiz resets it
  const introContainer = document.getElementById("intro");
  const resultContainer = document.getElementById("result");
  introContainer.style.display = "block";
  resultContainer.style.display = "none";
  currentQuestion = 0;
  userAnswers = [];
  showQuestion();
};
//event listeners
document.getElementById("startButton").addEventListener("click", startQuiz);
document.getElementById("nextButton").addEventListener("click", nextQuestion);
document.getElementById("restartButton").addEventListener("click", restartQuiz);