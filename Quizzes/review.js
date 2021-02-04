var allQuestions = JSON.parse(localStorage.getItem("questions"));
var usersAnswers = JSON.parse(localStorage.getItem("usersAnswers"));
var quizzes = JSON.parse(localStorage.getItem("quizzes"));
// from userQuiz you can get all we need, quiz, userAnswers,..
var currentUserQuizID = JSON.parse(
  localStorage.getItem("currentUserQuizForReview")
);

// Quiz information
var userQuiz = returnUserQuizWithID(currentUserQuizID);
var quiz = returnQuizWithID(userQuiz.quizId);
var quizAnswers = usersAnswers[" " + currentUserQuizID + " "];
console.log(userQuiz)
var quizCorrectAnswers = [];
(function addQuizToReviewWindow() {
  var reviewContainer = document.getElementById("reviewContainer");

  for (let i = 0; i < 10; i++) {
    let questionNumber = quiz.questions[i];
    let question = allQuestions[questionNumber];
    let questionDiv = document.createElement("div"); //Question
    questionDiv.classList.add("questionDiv");
    questionDiv.innerHTML = i + 1 + " - " + question.text;
    quizCorrectAnswers.push(question.correctOptionIndex);

    let ul = document.createElement("ul"); // options
    for (let option = 0; option < question.options.length; option++) {
      let optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.value = option;
      optionInput.disabled = true;
      optionInput.name = "q" + i;
      optionInput.dataset.indexNumber = option;
      let optionLabel = document.createElement("label");
      optionLabel.innerText = question.options[option];
      let optionItem = document.createElement("li");
      optionItem.appendChild(optionInput);
      optionItem.appendChild(optionLabel);
      ul.appendChild(optionItem);
      questionDiv.appendChild(ul);

      // userAnswer
      if(option == quizAnswers[i]){
        optionInput.checked = true;
        }

       // check correct answers
      if(option == quizCorrectAnswers[i]){
        if(optionInput.checked){
          optionLabel.classList.add('correctAnswer')
          questionDiv.classList.add('correctQuestion')
        }
        else{
          questionDiv.classList.add('wrongQuestion');
          optionLabel.classList.add('answerFeedback');
          optionLabel.parentElement.classList.add('answerFeedbackLi')
        }
      }
    }
  
    reviewContainer.appendChild(questionDiv);
  }
})();

function returnQuizWithID(quizID) {
  let quizzes = JSON.parse(localStorage.getItem("quizzes"));
  var quizz;
  quizzes.forEach(function (quiz) {
    if (quiz.id == quizID) {
      quizz = quiz;
    }
  });
  return quizz;
}

function returnUserQuizWithID(userQuizID) {
  let userQuizzes = JSON.parse(localStorage.getItem("usersQuizzes"));
  var userQuizz;
  userQuizzes.forEach(function (userQuiz) {
    userQuiz = JSON.parse(userQuiz);
    if (userQuiz.id == userQuizID) {
      userQuizz = userQuiz;
    }
  });
  return userQuizz;
}

function addUserScore(userQuiz){
  const userScore = userQuiz.userTotalDegree;
  const reviewContainer = document.getElementById('reviewContainer');
  let scoreSpan = document.createElement('span');
  scoreSpan.innerHTML = `your score: <b>${userScore}</b><sub>/10</sub>`;
  scoreSpan.classList.add('score')
  reviewContainer.prepend(scoreSpan);
}
addUserScore(userQuiz)