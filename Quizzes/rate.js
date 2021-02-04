let currentUserID = currentUser.ID;
var currentUserQuizzes = returnCurrentUserPastQuizzes()

function returnCurrentUserPastQuizzes(currentUser){
    const  allUsersQuizzes = JSON.parse(localStorage.getItem('usersQuizzes'));
    var currentUserQuizzes = [];
    allUsersQuizzes.forEach(function(userQuiz){
        userQuiz = JSON.parse(userQuiz)
        if (userQuiz.userId == currentUserID){
            currentUserQuizzes.push(userQuiz)
        }
    })
    return currentUserQuizzes;
}


function getallQuizzesTotlaDegrees(){
    let totalDegrees = [];
    currentUserQuizzes.forEach(function(userQuiz){
        totalDegrees.push(userQuiz.userTotalDegree)
    })
    return totalDegrees;
}


function calculateRate(){
    let allQuizzesMarks = getallQuizzesTotlaDegrees();
    const length = allQuizzesMarks.length;
    let sum = 0;
    allQuizzesMarks.forEach(function(mark){
        sum +=mark;
    })
    rate = sum/length;
    let appDB =JSON.parse(localStorage.getItem('AppDb'));
    let users = appDB.Users;
    users.forEach(function(usr){
        if (usr.ID == currentUserID){
            usr.Rate = rate;
            localStorage.setItem('AppDb',JSON.stringify(appDB))
        }
    })
    return rate
}

function addRateToUI(){
    const rateSpan = document.getElementById('rate');
    const rate = calculateRate();
    rateSpan.innerHTML= 'your rate is: '+rate + '/10';
}


function isUserhaveQuizzes(){
    if (currentUserQuizzes.length >0){
        addRateToUI()
    }
    else{
        console.log('null')
    }
}
isUserhaveQuizzes()
