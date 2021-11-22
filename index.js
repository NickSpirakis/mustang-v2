var urlcont = [];
var pageCounter = 1;
var pplContainer = document.getElementById("people-info");
var btn = document.getElementById("btn");

var btn2 = document.getElementById("btn2");
var contContainer = document.getElementById("contact-info");

//---------------------------------------------------------------------------

//add
function addContact(){
  preferedName: document.getElementById("nameID").value;   
  email: document.getElementById("emailID").value;   
  city: document.getElementById("cityID").value;   
  state: document.getElementById("stateID").value;
  zip: document.getElementById("zipID").value;  


}

function viewCurrentContact() {

  var htmlString = "";

  currentContact = contactArray[currentContactIndex];
  console.log(currentContact);
  document.getElementById("nameID").value = currentContact.preferredName;   
  document.getElementById("emailID").value = currentContact.email;   
  document.getElementById("cityID").value = currentContact.city;   
  document.getElementById("stateID").value = currentContact.state;
  document.getElementById("zipID").value = currentContact.zip;  

  // Todo: Add additional fields.
  
  document.getElementById("statusID").innerHTML = "Status: Viewing contact " + (currentContactIndex+1) + " of " + contactArray.length;

  pplContainer.insertAdjacentHTML('beforeend', htmlString);
}



function callZip(){
  getPlace();
}


function getPlace(){
  var zip = document.getElementById("zipID").value
  console.log("zip:"+zip);

  console.log("function getPlace(zip) { ... }");
  var xhr = new XMLHttpRequest();

  // Register the embedded handler function
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var result = xhr.responseText;
      console.log("result:"+result);
      var place = result.split(', ');
      if (document.getElementById("cityID").value == "")
          document.getElementById("cityID").value = place[0];
      if (document.getElementById("stateID").value == "")
          document.getElementById("stateID").value = place[1];
      }
    }
    xhr.open("GET", "getCityState.php?zip=" + zip);
    xhr.send(null);
}

function keyPressed() {
    console.log('keyPressed()');

    // This type of function should be useful in search as it implements keyPressed.
}

//----------------------------------------------------------------------------

btn.addEventListener("click", function() {
    btns();
});

function btns() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    ourRequest.onload = function() {
      var ourData = JSON.parse(ourRequest.responseText);
      
        renderHTML(ourData);
     
    };
    ourRequest.send();
    
  };
  

function renderHTML(data) {
  var htmlString = "";

  
  for (i = 0; i < data.length; i++) {
    htmlString += "<p>" + data[i].Name + " " + data[i].Email + " " + data[i].ContactURL;
    
     urlcont.push(data[i].ContactURL)
    

    console.log(urlcont);
  }

  pplContainer.insertAdjacentHTML('beforeend', htmlString);
}


function btns2(URL){

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', URL);
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
         console.log(ourData[0]);
        renderHTML2(ourData);
     
         };
    
    ourRequest.send();
  };


  btn2.addEventListener("click", function() {
    contactHelper();
    
    console.log("btn2 hit");
    
  });


  function renderHTML2(data) {
    var htmlString = "";
  
    
    
      htmlString += "<p>" + " first name: " + data.firstName + " last name: " + data.lastName + 
      " prefered name: " + 
      data.preferredName + " email: " + data.email + " phone number: " + data.phoneNumber
      + " class: " + data.class + " room: " + data.room + " Start: " + data.startTime + 
      " Seat: " + data.seatNumber + " inPerson: " + data.inPerson + " virtual: " + data.virtual 
      + " city: " + data.city + " state: " + data.state + " zip: " + data.zip +
       " lat: " + data.lat + " lng: " + data.lng + " hobby: " + data.favoriteHobby + " ";
   
    console.log(data.firstName + " " + data.lastName + " " + "loaded");

    contContainer.insertAdjacentHTML('beforeend', htmlString);
  }



  function contactHelper() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json'); //+ pageCounter + '.json');
    ourRequest.onload = function() {
      var ourData = JSON.parse(ourRequest.responseText);
      //console.log(ourData[0]);
        //renderHTML(ourData);
        renderContactHelper(ourData);
    };
    ourRequest.send();
    
  };


  function renderContactHelper(data) {

    if (urlcont.length < 1){
        
    
     for (i = 0; i < data.length; i++) { //here is other loop
        urlcont.push(data[i].ContactURL)
        }
    }
        loopy();
    }

function loopy(){

    for (i = 0; i < urlcont.length; i++) {
        btns2(urlcont[i]);
    }
}


