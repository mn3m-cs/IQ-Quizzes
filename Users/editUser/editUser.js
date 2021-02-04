$(document).ready(function()
{
    
    var ID =window.location.search;

    ID=ID.split('=');
    if(ID.length==2)
    {
    ID=ID[1];
    var  userservice=new Userservice();
    var  curuser=userservice.getCurrentUser();
    if(curuser==null)
    {
     window.location.href("../../Home/Index/HomeIndex.html");
    }
    else 
    {
        console.log($('#navbardiv'));
        console.log(document.getElementById('navbardiv').innerHTML);
        if(curuser.IsAdmin)
        {
        var link =document.createElement('a');
        link.href='../../Users/ShowAllUsers/ShowAllUsers.html';
        link.innerText='Users';
        $('#navbardiv').append(link);
        }
        else
        {
        $("#isAdminRow").css('display','none');
        var link =document.createElement('a');
        link.href='#';
        link.innerText=curuser.UserName;
        $('#navbardiv').append(link);
       
        }
        var link =document.createElement('a');
        link.href='#';
        link.id='logoutlink';
        link.innerText='Logout';
        $('#navbardiv').append(link); 
    }
    
    $('#logoutlink').click(function(){
    var userservice =new  Userservice();
    userservice.logout();
    window.location.href("../../Home/Index/HomeIndex.html");
    });
    var user=userservice.getItemByID(Number(ID));
    if(user!=undefined)
    {
        $("#ID").val(user.ID);
        $("#FullName").val(user.FullName);
        $("#Phone").val(user.Phone);
        $("#Email").val(user.Email);
        $("#UserName").val(user.UserName);
        $("#password").val(user.PassWord);
        $("#ConfirmPassword").val(user.PassWord);
        $("#Rate").val(user.Rate);
        $("#IsAdmin").val(user.IsAdmin);
    }
    }
    $("input").focus(function() { 
        $(this).css("border", "solid 1px blue"); 
    }); 
    var FullNameTest=true;
    var EmailTest=true;
    var PasswordTest=true;
    var UserNameTest=true;
    var PhoneTest=true;
    var ConfirmPasswordTest=true;
    var RateTest=true;
    $("#ConfirmPassword").blur(function()
    {       
       var PasswordValue=document.getElementById("password").value;
       var ConfirmPasswordValue=document.getElementById("ConfirmPassword").value;
      if(PasswordValue==ConfirmPasswordValue)
        {
            $("#ConfirmPassword").css({"border": "solid 1px black", "background-color": "white"}); 
            ConfirmPasswordTest=true;
        }
        else
        {
            $("#ConfirmPassword").css({"border": "solid 1px red", "background-color": "gray"}); 
            ConfirmPasswordTest=false;
        }
    });

    
    $("#Rate").blur(function()
    {
        var RateValue= document.getElementById("Rate").value;
        var Ratepttr=[0-9]*$/g;
        RateTest=Ratepttr.test(RateValue);
      if(RateTest)
        {
            $("#Rate").css({"border": "solid 1px black", "background-color": "white"}); 
        }
        else
        {
            $("#Rate").css({"border": "solid 1px red", "background-color": "gray"});
        }
    });
    
    $("#FullName").blur(function()
    {
        var FullNameValue= $("#FullName").val();
        var FullNamepttr=/[a-zA-Z]{3}[a-zA-Z]*/g;
        FullNameTest=FullNamepttr.test(FullNameValue);
        if(FullNameTest)
        {
            $("#FullName").css({"border": "solid 1px black", "background-color": "white"}); 
        }
        else
        {
            $("#FullName").css({"border": "solid 1px red", "background-color": "gray"}); 
        }
    });

    $("#Phone").blur(function()
    {
        var PhoneValue= document.getElementById("Phone").value;
        var Phonepttr=/^01[0-2][0-9]{8}$/g;
        PhoneTest=Phonepttr.test(PhoneValue);
        if(PhoneTest)
        {
            $("#Phone").css({"border": "solid 1px black", "background-color": "white"}); 
        }
        else
        {
            $("#Phone").css({"border": "solid 1px red", "background-color": "gray"}); 
        }
    });

    $("#UserName").blur(function()
    {
        var UserNameValue= document.getElementById("UserName").value;
        var UserNamepttr=/^[a-zA-Z]{1}[a-zA-Z0-9]{7}[a-zA-Z0-9]*$/g;
        UserNameTest=UserNamepttr.test(UserNameValue);
        if(UserNameTest)
        {
            $("#UserName").css({"border": "solid 1px black", "background-color": "white"}); 
        }
        else
        {
            $("#UserName").css({"border": "solid 1px red", "background-color": "gray"}); 
        }
    });
    $("#Email").blur(function()
    {
        var EmailValue= document.getElementById("Email").value;
        var Emailpttr=/^([a-z0-9\._-]+)@([a-z0-9_\.-]+)\.([a-z\.]{3,6})$/g;
        EmailTest=Emailpttr.test(EmailValue);
        if(EmailTest)
        {
            $("#Email").css({"border": "solid 1px black", "background-color": "white"}); 
        }
        else
        {
            $("#Email").css({"border": "solid 1px red", "background-color": "gray"}); 
        }
    });
    $("#password").blur(function()
    {
        var PasswordValue=document.getElementById("password").value;
       var Passwordpttr=/^[0-9A-Za-z]{8,}$/g;
       PasswordTest=Passwordpttr.test(PasswordValue);
      if(PasswordTest)
        {
            $("#password").css({"border": "solid 1px black", "background-color": "white"}); 
        }
        else
        {
            $("#password").css({"border": "solid 1px red", "background-color": "gray"}); 
        }
    });
    $("#BackBtn").click(
        function ()
        {
            if(curuser.IsAdmin)
                    window.location.href='../ShowAllUsers/ShowAllUsers.html'
                    else
                    window.location.href='../../Home/Index/HomeIndex.html'
        }
    );
    $("#EditBtn").click(
        function (event)
        {

            if(FullNameTest&&EmailTest&&PasswordTest&&UserNameTest&&PhoneTest&&ConfirmPasswordTest&&RateTest)
            {
                user.ID=Number($("#ID").val());
                user.FullName=$("#FullName").val();
                user.Phone=$("#Phone").val();
                user.Email=$("#Email").val();
                user.UserName=$("#UserName").val();
                user.PassWord=$("#password").val();
                user.Rate=Number($("#Rate").val());
                if(curuser.IsAdmin)
                {
                    user.IsAdmin=Boolean($("#IsAdmin").val());
                }
                else
                {
                    user.IsAdmin=false;
                }

                
                if(userservice.edit(user,user.ID))
                {
                    alert("Done");
                    if(curuser.IsAdmin)
                    window.location.href='../ShowAllUsers/ShowAllUsers.html'
                    else
                    window.location.href='../../Home/Index/HomeIndex.html'
                    

                }
                else
                {
                    alert("Error");
                }
                
            }
            else
            {
             alert("not valid")
             event.preventDefault();
            }
        }
    );

});
