const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Madrid", "Paris"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the capital of Kenya?",
        options: ["London", "Nairobi", "Madrid", "Paris"],
        correctAnswer: "Nairobi"
    },
    {
        question: "What is the capital of Uganda?",
        options: ["Kampala", "Berlin", "Madrid", "Paris"],
        correctAnswer: "Kampala"
    },
    {
        question: "What is the capital of South Africa?",
        options: ["London", "Berlin", "Cape Town", "Paris"],
        correctAnswer: "Paris"
    },

    // Add more questions here
];

let currentQuestionIndex = 0;
let userScore = 0; // Initialize user score
const progressElement = document.getElementById("progress");
const questionsElement = document.getElementById("questions");
const choiceElements = document.querySelectorAll(".btn");
const countdownElement = document.getElementById("countdown");

let timeLimit = 20;
let countdown;

function displayQuestion(question) {
    questionsElement.textContent = question.question;
    question.options.forEach((option, index) => {
        choiceElements[index].textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    });

    startCountdown();
}

function startCountdown() {
    timeLimit = 20;
    updateCountdown();

    countdown = setInterval(() => {
        if (timeLimit === 0) {
            clearInterval(countdown);
            handleTimeout();
        }
        updateCountdown();
        timeLimit--;
    }, 1000);
}

function updateCountdown() {
    countdownElement.textContent = `${timeLimit} sec`;
}

function handleTimeout() {
    alert("Time's up! You didn't answer in time.");
    moveNext();
}

function moveNext() {
    clearInterval(countdown);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(questions[currentQuestionIndex]);
        progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    } else {
        // Quiz is completed
        showUserScore();
    }
}

function showUserScore() {
    questionsElement.textContent = `Quiz completed! Your score is ${userScore} out of ${questions.length}.`;
    countdownElement.style.display = "none";
}

choiceElements.forEach((choice, index) => {
    choice.addEventListener("click", () => {
        const selectedAnswer = choice.textContent.trim().slice(3); // Extract the selected answer text
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.correctAnswer) {
            alert("Correct!");
            userScore++; // Increment user score for correct answers
        } else {
            alert(`Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`);
        }

        moveNext();
    });
});

displayQuestion(questions[currentQuestionIndex]);