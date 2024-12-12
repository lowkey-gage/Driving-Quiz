const questions = [
    {
        question: "What should you do if you see an emergency vehicle approaching with flashing lights?",
        answers: ["Continue driving at the same speed", "Pull over to the side of the road and stop", "Increase your speed to clear the lane", "Stop your vehicle immediately, wherever you are"],
        correct: 1,
        image: "question1.webp",
        userAnswer: null
    },
    {
        question: "What is the legal blood alcohol concentration limit for drivers over 21 in most states?",
        answers: ["0.08%", "0.05%", "0.1%", "There is no specific limit"],
        correct: 0,
        image: "question2.jpg",
        userAnswer: null
    },
    {
        question: "When are you allowed to pass another vehicle on the right?",
        answers: ["When the vehicle ahead is making a left turn", "On a one-way street", "When driving in a lane set for right turns only", "All of the above"],
        correct: 3,
        image: "question3.png",
        userAnswer: null
    },
    {
        question: "At a four-way stop, who goes first?",
        answers: ["The driver on the left", "The driver on the right", "The driver who stopped first", "The driver with the largest vehicle"],
        correct: 2,
        image: "question4.png",
        userAnswer: null
    },
    {
        question: "What does a flashing yellow traffic light mean?",
        answers: ["Proceed with caution", "Stop and wait for the light to turn green", "Speed up to clear the intersection", "Traffic light is out of order"],
        correct: 0,
        image: "question5.avif",
        userAnswer: null
    },
    {
        question: "Which of the following is true regarding seat belts?",
        answers: ["They are optional for drivers over 18", "They are not effective in preventing injuries", "They increase the risk of injury in a crash", "They should be worn by all passengers at all times"],
        correct: 3,
        image: "question6.jpg",
        userAnswer: null
    },
    {
        question: "What is the minimum following distance under ideal driving conditions?",
        answers: ["2 seconds", "3 seconds", "5 seconds", "1 second"],
        correct: 1,
        image: "question7.jpg",
        userAnswer: null
    },
    {
        question: "What should you do when approaching a pedestrian crossing?",
        answers: ["Increase speed to clear the area quickly", "Honk to alert the pedestrian", "Yield the right-of-way to pedestrians", "Continue at the same speed"],
        correct: 2,
        image: "question8.jpg",
        userAnswer: null
    },
    {
        question: "What action should you take when driving in fog?",
        answers: ["Use your high beams", "Use your low beams", "Turn on your hazard lights", "Follow other vehicles closely to stay visible"],
        correct: 1,
        image: "question9.webp",
        userAnswer: null
    },
    {
        question: "How often should you check your rearview and side mirrors?",
        answers: ["Every 2-3 minutes", "Only when changing lanes", "Frequently, to stay aware of your surroundings", "Only when you hear an emergency vehicle"],
        correct: 2,
        image: "question10.webp",
        userAnswer: null
    },
];

let currentQuestionIndex = 0;

function startQuiz() {
    const lastQuizState = localStorage.getItem('quizState');
    const lastScore = localStorage.getItem('quizScore');

    if (lastQuizState) {
        alert(`Welcome back! Last time you answered ${lastScore} questions correctly.`);
    }

    loadQuizState();
    window.location.href = "quizPage.html";
}

function checkAnswer(index) {
    questions[currentQuestionIndex].userAnswer = index;

    if (index === questions[currentQuestionIndex].correct) {
        alert("Correct!");
    } else {
        alert("Incorrect!");
    }

    saveQuizState();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        goToNextQuestion();
    } else {
        showResults();
    }
}

function goToNextQuestion() {
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestionIndex];

    document.getElementById("questionHeading").textContent = `Question ${currentQuestionIndex + 1}`;
    document.getElementById("questions").innerHTML = `
        <p>${question.question}</p>
        <div id="none">
            <button id="answersBlue" onclick="checkAnswer(0)">${question.answers[0]}</button><br>
            <button id="answersRed" onclick="checkAnswer(1)">${question.answers[1]}</button><br>
            <button id="answersBlue" onclick="checkAnswer(2)">${question.answers[2]}</button><br>
            <button id="answersRed" onclick="checkAnswer(3)">${question.answers[3]}</button><br>
        </div>
    `;

    document.getElementById("headingPic").src = question.image;
    updateProgressBar();
}

function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    let progress;

    if (currentQuestionIndex === questions.length) {
        progress = 100;
    } else {
        progress = ((currentQuestionIndex + 1) / questions.length) * 100 - 10;
    }
    
    progressBar.style.width = progress + "%";
    progressBar.textContent = Math.round(progress) + "%";
}

function showResults() {
    let correctAnswers = questions.filter(q => q.correct === q.userAnswer).length;
    let percentage = Math.round((correctAnswers / questions.length) * 100);

    localStorage.setItem('quizScore', correctAnswers);

    // Hide the heading and image from the previous question
    document.getElementById("questionHeading").style.display = "none";
    document.getElementById("headingPic").style.display = "none";

    document.getElementById("quizForm").innerHTML = `
        <h2>Quiz Results</h2>
        <div id="imageContainer">
            <img id="resultsPic" src="titlePic.png" alt="Results Image">
        </div>
        <p>You answered ${correctAnswers} out of ${questions.length} questions correctly (${percentage}%).</p>
        
        ${percentage >= 80 ? `
            <p>Great job! You have a strong understanding of driving safety.</p>
        ` : `
            <p>Keep practicing! Here are some resources to help you improve:</p>
            <ul>
                <li><a href="https://example.com/resource1">Driving Safety Tips</a></li>
                <li><a href="https://example.com/resource2">Understanding Traffic Laws</a></li>
            </ul>
        `}
        
        <button onclick="restartQuiz()">Retake Quiz</button>
    `;

    // Hide the progress bar in the results
    document.getElementById("progressBarContainer").style.display = "none";

    // Clear the quiz state from local storage
    localStorage.removeItem('quizState');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    questions.forEach(q => q.userAnswer = null);
    saveQuizState();
    startQuiz();
}

function saveQuizState() {
    const quizState = {
        currentQuestionIndex: currentQuestionIndex,
        questions: questions
    };
    localStorage.setItem('quizState', JSON.stringify(quizState));
}

function loadQuizState() {
    const quizState = JSON.parse(localStorage.getItem('quizState'));
    if (quizState) {
        currentQuestionIndex = quizState.currentQuestionIndex;
        quizState.questions.forEach((q, index) => {
            questions[index].userAnswer = q.userAnswer;
        });
    }
}
