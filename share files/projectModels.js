class  User 
{

    constructor(id,fullname,phone,email,username,password,rate,isadmin)
    {
        this.ID=id;
        this.FullName=fullname; 
        this.Phone=phone; 
        this.Email=email; 
        this.UserName=username; 
        this.PassWord=password;
        this.Rate=rate;
        this.IsAdmin=isadmin;
    }
}

// // class  Quiz 
// // {
// //  constructor(id,title,totaldegree,time)
// // {
// //     this.ID=id;
// //     this.Title=title; 
// //     this.TotalDegree=totaldegree; 
// //     this.Time=time; 
// // }
// // }
// // class  Question 
// // {
    
// //  constructor(id,text,mark,optionAnswers,correctoptionanswer,quizid)
// // {
// //     this.ID=id;
// //     this.Text=text; 
// //     this.Mark=mark; 
// //     this.OptionAnswers=optionAnswers;
// //     this.CorrectOptionAnswer=correctoptionanswer;
// //     this.QuizId=quizid; 
// // }
// // }
// // class UserQuestion
// // {
// //  constructor(id,userID,questionid,useranswar,userdegree,userquizid)
// //  {    
// //     this.ID=id;
// //     this.UserID=userID; 
// //     this.QuestionID=questionid; 
// //     this.UserAnswar=useranswar;
// //     this.UserDegree=userdegree;
// //     this.UserQuizID=userquizid; 
// //  }
// // }
// // class UserQuiz
// // {
// //   constructor(id,userID,quizID,userTotalDegree,userTestDate)
// //   {    
// //     this.ID=id;
// //     this.UserID=userID; 
// //     this.QuizID=quizID; 
// //     this.UserTotalDegree=userTotalDegree;
// //     this.UserTestDate=userTestDate; 
// //   }  
// // }
class Message
{
 constructor(id,userID,date,content)
 {    
    this.ID=id;
    this.UserID=userID; 
    this.Date=date; 
    this.Content=content;
 }  

}
 class AppDb
 {
     Users=[] 
     Quizs=[] 
     Questions=[]
     UserQuestions=[] 
     UserQuizs=[]
     Messages=[]
 }



