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

var ID =window.location.search;

ID=ID.split('=');
if(ID.length==2)
{
ID=ID[1];
console.log(window.location.search);
console.log(ID);

var user=userservice.getItemByID(Number(ID));
console.log(user);
console.log(userservice.getAll());
if(user!=undefined)
{
document.getElementById("ID").value=user.ID;
document.getElementById("FullName").value=user.FullName;
document.getElementById("Phone").value=user.Phone;
document.getElementById("Email").value=user.Email;
document.getElementById("UserName").value=user.UserName;
document.getElementById("password").value=user.PassWord;
document.getElementById("Rate").value=user.Rate;
document.getElementById("IsAdmin").checked=user.IsAdmin;
}
}
