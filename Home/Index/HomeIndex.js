// image slide
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}
// max Rate
var userservice;
var users;
// function showmaxrate()
// {
//  userservice=new Userservice();
//  users=userservice.getAll();
 
//  var userMaxRate1=0;
//  var userMaxRate2=0;
//  var userMaxRate3=0;
//  users.forEach((element) => 
//  {
//      if(element.Rate>=userMaxRate1)
//      {
//         userMaxRate1=element.Rate;
//         userMaxRate2=userMaxRate1;
//         userMaxRate3=userMaxRate2;
//      }
//      else if(element.Rate>=userMaxRate2)
//      {
//         userMaxRate2=element.Rate;
//         userMaxRate3=userMaxRate2;
//      }
//      else if(element.Rate>=userMaxRate3)
//      {
//         userMaxRate3=element.Rate;
//      }
//  });
// var showUsersTable=document.getElementById("showUsersTable");
// for (var i = 0, row; row = showUsersTable.rows[i]; i++) 
// {
//     console.log(row);
// }  
    

// for (const user of users) 
// {
    
//         if(user.Rate>=userMaxRate3)
//         {
//         // creates a table row
//         var row = document.createElement("tr");
//         for(var propt in user)
//         {
//           // Create a <td> element and a text node, make the text
//           // node the contents of the <td>, and put the <td> at
//           // the end of the table row
//           if(propt=="ID"||propt=="FullName"||propt=="UserName"||propt=="Rate")
//           {
//           var cell = document.createElement("td");
//           var cellText = document.createTextNode(user[propt]);
//           cell.appendChild(cellText);
//           row.appendChild(cell);
//           }
//         }   
//         // add the row to the end of the table 
//         showUsersTable.appendChild(row); 
//     }

// }
// }
// showmaxrate();

function topRate(){
  let userservice=new Userservice();
  let users=userservice.getAll();
  var topRate=0;
  let topUser;
  users.forEach(function(user){
    if(user.Rate > topRate){
     topRate=user.Rate;
     topUser=user;
    }
  console.log(topUser,topRate);
  })
  let table = document.getElementById('showUsersTable');
  let tr = document.createElement('tr');
  //tr.insertCell(0).innerText = topUser.ID;
  //tr.insertCell(1).innerText = topUser.FullName;
  //tr.insertCell(2).innerText = topUser.UserName;
  //tr.insertCell(3).innerText = topRate;
  //table.appendChild(tr);
}
topRate()

//  Comments
var messageservice;
var messages;
function addComment()
{ 
    messageservice=new MessageService();
    messages=messageservice.getAll();
    var maxid=0;
    for (const key in messages) 
    {
     if(messages[key]>=maxid)
     {
        maxid=messages[key];
     }
    }
    maxid++;
    var userservice =new  Userservice();
    var curuser=userservice.getCurrentUser();
    var text=document.getElementById("commentText").value; 
    var d=new Date();
    var date=d.toLocaleDateString()+ " - " + d.toLocaleTimeString();
    var message=new Message(Number(maxid),Number(curuser.ID),date,text);
    messageservice.add(message);

};
function showComments()
{
  var userservice =new  Userservice();
  var users=userservice.getAll();
  var curuser=userservice.getCurrentUser();
  messageservice=new MessageService();
  messages=messageservice.getAll();
  var messagesBox=document.getElementById('messagesBox');
  messagesBox.innerHTML='';
  for (const message of messages)
  {
  
      var name ='';
      for (const user of users) 
      {
        if(user.ID==message.UserID)
        {
          name=user.UserName;

        }
      }
      console.log(message.UserID==curuser.ID);
      var oneComment = document.createElement('div');
      oneComment.classList.add('oneComment');

      if(message.UserID==curuser.ID)
      {
        var buttonDeleteComment = document.createElement("button");
        buttonDeleteComment.innerHTML = "Delete";
        buttonDeleteComment.className='commentMessageDelete';
        buttonDeleteComment.addEventListener ("click", function() {
          messageservice.delete(message.ID);
          showComments();
        });
        oneComment.prepend(buttonDeleteComment);
        
      }
    
      var contents=message.Content+"";
      var divContent = document.createElement('div');
      divContent.innerText =contents+"" ;
      divContent.className = 'commentMessageContent';
      oneComment.prepend(divContent);

      var divTitle = document.createElement('div');
      divTitle.innerHTML ='<span id="commenter">'+ name +'</span>' +" at "+ '<span id="msgDate">'+message.Date+'</span>' +' says: ' ;
      divTitle.className = 'commentMessageInformation';
      oneComment.prepend(divTitle);
      
      messagesBox.append(oneComment)


    
  }
}
setInterval(function(){
  showComments();
}, 2000);
;
function createNavbar()
{
  var navbardiv= document.getElementById("navbardiv"); 
  navbardiv.innerHTML='';
  var userservice =new  Userservice();
  var curuser=userservice.getCurrentUser();
  navbardiv.innerHTML+='<a class="active" href="#">Home</a>'
  if(curuser==null)
  {
    navbardiv.innerHTML+='<a  id="reg" href="../../Users/Register/Register.html">Register</a>'
    navbardiv.innerHTML+='<a id="loginlink" href="#">Login</a>'
    document.getElementById('commentText').style.display ='none';
    document.getElementById('addComment').style.display ='none';
  }
  else
  {
    document.getElementById('commentText').style.display ='block';
    document.getElementById('addComment').style.display ='block';
   
    if(curuser.IsAdmin)
    {
      navbardiv.innerHTML+='<a href="../../Users/ShowAllUsers/ShowAllUsers.html" >Users</a>'
    }
    else
    {
      link=document.createElement('a');
      link.href='../../Quizzes/quiz.html';
      link.innerText='Take Quiz';
      navbardiv.append(link);
      link=document.createElement('a');
      link.href='../../Quizzes/history.html';
      link.innerText='Activity';
      navbardiv.append(link);
      link=document.createElement('a');
      link.classList.add('userName');
      link.href='../../Users/editUser/editUser.html?ID='+curuser.ID;
      link.innerText=curuser.UserName;
      navbardiv.append(link);

    }
    navbardiv.innerHTML+='<a id="logoutlink" href="#" >Logout</a>'
  }
};
createNavbar();
var userservice =new  Userservice();
// login
function login()
 {
  var username=document.getElementById('Username').value;
  var password=document.getElementById('Password').value;
  var userservice =new  Userservice();
  if(userservice.login(username,password))
  {
    
    $('#boxDiv,#loginDiv').hide();
    window.location.reload();
  }
  
};

$(document).ready(function(){

  //$('#alert').click(function(){alert('alert')})
  
  
  $('#loginlink').click(function()
  {
    window.
   $("#boxDiv,#loginDiv").fadeIn('slow');
  });

  $('#logoutlink').click(function(){
    var userservice =new  Userservice();
    userservice.logout();
    window.location.reload();
    });
  
  $('#cancelbtn').click(function(){
  $('#boxDiv,#loginDiv').hide();
  });
  
});


