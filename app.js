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
        correctAnswer: "Cape Town"
    },
    {
        question: "Who was the first President of the United States?",
        options: ["Martin Luther King", "George Washington", "James Monroe", "William McKinley,"],
        correctAnswer: "George Washington"
    },
    {
        question: "Which is the smallest country in Africa?",
        options: ["Bahamas", "Van Couver", "Seychelles", "Paris"],
        correctAnswer: "Seychelles"
    },
    {
        question: "When was KICC founded in Kenya?",
        options: ["1965", "1805", "1908", "1967"],
        correctAnswer: "1967"
    },
    {
        question: "Who was the first missionary to come to Kenya?",
        options: [" Evangelist Dag Heward-Mills", "Christian Jacob", "Dr Johann Ludwig Krapf", "Masinde Muliro"],
        correctAnswer: "Dr Johann Ludwig Krapf"
    }
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
            // alert("Correct!");
            userScore++; // Increment user score for correct answers
        } else {
            // alert(`Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`);
        }

        moveNext();
    });
});

displayQuestion(questions[currentQuestionIndex]);

choiceElements.forEach((choice, index) => {
    choice.addEventListener("click", () => {
        // Disable further interaction
        choiceElements.forEach((element) => {
            element.classList.add("disabled");
            element.removeEventListener("click");
        });

        const selectedAnswer = choice.textContent.trim().slice(3); // Extract the selected answer text
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.correctAnswer) {
            choice.classList.add("correct-choice");
            userScore++; // Increment user score for correct answers
        } else {
            choice.classList.add("incorrect-choice");
            // Highlight the correct answer
            choiceElements.forEach((element, i) => {
                if (element.textContent.trim().slice(3) === currentQuestion.correctAnswer) {
                    element.classList.add("correct-choice");
                }
            });
        }

        // Display the result modal after a brief delay to show the correct/incorrect highlighting
        setTimeout(showUserScore, 1500);
    });
});


// SHOW SCORES
function showScores() {
    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};
