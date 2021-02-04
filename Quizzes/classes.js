// class User {
//   constructor(id, fullname, phone, email, username, password, rate, isadmin) {
//     this.ID = id;
//     this.FullName = fullname;
//     this.Phone = phone;
//     this.Email = email;
//     this.UserName = username;
//     this.PassWord = password;
//     this.Rate = rate;
//     this.IsAdmin = isadmin;
//   }
// }

class Quiz {
  constructor(id, totalDegree, time, questions) {
    this.id = id;
    // this.title = title;
    this.totalDegree = totalDegree;
    this.time = time;
    this.questions = questions;
  }
}

class UserQuiz {
  constructor(id, userId, quizId, userTotalDegree, userTestTime,date) {
    this.id = id;
    this.userId = userId;
    this.quizId = quizId;
    this.userTotalDegree = userTotalDegree;
    this.userTestTime = userTestTime;
    this.date = date;
  }
}

class Question {
  constructor(id, text, mark, quizId, correctOption, options) {
    this.id = id;
    this.text = text;
    this.mark = mark;
    this.quizId = quizId;
    this.correctOptionIndex = correctOption;
    this.options = options;
  }
}

class UserQuestions {
  constructor(id, userId, questionId, userAnswer, userDegree, quizId) {
    this.id = id;
    this.userId = userId;
    this.quizId = quizId;
    this.questionId = questionId;
    this.userAnswer = userAnswer;
    this.userDegree = userDegree;
  }
}

class Message {
  constructor(id, userId, date, content) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.content = content;
  }
}
