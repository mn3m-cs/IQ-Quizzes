// App Service 
class AppDbService
{
    SaveToLocalStorage(appDb) 
    {
   
        localStorage.setItem("AppDb",JSON.stringify(appDb));
    }
    GetDataFromLocalStorage() 
    {
        var Db = localStorage.getItem("AppDb");    
        Db= JSON.parse(Db);
        if(Db==null)
        {
          var appDb=new AppDb();
          this.SaveToLocalStorage(appDb);
          return appDb;
        }
        return Db;
    }
}
// User Service
class  Userservice 
{

  constructor()
  {
  this.appDbService=new AppDbService();
  this.AppDb=this.appDbService.GetDataFromLocalStorage();
  }
  add(user)
  {
    if(user instanceof User)
    {
        if(this.AppDb.Users instanceof Array &&  this.AppDb.Users.length>0)
        {           
          this.AppDb.Users.push(user);
        }
        else
        {
          this.AppDb.Users=[user];
        }
        this.appDbService.SaveToLocalStorage(this.AppDb);
        return true;
    }
    else
    {
        alert("Data Not Clear ")
        return false;
    }
  }
  edit(user,UserID)
  {   
    for (const index in this.AppDb.Users) {
      if (this.AppDb.Users[index].ID===UserID) 
      {
        this.AppDb.Users[index].FullName=user.FullName;
        this.AppDb.Users[index].Phone=user.Phone;
        this.AppDb.Users[index].Email=user.Email;
        this.AppDb.Users[index].UserName=user.UserName;
        this.AppDb.Users[index].PassWord=user.PassWord;
        this.AppDb.Users[index].Rate=user.Rate;
        this.AppDb.Users[index].IsAdmin=user.IsAdmin;
        this.appDbService.SaveToLocalStorage(this.AppDb);
        return true;
      }
    }
   return false;
  }
  checkUserIsReference(UserID)
  {
    for (const index in this.AppDb.UserQuestions) {

      if (this.AppDb.UserQuestions[index].UserID==UserID) 
      {
        alert("User Can Delete He is a foreign key in UserQuestions");
        return true;
      }
    }

    for (const index in this.AppDb.UserQuizs) 
    {
       if (this.AppDb.UserQuizs[index].UserID==UserID) 
       {
         alert("User Can Not Delete He is a foreign key in UserQuizs");
         return true;
       }
    }
     for (const index in this.AppDb.Messages) 
     {
       if (this.AppDb.Messages[index].UserID==UserID) 
       {
         alert("User Can Not Delete He is a foreign key in Messages");
         return true;
       }
     }
     var user =this.getCurrentUser();
    if(user!=null&&user.ID==UserID)
    {
         alert("User Can Not Delete He is a Login Now");
         return true;
     }
     return false;
  }
  delete(UserID)
  {
    if(this.checkUserIsReference(UserID))
    {
      return false;
    }
    for( let i = 0; i < this.AppDb.Users.length; i++)
    { 
      if ( this.AppDb.Users[i].ID === UserID ) 
      {  
           this.AppDb.Users.splice(i, 1); 
           this.appDbService.SaveToLocalStorage(this.AppDb);
           return true;
       }
    }
    return false;
   } 
   getAll()
   {
     return this.AppDb.Users;
   }
   getItemByID(UserID)
   {
     for (const ind in this.AppDb.Users)
      {
          if (this.AppDb.Users[ind].ID===UserID) 
          {
              return this.AppDb.Users[ind];
          }
     }
   }
   login(username , password)
   {
      for (const ind in this.AppDb.Users) {
          if (this.AppDb.Users[ind].UserName==username&&this.AppDb.Users[ind].PassWord==password) {
            {  
                sessionStorage.setItem('CurrentUser',JSON.stringify(this.AppDb.Users[ind]));
                alert("Login succeed");
                return true;
            }
        }
    }
    alert("UserName or Password not correct ")
    return false;
   }
   logout()
   {
    sessionStorage.setItem('CurrentUser',null);
   }
   getCurrentUser()
   {
      var currentuser=sessionStorage.getItem('CurrentUser');
      if(currentuser==null)
      return null;
      else
      return JSON.parse(currentuser);
   }
  
}
// Quiz Service
class  QuizService
{

  constructor()
  {
  this.appDbService=new AppDbService();
  this.AppDb=this.appDbService.GetDataFromLocalStorage();
  console.log((this.appDb  instanceof AppDb ));
  }
  add(quiz)
  {
    if(quiz instanceof Quiz)
    {
        if(this.AppDb.Quizs instanceof Array &&  this.AppDb.Quizs.length>0)
        {           
            this.AppDb.Quizs.push(quiz);
        }
        else
        {
           console.log(quiz);
            this.AppDb.Quizs=[quiz];
            console.log(this.AppDb.Quizs[0]);
        }
        console.log(this.AppDb.Quizs[0]);
        this.appDbService.SaveToLocalStorage(this.AppDb);
        console.log(this.appDbService.GetDataFromLocalStorage().Quizs[0]);
        return true;
    }
    else
    {
        alert("Data Not Clear ")
        return false;
    }
  }
  edit(Quiz,QuizID)
  {   
    for (const index in this.AppDb.Quizs) {
      if (this.AppDb.Quizs[index].ID===QuizID) 
      {
        this.AppDb.Quizs[index].Title=Quiz.Title;
        this.AppDb.Quizs[index].TotalDegree=Quiz.TotalDegree;
        this.AppDb.Quizs[index].Time=Quiz.Time;
        this.appDbService.SaveToLocalStorage(this.AppDb);
        return true;
      }
    }
   return false;
  }
  delete(QuizID)
  {
    if(this.checkQuizIsReference(QuizID))
    {
      return false;
    }
    for( let i = 0; i < this.AppDb.Quizs.length; i++){ 
    
      if ( this.AppDb.Quizs[i].ID === QuizID ) { 
  
        this.AppDb.Quizs.splice(i, 1); 
        this.appDbService.SaveToLocalStorage(this.AppDb);
        return true;
      }
     }
  return false;
   } 
   getAll()
   {
     return this.AppDb.Quizs;
   }
   getItemByID(QuizID)
   {
     for (const ind in this.AppDb.Users) {
       if (this.AppDb.Quizs[ind].ID===QuizID) {
         console.log(this.AppDb.Quizs[ind]);
         return this.AppDb.Quizs[ind];
         
       }
     }
    }
    checkQuizIsReference(QuizID)
    { 
      for (const index in this.AppDb.UserQuizs) 
      {
       if (this.AppDb.UserQuizs[index].QuizID==QuizID) 
       {
         alert("Quiz Can Not Delete He is a foreign key in UserQuizs");
         return true;
       }
      }
       for (const index in this.AppDb.Questions) 
       {
         if (this.AppDb.Questions[index].QuizId==QuizID) 
         {
           alert("Quiz Can Not Delete He is a foreign key in Messages");
           return true;
         }
       }
     return false;
    }
}
// QuestionService
class  QuestionService 
{
  constructor()
  {
  this.appDbService=new AppDbService();
  this.AppDb=this.appDbService.GetDataFromLocalStorage();
  }
    checkQuizExists(QuizID)
    {
        for (const ind in this.AppDb.Quizs) 
        {
          if (this.AppDb.Quizs.ID=QuizID) 
          {
          return true;
          }
        }
    return false;
    }
    add(question)
    {
      if(question instanceof Question)
      {
          if(!this.checkQuizExists(question.QuizId))
          {
            alert("Quiz ID Not Found")
            return false;
          }
          if(this.AppDb.Questions instanceof Array &&  this.AppDb.Questions.length>0)
          {           
              this.AppDb.Questions.push(question);
          }
          else
          {
              this.AppDb.Questions=[question];
          }
          this.appDbService.SaveToLocalStorage(this.AppDb);
          return true;
      }
      else
      {
          alert("Data Not Clear ")
          return false;
      }
    }
    edit(Question,QuestionID)
    {   
      if(!this.checkQuizExists(Question.QuizId))
      {
        alert("Quiz ID Not Found")
        return false;
      }
      for (const index in this.AppDb.Questions) {
        if (this.AppDb.Questions[index].ID===QuestionID) 
        {
          this.AppDb.Questions[index].Text=Question.Text;
          this.AppDb.Questions[index].Mark=Question.Mark;
          this.AppDb.Questions[index].OptionAnswers=Question.OptionAnswers;
          this.AppDb.Questions[index].CorrectOptionAnswer=Question.CorrectOptionAnswer;
          this.AppDb.Questions[index].QuizId=Question.QuizId;
          this.appDbService.SaveToLocalStorage(this.AppDb);
          return true;
        }
      }
    return false;
    }
    delete(QuestionID)
    {
      if(this.checkQuestionIsReference(QuestionID))
      {
        return false;
      }
      for( let i = 0; i < this.AppDb.Questions.length; i++){ 
      
        if ( this.AppDb.Questions[i].ID === QuestionID ) { 
          this.AppDb.Questions.splice(i, 1); 
          this.appDbService.SaveToLocalStorage(this.AppDb);
          return true;
        }
      }
    return false;
    } 
    getAll()
    {
      return this.AppDb.Questions;
    }
    getItemByID(QuestionID)
    {
      for (const ind in this.AppDb.Questions) {
        if (this.AppDb.Questions[ind].ID===QuestionID) {
          return this.AppDb.Questions[ind];
          
        }
      }
    }
    checkQuestionIsReference(QuestionID)
    { 
      for (const index in this.AppDb.QuestionID) {
        if (this.AppDb.QuestionID[index].QuestionID==QuestionID) {
          alert("Question Can Not Delete He is a foreign key in UserQuizs");
          return true;
        }
    }
    return false;
    }
}
//UserQuestionService
class UserQuestionService
{
  constructor()
  {
  this.appDbService=new AppDbService();
  this.AppDb=this.appDbService.GetDataFromLocalStorage();
  }
      checkUserExists(UserID)
      {
        for (const ind in this.AppDb.Users) 
        {
          if (this.AppDb.Users.ID=UserID) 
          {
              return true;
            
          }
        }
      }
      checkQuestionExists(QuestionID)
      {
        for (const ind in this.AppDb.Questions) 
        {
          if (this.AppDb.Questions.ID=QuestionID) 
          {
              return true;   
          }
        }
         return false;
      }
      checkUserQuizExists(UserQuizID)
      {
         for (const ind in this.AppDb.UserQuizs) 
         {
           if (this.AppDb.UserQuizs.ID=UserQuizID) 
            {
               return true;   
            }
          }
      return false;
      }
      add(userQuestion)
      {
        if(userQuestion instanceof UserQuestion)
        {
          if(!(this.checkUserQuizExists(userQuestion.UserQuizID)&&this.checkQuestionExists(userQuestion.QuestionID)&&this.checkUserExists(userQuestion.UserID)))
              {
                alert("Reference Not Found")
                return false;
              }
            if(this.AppDb.UserQuestions instanceof Array &&  this.AppDb.UserQuestions.length>0)
            {           
                this.AppDb.UserQuestions.push(userQuestion);
            }
            else
            {
                this.AppDb.UserQuestions=[userQuestion];
            }
            this.appDbService.SaveToLocalStorage(this.AppDb);
            return true;
        }
        else
        {
            alert("Data Not Clear ")
            return false;
        }
      }
      edit(userQuestion,UserQuestionID)
      {
        if(!(this.checkUserQuizExists(userQuestion.UserQuizID)&&this.checkQuestionExists(userQuestion.QuestionID)&&this.checkUserExists(userQuestion.UserID)))
        {
          alert("Reference Not Found")
          return false;
        }
      
        for (const index in this.AppDb.UserQuestions) {
          if (this.AppDb.UserQuestions[index].ID===UserQuestionID) 
          {
            this.AppDb.UserQuestions[index].UserID=userQuestion.UserID;
            this.AppDb.UserQuestions[index].QuestionID=userQuestion.QuestionID;
            this.AppDb.UserQuestions[index].UserAnswar=userQuestion.UserAnswar;
            this.AppDb.UserQuestions[index].UserDegree=userQuestion.UserDegree;
            this.AppDb.UserQuestions[index].UserQuizID=userQuestion.UserQuizID;
            this.appDbService.SaveToLocalStorage(this.AppDb);
            return true;
          }
        }
      return false;
      }
      delete(UserQuestionID)
      {
        for( let i = 0; i < this.AppDb.UserQuestions.length; i++){ 
        
          if ( this.AppDb.UserQuestions[i].ID === UserQuestionID ) { 
            this.AppDb.UserQuestions.splice(i, 1); 
            this.appDbService.SaveToLocalStorage(this.AppDb);
            return true;
          }
        }
      return false;
 } 
 getAll()
 {
   return this.AppDb.UserQuestions;
 }
 getItemByID(UserQuestionID)
 {
   for (const ind in this.AppDb.UserQuestions) {
     if (this.AppDb.UserQuestions[ind].ID===UserQuestionID) {
       return this.AppDb.UserQuestions[ind];
     }
   }
 }
}
//UserQuizSercive
class UserQuizService
{
  
  constructor()
  {
  this.appDbService=new AppDbService();
  this.AppDb=this.appDbService.GetDataFromLocalStorage();
  }
  checkUserExists(UserID)
  {
  for (const ind in this.AppDb.Users) {
    if (this.AppDb.Users.ID=UserID) {
        return true;
      
    }
  }
  }
  checkQuizExists(QuizID)
  {
  for (const ind in this.AppDb.Quizs) {
    if (this.AppDb.Quizs.ID=QuizID) {
        return true;   
    }
  }
  return false;
  }
  add(userQuiz)
  {
    if(userQuiz instanceof UserQuiz)
    {
      if(!(this.checkQuizExists(userQuiz.QuizID)&&this.checkUserExists(userQuiz.UserID)))
           {
            alert("Reference Not Found")
            return false;
           }
        if(this.AppDb.UserQuizs instanceof Array &&  this.AppDb.UserQuizs.length>0)
        {           
            this.AppDb.UserQuizs.push(userQuiz);
        }
        else
        {
            this.AppDb.UserQuizs=[userQuiz];
        }
        this.appDbService.SaveToLocalStorage(this.AppDb);
        return true;
    }
    else
    {
        alert("Data Not Clear ")
        return false;
    }
  }
  edit(userQuiz,UserQuizID)
  {
    if(!(this.checkQuizExists(userQuiz.QuizID)&&this.checkUserExists(userQuiz.UserID)))
           {
            alert("Reference Not Found")
            return false;
           }     
    for (const index in this.AppDb.UserQuizs) {
      if (this.AppDb.UserQuizs[index].ID===UserQuizID) 
      {   
        this.AppDb.UserQuizs[index].UserID=userQuiz.UserID;
        this.AppDb.UserQuizs[index].QuizID=userQuiz.QuizID;
        this.AppDb.UserQuizs[index].UserTotalDegree=userQuiz.UserTotalDegree;
        this.AppDb.UserQuizs[index].UserTestDate=userQuiz.UserTestDate;
        this.appDbService.SaveToLocalStorage(this.AppDb);
        return true;
      }
    }
   return false;
  }
  delete(UserQuizID)
  {
    if(this.checkUserQuizIsReference(UserQuizID))
    {
      return false;
    }
    for( let i = 0; i < this.AppDb.UserQuizs.length; i++){ 
    
      if ( this.AppDb.UserQuizs[i].ID === UserQuizID ) { 
        this.AppDb.UserQuizs.splice(i, 1); 
        this.appDbService.SaveToLocalStorage(this.AppDb);
        return true;
      }
     }
  return false;
   } 
   getAll()
   {
     return this.AppDb.UserQuizs;
   }
   getItemByID(UserQuizID)
   {
     for (const ind in this.AppDb.UserQuizs) {
       if (this.AppDb.UserQuizs[ind].ID===UserQuizID) {
         return this.AppDb.UserQuizs[ind];
       }
     }
   } 
   
   checkUserQuizIsReference(UserQuizID)
{ 
  for (const index in this.AppDb.UserQuestions) {
   if (this.AppDb.UserQuestions[index].UserQuizID==UserQuizID) {
     alert(" UserQuizs Can Not Delete He is a foreign key in UserQuestions");
     return true;
   }
}
return false;
}
}
// MessageService
class MessageService
{  
  constructor()
  {
  this.appDbService=new AppDbService();
  this.AppDb=this.appDbService.GetDataFromLocalStorage();
  }
    checkUserExists(UserID)
    {
    for (const ind in this.AppDb.Users) {
      if (this.AppDb.Users[ind].ID=UserID) {
          return true;   
      }
    }
    }
    add(message)
    {
      if(message instanceof Message)
      {
        if(!(this.checkUserExists(message.UserID)))
              {
              alert("Reference Not Found")
              return false;
              }
          if(this.AppDb.Messages instanceof Array &&  this.AppDb.Messages.length>0)
          {           
              this.AppDb.Messages.push(message);
          }
          else
          {
              this.AppDb.Messages=[message];
          }
          console.log(this.AppDb.Messages);
          this.appDbService.SaveToLocalStorage(this.AppDb);
          return true;
      }
      else
      {
          alert("Data Not Clear ")
          return false;
      }
    }
    edit(message,MessageID)
    {
      if(!(this.checkUserExists(message.UserID)))
      {
      alert("Reference Not Found")
      return false;
      }
      for (const index in this.AppDb.Messages) {
        if (this.AppDb.Messages[index].ID===MessageID) 
        {    
          this.AppDb.Messages[index].UserID=message.UserID;
          this.AppDb.Messages[index].Date=message.Date;
          this.AppDb.Messages[index].Content=message.Content;
          this.appDbService.SaveToLocalStorage(this.AppDb);
          return true;
        }
      }
      return false;
    }
    delete(MessageID)
    {
      for( let i = 0; i < this.AppDb.Messages.length; i++){ 
      
        if ( this.AppDb.Messages[i].ID === MessageID ) { 
          this.AppDb.Messages.splice(i, 1); 
          this.appDbService.SaveToLocalStorage(this.AppDb);
          return true;
        }
        }
        return false;
      } 
      getAll()
      {
        return this.AppDb.Messages;
      }
      getItemByID(MessageID)
      {
        for (const ind in this.AppDb.Messages) {
          if (this.AppDb.Messages[ind].ID===MessageID) {
            return this.AppDb.Messages[ind];
          }
        }
      }
}

