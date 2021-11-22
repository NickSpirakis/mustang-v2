var urlcont = [];
var pageCounter = 1;
var pplContainer = document.getElementById("people-info");
var btn = document.getElementById("btn");

var btn2 = document.getElementById("btn2");
var contContainer = document.getElementById("contact-info");




//---------------------------------------------------------------------------

var contactArray = [];
var currentContactIndex = 0;

//add
function addContact(){
  console.log("addContact() running");
  var newContact = {
    preferredName  : document.getElementById("nameID").value,   
    email : document.getElementById("emailID").value,   
    city  : document.getElementById("cityID").value,   
    state : document.getElementById("stateID").value,
    zip : document.getElementById("zipID").value  
  }
  contactArray.push(newContact);
  //currentContactIndex.push(newContact);
  currentContactIndex = currentContactIndex + 1;
  console.log(contactArray);
  viewCurrentContact();

  //pplContainer.insertAdjacentHTML('beforeend', newContact);
}

function remove(){
  console.log("removeContact() Running");
  if (contactArray.length > 1){
    //contactArray = contactArray.splice(currentContactIndex,1);
    contactArray = contactArray.pop();
  }
  console.log(contactArray);
  viewCurrentContact();
}

function viewCurrentContact() {

  currentContact = contactArray[currentContactIndex];
  console.log(currentContact);
  document.getElementById("nameID").value = currentContact.preferredName;   
  document.getElementById("emailID").value = currentContact.email;   
  document.getElementById("cityID").value = currentContact.city;   
  document.getElementById("stateID").value = currentContact.state;
  document.getElementById("zipID").value = currentContact.zip;   
  document.getElementById("statusID").innerHTML = "Status: Viewing contact " + (currentContactIndex+1) + " of " + contactArray.length;

}




function previous() {
  if (currentContactIndex > 0) {
      currentContactIndex--;
  }
  currentContact = contactArray[currentContactIndex];
  viewCurrentContact();
}

function next() {
  if (currentContactIndex < (contactArray.length-1)) {
      currentContactIndex++;
  }
  currentContact = contactArray[currentContactIndex];
  viewCurrentContact();
  console.log(contactArray);
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


//----//----//----
//-----------------------------------
/*
function loadIndex() {
  // Load the Mustang index file.
  var indexRequest = new XMLHttpRequest();
  indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
  indexRequest.onload = function() {
      console.log("Index JSON:" + indexRequest.responseText);
      document.getElementById("indexID").innerHTML = indexRequest.responseText;
      contactIndex = JSON.parse(indexRequest.responseText);
      for (i=0; i<contactIndex.length; i++) {
          contactURLArray.push(contactIndex[i].ContactURL);
      }
      console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
      loadContacts();
  }
  indexRequest.send();
}

function loadContacts() {
  // Clear the current contactArray.
  contactArray.length = 0;
  loadingContact = 0;

  // Note that W3C documentation and my experimentation indicate that each XMLHttpRequest callback function must be a 
  // unique instance of a function. A better implmentation would have had an array of callback functions instead of a 
  // recursive call to loadNextContact().
  if (contactURLArray.length > loadingContact) {
      loadNextContact(contactURLArray[loadingContact]);
  }
}

function loadNextContact(URL) {
  console.log("URL: " + URL);
  contactRequest = new XMLHttpRequest();
  contactRequest.open('GET', URL);
  contactRequest.onload = function() {
      console.log(contactRequest.responseText);
      var contact;
      contact = JSON.parse(contactRequest.responseText);
      console.log("Contact: " + contact.firstName);
      contactArray.push(contact);

      document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);

      document.getElementById("statusID").innerHTML = "Status: Loading " + contact.firstName + " " + contact.lastName;

      loadingContact++;
      if (contactURLArray.length > loadingContact) {
          loadNextContact(contactURLArray[loadingContact]);
      }
      else {
          document.getElementById("statusID").innerHTML = "Status: Contacts Loaded (" + contactURLArray.length + ")";
          viewCurrentContact()
          console.log(contactArray);

          //Todo: Sort contacts array.
      }
  }

  contactRequest.send();
}
*/
//----------------------------------------------------------------------------
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


