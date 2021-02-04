// TODO: get current user  from storage 
// for development only , get first user ,  should be replaced with getCurrentUser()
// STEP: use userService
let userservice= new Userservice();
var currentUser = userservice.getCurrentUser()
var allQuestions = JSON.parse(localStorage.getItem('questions'))

function returnCurrentUserPastQuizzes(currentUser){
    const  currentUserID = currentUser.ID;
    const  allUsersQuizzes = JSON.parse(localStorage.getItem('usersQuizzes'));
    var currentUserQuizzes = [];
    allUsersQuizzes.forEach(function(userQuiz){
        userQuiz = JSON.parse(userQuiz)
        if (userQuiz.userId == currentUserID){
            currentUserQuizzes.push(userQuiz)
        }
    })
    // userQuiz contanis degree and elapsed time
    return currentUserQuizzes;
}

// UI Table
(function addQuizzesToUI(){
    let userQuizzes = returnCurrentUserPastQuizzes(currentUser);
    // console.log(userQuizzes);
    let tBody = document.getElementById('tableBody');
    let table = document.querySelector('table');
    if (userQuizzes.length > 0){
    table.style.display ='block';
    for (var userQuiz of userQuizzes){
        let tr = document.createElement('tr');
        tr.insertCell(0).innerText = userQuiz.id;
        tr.insertCell(1).innerText = userQuiz.userTotalDegree;
        tr.insertCell(2).innerText = userQuiz.userTestTime;
        quiz = returnQuiz(userQuiz.quizId)
        // console.log(quiz)
        tr.insertCell(3).innerText = quiz.time;
        tr.insertCell(4).innerText = 10;
        tr.insertCell(5).innerText = userQuiz.date;
        const reviewLink = document.createElement('a');
        reviewLink.textContent = 'Review'
        reviewLink.classList.add('reviewLink');
        reviewLink.addEventListener('click',openReviewWindow)
        tr.insertCell(6).appendChild(reviewLink);
        
        tBody.appendChild(tr);
    }
}
else{
    const paragraph = document.createElement('h3');
    paragraph.innerText = 'you didn\'t take any quizzes yet, Quizzes you take will appear here.';
    paragraph.classList.add('noReview')
    const historyDiv = document.getElementById('historyDiv');
    historyDiv.appendChild(paragraph)
}
})()


function returnQuiz(quizID){
    let quizToReturn;
    let quizzes =JSON.parse( localStorage.getItem('quizzes'));
    quizzes.forEach(function(quiz){
        if(quiz.id == quizID){
            quizToReturn = quiz;
        }
    })
    return quizToReturn;
}

function openReviewWindow(event){
    const row = event.target.parentElement.parentElement;
    localStorage.setItem('currentUserQuizForReview',JSON.stringify(row.cells[0].innerText));
    var reviewWindow = window.open("review.html", "_blank",
    "toolbar=no,scrollbars=yes,resizable=yes,top=200,left=350,width=800,height=700");
    return reviewWindow;
}
