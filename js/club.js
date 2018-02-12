// validate phonenumber
function validatePhone(phone) {
	var regex = /^\d{2,3}\d{3}\d{4}/;
	if(regex.test(phone) == false)
		{
			   document.getElementById("phonestatus").innerHTML = "<span class='warning'>יש להזין ערך באחד מן הפורמטים הבאים: 99-9999999 עבור טלפון נייח בארץ, או 999-9999999, ללא הקו המפריד.</span>";
		}
	
	else {
      document.getElementById("phonestatus").innerHTML	= "<span class='valid'>הפורמט תקין!</span>";	
	  }
}

 // validate password
 function validatepass(pass1)
 {
	var regexpass = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
	if(regexpass.test(pass1) == false) 
    {
		document.getElementById("statuspassword").innerHTML = "<span class='warning'> הסיסמא אמורה להכיל אות גדולה וספרות</span>";
    }
    else
    {
	document.getElementById("statuspassword").innerHTML = "<span class='valid'>תקין</span>";
	}
 }
  // check matching passwords
 function checkPass()
{
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    var message = document.getElementById('confirmMessage');
    var goodColor = "#66cc66";
    var badColor = "#ff6666";

    if(pass1.value == pass2.value){
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "סיסמה זהה"}
	else{
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "סיסמה לא זהה!" }
 }

// validate email
function email_validate(email)
{
var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

    if(regMail.test(email) == false)
    {
    document.getElementById("status").innerHTML    = "<span class='warning'>האימייל לא תקין :(</span>";
    }
    else
    {
    document.getElementById("status").innerHTML	= "<span class='valid'>נראה טוב!</span>";	
    }
}

// validate username
function userName_validate(user) {
var reguserName=/^(?=.*\d)[0-9a-zA-Z]{6,}$/;
 if(reguserName.test(user) == false)
    {
    document.getElementById("userNameStatus").innerHTML    = "<span class='warning'>יש להכניס 6 תווים :(</span>";
    }
    else
    {
    document.getElementById("userNameStatus").innerHTML	= "<span class='valid'>נראה טוב!</span>";	
    }
}

// validate date of birth
function dob_validate(dob)
{
	var regDOB = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/;

    if(regDOB.test(dob) == false)
    {
    document.getElementById("statusDOB").innerHTML	= "<span class='warning'>הכנס גיל.</span>";
    }
    else
    {
    document.getElementById("statusDOB").innerHTML	= "<span class='valid'>גיל תקין</span>";	
    } 
}

document.getElementById("field_terms").setCustomValidity("בבקשה אשר/י תנאי שימוש");
