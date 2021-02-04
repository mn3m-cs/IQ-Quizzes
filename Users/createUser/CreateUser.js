
var  userservice=new Userservice();
var curuser=userservice.getCurrentUser();
if(curuser==null&&!curuser.IsAdmin)
{
    window.location.href='../../Home/Index/HomeIndex.html';

}
function logout()
{
        var userservice =new  Userservice();
        userservice.logout();
        window.location.href='../../Home/Index/HomeIndex.html'
}
var users=userservice.getAll();
var maxID=0;
for (const user of users) 
{
    if(user.ID>maxID)
    {
        maxID=user.ID;
    }
}
document.getElementById("ID").value=maxID+1;
function blueBorder(obj){
    obj.style.border = "solid 1px blue";
}
var namestate=false;
var emailstate=false;
var passwordstate=false;
function nametest(obj)
{
    var name=obj.value;
    console.log(name);
    var fullnameptt=/[a-zA-Z]{3}[a-zA-Z]*/g;
    if(!fullnameptt.test(name))
    {
        obj.style.border = "solid 1px red";  
        obj.style.backgroundColor ="gray";
        namestate=false;
    }
    else
    {
    obj.style.border = "solid 1px black";  
    obj.style.backgroundColor ="white"; 
    namestate=true;
    }
}

// form validation
var FullNameTest=false;
var EmailTest=false;
var PasswordTest=false;
var UserNameTest=false;
var PhoneTest=false;
var ConfirmPasswordTest=false;

function InputActive(ID)
{
    document.getElementById(ID).style.border = "solid 1px blue";     
}
function FullNameCheck()
{
    var FullNameValue= document.getElementById("FullName").value;
    var FullNamepttr=/[a-zA-Z]{3}[a-zA-Z]*/g;
    FullNameTest=FullNamepttr.test(FullNameValue);
    if(FullNameTest)
    {
        document.getElementById("FullName").style.border = "solid 1px black";  
        document.getElementById("FullName").style.backgroundColor ="white";
    }
    else
    {
        document.getElementById("FullName").style.border = "solid 1px red";  
        document.getElementById("FullName").style.backgroundColor ="gray";  
    }
}

function PhoneCheck()
{
    var PhoneValue= document.getElementById("Phone").value;
    var Phonepttr=/^01[0-2][0-9]{8}$/g;
    PhoneTest=Phonepttr.test(PhoneValue);
    if(PhoneTest)
    {
        document.getElementById("Phone").style.border = "solid 1px black";  
        document.getElementById("Phone").style.backgroundColor ="white";
    }
    else
    {
        document.getElementById("Phone").style.border = "solid 1px red";  
        document.getElementById("Phone").style.backgroundColor ="gray";  
    }
}

function UserNameCheck()
{
    var UserNameValue= document.getElementById("UserName").value;
    var UserNamepttr=/^[a-zA-Z]{1}[a-zA-Z0-9]{7}[a-zA-Z0-9]*$/g;
    UserNameTest=UserNamepttr.test(UserNameValue);
    if(UserNameTest)
    {
        document.getElementById("UserName").style.border = "solid 1px black";  
        document.getElementById("UserName").style.backgroundColor ="white";
    }
    else
    {
        document.getElementById("UserName").style.border = "solid 1px red";  
        document.getElementById("UserName").style.backgroundColor ="gray";  
    }
}

function EmailCheck()
{
    var EmailValue= document.getElementById("Email").value;
    var Emailpttr=/^([a-z0-9\._-]+)@([a-z0-9_\.-]+)\.([a-z\.]{3,6})$/g;
    EmailTest=Emailpttr.test(EmailValue);
    if(EmailTest)
    {
        document.getElementById("Email").style.border = "solid 1px black";  
        document.getElementById("Email").style.backgroundColor ="white";
    }
    else
    {
        document.getElementById("Email").style.border = "solid 1px red";  
        document.getElementById("Email").style.backgroundColor ="gray";  
    }
}
function ConfirmPasswordCheck()
{
    var PasswordValue=document.getElementById("password").value;
    var ConfirmPasswordValue=document.getElementById("ConfirmPassword").value;
    if(PasswordValue==ConfirmPasswordValue)
    {
        document.getElementById("ConfirmPassword").style.border = "solid 1px black";  
        document.getElementById("ConfirmPassword").style.backgroundColor ="white";
        ConfirmPasswordTest=true;
    }
    else
    {
        document.getElementById("ConfirmPassword").style.border = "solid 1px red";  
        document.getElementById("ConfirmPassword").style.backgroundColor ="gray";  
        ConfirmPasswordTest=false; 
    }
}
function PasswordCheck()
{
    var PasswordValue=document.getElementById("password").value;
    var Passwordpttr=/^[0-9A-Za-z]{8,}$/g;
    PasswordTest=Passwordpttr.test(PasswordValue);
    if(PasswordTest)
    {
        document.getElementById("password").style.border = "solid 1px black";  
        document.getElementById("password").style.backgroundColor ="white";
    }
    else
    {
        document.getElementById("password").style.border = "solid 1px red";  
        document.getElementById("password").style.backgroundColor ="gray";  
    }
}
function SubmitForm()
{
    alert(FullNameTest&&EmailTest&&PasswordTest&&UserNameTest&&PhoneTest&&ConfirmPasswordTest)
    if(FullNameTest&&EmailTest&&PasswordTest&&UserNameTest&&PhoneTest&&ConfirmPasswordTest)
    {
        var ID=document.getElementById("ID").value;
        var FullName=document.getElementById("FullName").value;
        var Phone=document.getElementById("Phone").value;
        var Email=document.getElementById("Email").value;
        var UserName=document.getElementById("UserName").value;
        var password=document.getElementById("password").value;
        var IsAdmin=document.getElementById("IsAdmin").checked;
        var userservice=new Userservice();
        var NewUser=new User(Number(ID),FullName,Phone,Email,UserName,password,0,IsAdmin);
        userservice.add(NewUser);
        window.location.href='../ShowAllUsers/ShowAllUsers.html';
    }
    else
    {
        obj.stopPropagation();
        alert("It Not valid");
        
    }
}
