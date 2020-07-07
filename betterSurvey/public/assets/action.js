
// jQuery that will "listen" to the html index.ejs
$(document).ready(function(){
    var form = document.getElementsByClassName('myForm').item(0);

  $('#submit').on('click',function(e){
      console.log('test ready', form)
      e.preventDefault();//<--add here ---^
      // var item = $('form input');
      console.log('value',form[1]);

      var formObject = {
          fruit:form[0].value,
          color:{
              colorOne:form[1].checked?form[1].value:'',
              colorTwo:form[2].checked?form[2].value:'',
              colorThree:form[3].checked?form[3].value:''
          },
          animal:form[4].value,
          yearBorn: form[5].value,
          school: form[6].value,
          giftSpend: form[7].value,

      }

      console.log('forms v\'s',formObject);


      $.ajax({
        type: 'POST',
        url: '/survey',
        data: formObject,
        success: function(data){
            console.log('dataaaa'+data)
          // do something with the data via front-end framework
          // Make the submit button red, disabled and saying Thank you
          $("#submit").css("background-color", "red");
          $("#submit").prop("disabled", "true");
          $("#submit").text("Thank you!");
        },
          error: function (e, type, text) {
              console.log(e)
          }
      });
      return false;
  });
});
