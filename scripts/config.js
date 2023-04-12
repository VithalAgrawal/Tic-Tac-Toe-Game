function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid; //dataset property exists with every html element
  //which interacts with the js code. It is an object that will
  //be populated withh all the data attributes added to the elements

  //converting to number using +

  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault(); /*prevent browser default behaviour of 
    sending request to a server (which is not present) which causes
    the page to reload which finishes the ongoing game*/
  // so, to handle the submission we use javascript
  const formData = new FormData(event.target); /*FormData is a built-in
    blueprint that takes a form (a pointer and a form html element) & will
    then automatically extract values entered into that form*/
  let enteredPlayername = formData.get("playername"); /*to get value of 
    input named "playername" (which is the class name / value name and not id name)*/
  enteredPlayername = enteredPlayername.trim(); //to trim excess whitespaces like '  ' => ''  or '  Vithal    Agrawal ' => 'Vithal Agrawal'
  // console.log(enteredPlayername);

  if (!enteredPlayername) {
    //empty string => falsy value
    event.target.firstElementChild.classList.add("error");
    // alert('Error');
    errorsOutputElement.textContent = "Please enter a valid name!";
    return;
  }

  // data attribute is a special attribute
  // example, data-playerid="1"

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[2].textContent = enteredPlayername;

  // if(editedPlayer === 1){
  //   players[0].name = enteredPlayername;
  // }
  // else{
  //   players[1].name = enteredPlayername;
  // }
  players[editedPlayer - 1].name = enteredPlayername;

  closePlayerConfig();
}