var questions = JSON.parse(localStorage.getItem("questions"));
var quizzesIDs = []; // to avoid repeated ids

// STEP 1: add following to localStorage if not found:
// quizzes=[] (all created quizzes for any user)
// usersQuizzes=[] (bind userId with quizId to know quizzes that user take)
// usersAnswers =[associative array]  (bind quizId with answers)

// STEP: Functions Declarations
var myUserService = new Userservice();
var currentUser = myUserService.getCurrentUser()

function createQuiz() {
  // this function will create quiz and save it to quizzes in localStorage
  quiz = new Quiz();
  while (!quizzesIDs.includes(randomID)) {
    // ID , choose number id and check that is not the id of another quiz
    var randomID = parseInt(Math.random().toString().slice(2, 6)); // we make it var , so we can use in while condition
    quizzesIDs.push(randomID);
    quiz.id = randomID;
    randomID = undefined; // randomId is function scope so , on the second iteration will use the past value ,  soo we set it to undefined
    break;
  }
  quiz.totalDegree = 100;
  quiz.time = 10; // 10 minutes

  // add questions to Quiz
  function getRandomQuestions() {
    var currentQuizQuestionsIDs = []; // contains IDs only, avoid repeating questions
    while (currentQuizQuestionsIDs.length < 10) {
      let randomNumber = Math.floor(Math.random() * questions.length);
      if (!currentQuizQuestionsIDs.includes(randomNumber)) {
        questions[randomNumber].quiz_Id = quiz.id;
        currentQuizQuestionsIDs.push(questions[randomNumber].id);
      }
    }
    return currentQuizQuestionsIDs;
  }
  quiz.questions = getRandomQuestions();
  let quizzes = JSON.parse(localStorage.getItem("quizzes"));
  quizzes.push(quiz);
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
  return quiz;
}

function createUserQuiz() {
  userQuiz = new UserQuiz();
  userQuiz.id = newQuiz.id + 120; // FIXME: quiz.id + user.id
  userQuiz.userId = currentUser.ID;
  userQuiz.quizId = newQuiz.id;
  userQuiz.userTotalDegree = calculateUserScore();
  userQuiz.userTestTime = getElapsedTime();
  userQuiz.date = new Date().toLocaleString();
  usersQuizzes = JSON.parse(localStorage.getItem("usersQuizzes"));
  usersQuizzes.push(JSON.stringify(userQuiz));
  localStorage.setItem("usersQuizzes", JSON.stringify(usersQuizzes));
  return userQuiz;
}

function startTimer() {
  let timerSpan = document.createElement("span");
  timerSpan.classList.add("timer");
  timerSpan.textContent = "10:00";
  $("#myBody").before(timerSpan);
  timerSpan.style.display = "inline";
  let date = new Date().getTime();
  timing = setInterval(function getTimeRemaining() {
    const endTime = new Date(date + 10 * 60000); //add 10 minutes
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    timerSpan.textContent = minutes + ":" + seconds;
  }, 1000);

  setTimeout(function () {
    clearInterval(timing);
    timerSpan.textContent = "00:00";
  }, 60000 * 10);
}

function getElapsedTime() {
  // this function will claculate elapsed time (time that user take in solution)
  const currentTimerValue = document.querySelector(".timer").innerText;
  const minutesAndSeconds = currentTimerValue.split(":");
  const totalseconds =
    parseInt(minutesAndSeconds[0] * 60) + parseInt(minutesAndSeconds[1]);
  const elapsedTimeInSeconds = 10 * 60 - totalseconds;
  const minutes = Math.floor(elapsedTimeInSeconds / 60);
  const seconds = elapsedTimeInSeconds - minutes * 60;
  return minutes + ":" + seconds;
}

function calculateUserScore() {
  let userAnswers = [];
  questionsDivs = document.querySelectorAll("#quizContainer div");
  for (let i = 0; i < 10; i++) {
    let userAnswer = document.querySelector(`input[name="q${i}"]:checked`).dataset.indexNumber;
    userAnswers.push(userAnswer);
  }
  
  let usersAnswers = JSON.parse(localStorage.getItem("usersAnswers"));
  const userQuizIdString = " " + userQuiz.id + " "; // so we can use it as a key in associative array
  usersAnswers[userQuizIdString] = userAnswers;
  localStorage.setItem("usersAnswers", JSON.stringify(usersAnswers));
  // Compare userAnswer with quizCorrectAnswers

  userScore = 0; // Number of correct answers
  for (let i = 0; i < 10; i++) {
    if (userAnswers[i] == quizCorrectAnswers[i]) {
      userScore++;
    }
  }
  return userScore;
}

function showResult() {
  const userScore = calculateUserScore();
  $("#result").html(`<p>your score is: <b>${userScore}</b></p>`);
  var resultDialog = $("#result").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
      OK: function () {
        window.location.assign("../Home/Index/HomeIndex.html");
      },
    },
  });
  resultDialog.dialog("open");
}

function goHomeAfter5() {
  setTimeout(function () {
    window.location.assign("../Home/Index/HomeIndex.html");
  }, 5000);
}

startModal = $("#startInstructions").dialog({
  autoOpen: false,
  modal: true,
  height: 220,
  width: 540,
  buttons: {
    start: function () {
      startQuiz();
      startTimer();
      //add submit button
      submitButton = document.createElement("button");
      submitButton.classList.add("submitButton");
      submitButton.disabled = true;
      submitButton.textContent = "Submit";
      // disable startquiz btn
      document.getElementById("startQuiz").style.display = "none";
      $("#startQuiz").prop("disabled", true);
      $("#quizContainer").append(submitButton);
      $(this).dialog("close");
    },
    cancel: function () {
      $(this).dialog("close");
    },
  },
});

// STEP: Start App

(function QuizzesCheck() {
  if (localStorage.getItem("quizzes") == null) {
    quizzes = [];
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }
})();
(function usersQuizzesCheck() {
  if (localStorage.getItem("usersQuizzes") === null) {
    usersQuizzes = [];
    localStorage.setItem("usersQuizzes", JSON.stringify(usersQuizzes));
  }
})();
(function usersAnswersCheck() {
  if (localStorage.getItem("usersAnswers") === null) {
    usersAnswers = {};
    localStorage.setItem("usersAnswers", JSON.stringify(usersAnswers));
  }
})();

// STEP: Create Modal and show the modal when user click on startQuiz button;
$("#startQuiz").click(function () {
  startModal.dialog("open");
});

function startQuiz() {
  // this function will execute createQuiz() function and auto submit quiz after 10 minutes submitQuiz()
  newQuiz = createQuiz();
  let quizContainer = document.getElementById("quizContainer");
  const questions = JSON.parse(localStorage.getItem("questions"));
  quizCorrectAnswers = [];

  for (let i = 0; i < quiz.questions.length; i++) {
    let questionDiv = document.createElement("div"); //Question
    questionDiv.innerHTML = i + 1 + " - " + questions[quiz.questions[i]].text;
    quizCorrectAnswers.push(questions[quiz.questions[i]].correctOptionIndex);

    let ul = document.createElement("ul"); // options

    for (
      let option = 0;
      option < questions[quiz.questions[i]].options.length;
      option++
    ) {
      let optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.value = option;
      optionInput.name = "q" + i;
      optionInput.dataset.indexNumber = option;
      let optionLabel = document.createElement("label");
      optionLabel.innerText = questions[quiz.questions[i]].options[option];
      let optionItem = document.createElement("li");
      optionItem.appendChild(optionInput);
      optionItem.appendChild(optionLabel);
      ul.appendChild(optionItem);
      questionDiv.appendChild(ul);
    }

    quizContainer.appendChild(questionDiv);
  }
  setInterval(activateSubmit,2000)
  // auto submit quiz after 10 minutes
  setTimeout(function () {
    submitQuiz();
  }, 1000 * 60 * 10);
}

function submitQuiz() {
  createUserQuiz();
  showResult();
  goHomeAfter5();
}

function activateSubmit() {
  // collect all radio buttons from the page 
  // if checked ones count is 10 ---> activate submit
  let checkedRadios = []
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(function (radio){
    if(radio.checked){
      checkedRadios.push(radio)
    }
  })
  if(checkedRadios.length == 10){
    console.log(checkedRadios)
    let submitBtn = document.querySelector('.submitButton');
    submitBtn.removeAttribute('disabled');
    submitButton.addEventListener("click", submitQuiz);

  }
}

