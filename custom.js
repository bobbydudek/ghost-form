//toggle the form visibility. For demo purposes only
function toggleGhostForm() {
    var ghostFormContainer = document.getElementById("ghost-form-container");
    ghostFormContainer.style.display = ghostFormContainer.style.display === 'none' ? '' : 'none';
}

//copy values from form 1 to form 2
function copyFormValueToGhostForm(oForm1Name, oForm2Name, oForm1ElementName, oForm2ElementName) {

    var oForm1 = document.forms[oForm1Name];
    var oForm2 = document.forms[oForm2Name];
    var oForm1Element = oForm1[oForm1ElementName];
    var oForm2Element = oForm2[oForm2ElementName];

    if (oForm2Element.value == '') {
        oForm2Element.value += oForm1Element.value;
    } else {
        oForm2Element.value += ', ' + oForm1Element.value;
    }
}

// Name and Email validation Function
/*
function validation() {
var first_name = document.getElementById("ghost_first_name").value;
var last_name = document.getElementById("ghost_last_name").value;
var email = document.getElementById("ghost_email").value;
var emailReg = /^([w-.]+@([w-]+.)+[w-]{2,4})?$/;
if (first_name === '' || last_name === '' || email === '') {
alert("Please fill all fields...!!!!!!");
return false;
} else if (!(email).match(emailReg)) {
alert("Invalid Email...!!!!!!");
return false;
} else {
return true;
}
}
*/




let users = [];
//example {firt_name: 'Bobby', last_name: 'Dudek'}

const addUser = (ev) => {
    ev.preventDefault(); //stop form submit redirect
    let user = {
        first_name: document.getElementById('ghost_first_name').value,
        last_name: document.getElementById('ghost_last_name').value,
        email: document.getElementById('ghost_email').value,
        lists: document.getElementById('ghost_lists').value

    }

    //object array to push user data into
    users.push(user);
    document.forms[0].reset(); //clear forms for next entries


    //another option to reset the form
    //document.querySelector('form').reset();

    //for demo purposes only
    console.warn('added', { users });
    let pre = document.querySelector('#msg pre');
    pre.textContent = '\n' + JSON.stringify(users, '\t', 2);

    //save to localStorage
    //localStorage.setItem('myUserProfiles', JSON.stringify(users));
}


//event listener that triggers the object array construction
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', addUser);
    document.getElementById('submit').addEventListener('click', submitGhostForm);
});



//send form to php file as Content-Type: multipart/form-data
const ghostForm = document.getElementById('ghost_form');

    ghostForm.addEventListener('submit', function (e){
        e.preventDefault();

        const formData = new FormData(this);

       fetch('submit.php', {

        method: 'post',
        body: formData

       }).then(function (response) {
            return response.text();
       }).then(function (text) {
            console.log(text);
       }).catch(function (error) {
        console.error(error);
       })

       

    });




//send form to php file with fetch as Content-Type: 'application/json',
/*
const ghostForm = document.getElementById('ghost_form');

ghostForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const data = users;

    fetch('submit.php', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
*/



function submitGhostForm() {
   document.getElementById('ghost_form').requestSubmit();
   document.getElementById('ghost_form').reset();

}




