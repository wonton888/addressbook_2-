function Contact(firstName, lastName){
  this.firstName = firstName
  this.lastName = lastName
  this.addresses = []
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(street, city, state, category) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.category = category;
}

Address.prototype.fullAddress = function() {

  var tempCategory = "";
  if (typeof this.category === "undefined")
  {tempCategory = ""}
  else {tempCategory = this.category + ", ";}

  return tempCategory + this.street + ", " + this.city + ", " + this.state;
}

function resetFields(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $("div.new-address").not(':first').remove();
}

$(document).ready(function() {


    $("#add-address").click(function() {
        $("#new-addresses").append('<div class="new-address">' +
                                     '<div class="form-group">' +
                                       '<label for="new-street">Street</label>' +
                                       '<input type="text" class="form-control new-street">' +
                                     '</div>' +
                                     '<div class="form-group">' +
                                       '<label for="new-city">City</label>' +
                                       '<input type="text" class="form-control new-city">' +
                                     '</div>' +
                                     '<div class="form-group">' +
                                       '<label for="new-state">State</label>' +
                                       '<input type="text" class="form-control new-state">' +
                                     '</div>' +
                                   '</div>');
      });

    $("form#new-contact").submit(function(event) {
        event.preventDefault();

        var inputtedFirstName = $("input#new-first-name").val();
        var inputtedLastName = $("input#new-last-name").val();


        var newContact = new Contact(inputtedFirstName, inputtedLastName);

    //     // var newContact = {
    //     //         firstName: inputtedFirstName,
    //     //         lastName: inputtedLastName,
    //     //         addresses: []
    // };

        $(".new-address").each(function(){
            var iStreet = $(this).find("input.new-street").val();
            var iCity = $(this).find("input.new-city").val();
            var iState = $(this).find("input.new-state").val();

                var newAddress = {
                    street: iStreet,
                    city: iCity,
                    state: iState
                }

                newContact.addresses.push(newAddress);
                });


           $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span><li>");
        // $("ul#contacts").append( "<li><span class = 'contact'>" + newContact.firstName + " " + newContact.lastName + "</span></li>" );



        $(".contact").last().click(function() {
          $("#show-contact").show();

          $("#show-contact h2").text(newContact.firstName);
          $(".first-name").text(newContact.firstName);
          $(".last-name").text(newContact.lastName);

          $("ul#addresses").text("");
          newContact.addresses.forEach(function(address) {
              $("ul#addresses").append("<li>" + address.street + ", " + address.city + ", " + address.state + "</li>");
          });
        });//ends contact click function

        // $("input#new-first-name").val("");
        // $("input#new-last-name").val("");
        // $("input.new-street").val("");
        // $("input.new-city").val("");
        // $("input.new-state").val("");

        resetFields();


  });//ends form submit function
});//ends document ready function
