var userservice;
userservice=new Userservice();
var curuser=userservice.getCurrentUser();
var navbarDiv=document.getElementById('navbardiv');
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
function showusers()
{

 users=userservice.getAll();
console.log(users.length);
var showUsersTable=document.getElementById("showUsersTable");
showUsersTable.innerHTML='';
for (const user of users) 
{
   
        // creates a table row
        var row = document.createElement("tr");
        for(var propt in user)
        {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell = document.createElement("td");
          var cellText = document.createTextNode(user[propt]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        //Create actions
        var cell = document.createElement("td");
        //../createUser/createUser.html?ID='+user['ID']
        cell.innerHTML='<button class="actionBtn" onclick="openDetailPageById('+user['ID']+')" >Details</button>'
         +'<button class="actionBtn" onclick="openEditPageById('+user['ID']+')" >Edit</button>'
         +'<button class="actionBtn" onclick="DeleteUserById('+user['ID']+')" >Delete</button>'
         row.appendChild(cell);
        
        // add the row to the end of the table 
        showUsersTable.appendChild(row); 

}
}
showusers();
function openDetailPageById(ID)
{
    window.location.href="../detailsUser/detailsUser.html?ID="+ID;
}
function openEditPageById(ID)
{
    window.location.href="../editUser/editUser.html?ID="+ID;
}
function DeleteUserById(ID )
{

    if(userservice.delete(Number(ID)))
    {  
        showusers();
    }
    else
    {
        alert("Error")
    }
}
