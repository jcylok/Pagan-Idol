const $newForm = $('#newForm')
const $textField = $('.textField .col-md-4 input')


const handleSubmit = function (e) {
    e.preventDefault();
    $('.textfield .col-md-4 div').empty();
    $('#email div').empty();
    const $inputs = $('input');
    $inputs.each(function (index, element) {
        if ($(element)[0].type !== 'submit' && $(element)[0].type !== 'email' && $(element).val().length < 2 ) {
            $(element).addClass('is-invalid');
            $(element).parent().append(`<div>
            ${$(element).attr('name')} must contain at least 2 characters </div>`).css('color', 'red');
        };
        if( /[^a-zA-Z\-\/]/.test( $(element).val() ) && $(element)[0].type !== 'submit' && $(element)[0].type !== 'email') {
            $(element).addClass('is-invalid'); 
            $(element).parent().append(`<div>
            ${$(element).attr('name')} can not contain numbers or special characters</div>`).css('color', 'red');
        }
          
    })

    if ($('#email').val() === '') {
        $('#email').addClass('is-invalid');
        $('#email').parent().append(`
            <div>
            email must not be empty
            </div>
            `).css('color', 'red');
    }

    if (!$('#email').val().match(/@(.*)/)[1].includes('.')) {
        $('#email').addClass('is-invalid');
        $('#email').parent().append(`
            <div>
            email must contain exactly one period (.) after @
            </div>
            `).css('color', 'red');

    }
    function checkEmailDup() {
        $('#dup').empty();
        //ajax request
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/api/v1/users",
            // dataType: 'json',
            success: function(jsonData) {
                let i = 0;
                while (i < jsonData.data.length){
                    if (jsonData.data[i].email === `${$('#email').val()}`) {
                        console.log(jsonData.data[i].email)
                        console.log(`${$('#email').val()}`)
                        $('#email').addClass('is-invalid');
                        $('#email').parent().append(`<div id="dup">
                        ${$('#email').attr('name')} has already been taken. </div>`).css('color', 'red');
                    } 
                    i++;
                }
            },
       
            error: function(){
                console.log('error');
            }
        });
    }
    checkEmailDup()

    if (!$('#first-name').attr('class').includes('is-invalid') &&
        !$('#last-name').attr('class').includes('is-invalid') &&
        !$('#email').attr('class').includes('is-invalid') 
             ) {
            console.log('Submission Success');
            Swal.fire(
                `You're In!`,
                'A confirmation email has been sent to the email you provided.',
                'success'
              )
            let firstName = $("#first-name").val(); 
            let lastName = $("#last-name").val();
            let email = $("#email").val();
            let happyHour = $('#happyImg').attr('src') === '/images/HappyHour-2.png' ? true : false;
            let cocktail = $('#cocktailImg').attr('src') === '/images/Cocktail-2.jpg' ? true : false;
            let tikitender = $('#tikitenderImg').attr('src') === '/images/Tikitender-2.jpg' ? true : false;
            let event = $('#eventsImg').attr('src') === '/images/Events-2.jpg' ? true : false;
            let daily = $('#customCheck5').is(':checked') ? true : false;
            let weekly = $('#customCheck6').is(':checked') ? true : false;
            let monthly = $('#customCheck7').is(':checked') ? true : false;
            let dataString = 'firstName='+firstName+'&lastName='+lastName+'&email='+email+'&happyHour='+happyHour+'&cocktail='+cocktail+'&tikitender='+tikitender+'&event='+event+'&daily='+daily+'&weekly='+weekly+'&monthly='+monthly;
            $.ajax({
                type: 'POST',
                data: dataString,
                url: "http://localhost:3000/api/v1/users",
                success:function(data) {
                console.log(dataString);
                }
            });
        }    
}

$newForm.on('submit', handleSubmit);


$('#happyImg').on('click', ()=> {
    if ($('#happyImg').attr('src') === '/images/HappyHour-1.png' )  {
        $('#happyImg').attr('src', '/images/HappyHour-2.png');
    } else if ($('#happyImg').attr('src') === '/images/HappyHour-2.png' ){
        $('#happyImg').attr('src', '/images/HappyHour-1.png');
    }
    
})

$('#cocktailImg').on('click', () => {
    if ($('#cocktailImg').attr('src') === '/images/Cocktail-1.jpg' )  {
        $('#cocktailImg').attr('src', '/images/Cocktail-2.jpg');
    } else if ($('#cocktailImg').attr('src') === '/images/Cocktail-2.jpg' ){
        $('#cocktailImg').attr('src', '/images/Cocktail-1.jpg');
    }
})

$('#tikitenderImg').on('click', () => {
    if ($('#tikitenderImg').attr('src') === '/images/Tikitender-1.jpg' )  {
        $('#tikitenderImg').attr('src', '/images/Tikitender-2.jpg');
    } else if ($('#tikitenderImg').attr('src') === '/images/Tikitender-2.jpg' ){
        $('#tikitenderImg').attr('src', '/images/Tikitender-1.jpg');
    }
})
$('#eventsImg').on('click', () => {

    if ($('#eventsImg').attr('src') === '/images/Events-1.jpg' )  {
        $('#eventsImg').attr('src', '/images/Events-2.jpg');
    } else if ($('#eventsImg').attr('src') === '/images/Events-2.jpg' ){
        $('#eventsImg').attr('src', '/images/Events-1.jpg');
    }

})


// function JSalert(){
// 	swal("Congrats!", ", Your account is created!", "success");
// }