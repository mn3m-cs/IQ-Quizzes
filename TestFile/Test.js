//localStorage.removeItem("AppDb");
//var app =new  AppDbService();
//console.log(app.GetDataFromLocalStorage());

 
 //user service test
var user=new User(1,"hassan","0100928379","hassan@asjda.com","hassan","123",0,true);
userservice=new Userservice();
var v=(user instanceof User);
console.log(v +"1");
userservice.add(user);
console.log(userservice.getAll());
user=new User(1,"Hassan rafat","0100928379","hassan@asjda.com","hassan","123",0,true);
userservice.edit(user,1);
console.log(userservice.getAll());
//userservice.delete(1);
//console.log(userservice.getAll());
user=new User(2,"Hassan rafat","0100928379","hassan@asjda.com","mn3m","123",0,true);
console.log(userservice.getItemByID(2));
userservice.add(user);
console.log(userservice.getItemByID(2));
userservice.login("hassan","123");
console.log(userservice.getCurrentUser())
userservice.logout();
console.log(userservice.getCurrentUser())
// Quiz service test
var quiz=new Quiz(1,"quiz 1",20,120);
var quizservice=new QuizService();
quizservice.add(quiz);
console.log(quizservice.getItemByID(1));
console.log(quizservice.getAll());
quiz.Title="quiz 23"
quizservice.edit(quiz,1);
console.log(quizservice.getItemByID(1));
//quizservice.delete(1);
//console.log(quizservice.getAll());
// Question service test
//(id,text,mark,optionAnswers,correctoptionanswer,quizid)
var question=new Question(1,"can i help you",5,["ww","wwq"],"ww",1);
var questionService=new QuestionService();
questionService.add(question);
console.log(questionService.getItemByID(1));
console.log(questionService.getAll());
question.Mark=10;
questionService.edit(question,1);
console.log(questionService.getItemByID(1));
//questionService.delete(1);
//console.log(questionService.getAll());
// UserQuiz
var userquiz = new UserQuiz(1,1,1,50,Date.now);
var userquizservice =new UserQuizService();
userquizservice.add(userquiz);
console.log(userquizservice.getItemByID(1));
console.log(userquizservice.getAll());
userquizservice.edit(userquiz,1);
console.log(userquizservice.getItemByID(1));
//userquizservice.delete(1);
//console.log(userquizservice.getAll());
// UserQuestion
//(id,userID,questionid,useranswar,userdegree,userquizid)
var userQuestion=new UserQuestion(1,1,1,"hassan",3,1);
var userQuestionService=new UserQuestionService();
userQuestionService.add(userQuestion);
console.log(userQuestionService.getItemByID(1));
console.log(userQuestionService.getAll());
userQuestionService.edit(userQuestion,1);
console.log(userQuestionService.getItemByID(1));
//userQuestionService.delete(1);
//console.log(userQuestionService.getAll());
// Message //MessageService
//(id,userID,date,content)
var message=new Message(1,1,Date.now,"My message");
var messageService=new MessageService();
messageService.add(message);
console.log(messageService.getItemByID(1));
console.log(messageService.getAll());
messageService.edit(message,1);
console.log(messageService.getItemByID(1));
messageService.delete(1);
console.log(messageService.getAll());




