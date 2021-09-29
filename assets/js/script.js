var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".time");
var headerElement = document.querySelector("header");
var highScoreBoard = document.querySelector(".highScoreBoard");
var finalPage = document.querySelector(".finalPage");
var scores;
var timerCount;
var penalty = 10;
var allRecord=[];

var choiceList = document.createElement("ul");

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices:["strings","booleans","alerts","numbers"],
        answer:"alerts",
    },
    {
        title: "The condition in an if/else statement is enclosed within ____.",
        choices:["quotes","curly brackets","parentheses","square brackets"],
        answer:"parentheses",
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    },
];

var index = 0;


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);


// The startGame function is called when the start button is clicked
function startGame() {
    timerCount = 121;
    startTimer();
  }

// The setTimer function starts and stops the timer
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
      timerCount--;
      timerElement.textContent = timerCount;
    //   if (timerCount > 0) {
    //     clearInterval(timer);
    //   }
      // Tests if time has run out
      if (timerCount <= 0) {
        // Clears interval
        clearInterval(timer);
        finish();
      }
    }, 1000);
    render(index);
  }

//The function to render questions
  function render(index){
    headerElement.innerHTML = "";
    choiceList.innerHTML = "";

    for(var i =0; i<questions.length;i++){
        var showQuestion = questions[index].title;
        var showChoices = questions[index].choices;
        headerElement.textContent = showQuestion;
        headerElement.style.fontSize = "36px";
    }

    for(var i = 0; i<showChoices.length; i++){
        var listItem = document.createElement("li");
        listItem.textContent = showChoices[i];
        headerElement.appendChild(choiceList);
        choiceList.appendChild(listItem);
        listItem.addEventListener("click",compare);
      }

  }


  function compare(event){
      var userChoice = event.target;
      var alertMessage = document.createElement("p");
      alertMessage.setAttribute("id", "Message");
      alertMessage.style.color="red";
      if(userChoice.textContent == questions[index].answer){
        alertMessage.textContent = "Correct!";
        setTimeout(function(){
            alertMessage.textContent = "";
        },1000);  

      }else{
          timerCount = timerCount - penalty;
          alertMessage.textContent = "Wrong!";
          setTimeout(function(){
            alertMessage.textContent = "";
        },1000);  
      }

      index++;

      if(index >=questions.length){
          finish();
          clearInterval(timer);
      }else{
          render(index);
      }
      headerElement.appendChild(alertMessage);
  }

function finish(){
    headerElement.innerHTML = "";
    choiceList.innerHTML = "";
    // alertMessage.textContent = "";
    scores = timerCount;
    
    var finalTitle = document.createElement("h1");
    finalTitle.textContent="All done!";
    headerElement.appendChild(finalTitle);

    var showSocre = document.createElement("p");
    showSocre.textContent="Your final socre is "+ scores+".";
    headerElement.appendChild(showSocre);

    var askInital = document.createElement("label");
    askInital.textContent="Enter initials: ";
    headerElement.appendChild(askInital);

    var userInput = document.createElement("input");
    userInput.setAttribute("type","text");
    userInput.textContent = "";
    headerElement.appendChild(userInput);

    var submitButton = document.createElement("button");
    submitButton.setAttribute("type","submit");
    submitButton.textContent="Submit";
    headerElement.appendChild(submitButton);

    submitButton.addEventListener("click",function(event){
        event.preventDefault();
        var initials = userInput.value;
        var records = {
            initial:initials,
            score:scores
        };
        allRecord.push(records);
        localStorage.setItem('allRecord',JSON.stringify(allRecord));
        renderRecord();

    });

}

function renderRecord(){
    var lastRecord = JSON.parse(localStorage.getItem('allRecord'));
    if(lastRecord!== null){
        headerElement.innerHTML="";
        var scoreTitle = document.createElement("h1");
        scoreTitle.textContent="Score Board";
        headerElement.appendChild(scoreTitle);
        for(var i=0; i<lastRecord.length;i++){
            var eachRecord = document.createElement("li");
            eachRecord.textContent=lastRecord[i].initial+ "--"+lastRecord[i].score;
            highScoreBoard.appendChild(eachRecord);
        } 
    }
}

function init(){

    var storeRecords = JSON.parse(localStorage.getItem('allRecord'));

    if(storeRecords !== null){
        allRecord = storeRecords;
    }
}

init();
