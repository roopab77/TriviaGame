$(document).ready(function(){
 
  
//This function builds the html page to display all the quiz questions  
function buildQuiz() {
  $(".Instructions").empty();
  submitButton.style.display= "block";
  var output = [];
 
  myQuestions.forEach((currentQuestion, questionNumber) => {
    var answers = [];
    for (letter in currentQuestion.answers) {
      answers.push(`<label>
            <input type="radio" class= "option-input radio" name="question${questionNumber}" value="${letter}">      
            ${currentQuestion.answers[letter]}
          </label>`
        );
   
    }
    output.push("<div class='question'>" +  currentQuestion.question + "</div>" +
    " <div class='answers'>" +  answers.join("") + "</div>");
    
  });

  quizContainer.innerHTML = "<h4>Time Left : " + "<span id = 'timer'></span></h4>" + output.join(""); 
}

//This function checks the correctanswers /wrong/unanswered and evalueates the quiz.
function CheckAnswersShowResults()
{
  const answerContainers = quizContainer.querySelectorAll(".answers");

  var numCorrect = 0;
  var numWrong = 0;
  var numUnanswered = 0;
  var wronganswers = [];
myQuestions.forEach((currentQuestion, questionNumber) => {
    var answerContainer = answerContainers[questionNumber];
    var selector = `input[name=question${questionNumber}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;
    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].style.color = "lightgreen";
    } else {
      var wrongones = "<p>"+ currentQuestion.question + " - " + currentQuestion.answers[currentQuestion.correctAnswer]   +  "</p>";
      wronganswers.push(wrongones);
      answerContainers[questionNumber].style.color = "red";
      if(userAnswer == null)
      {
        numUnanswered++;
      }
      else
      {
        numWrong++;
      }
    }
  });
  var displayHTML = "<h3>Correct Answers : " + numCorrect + "</h3>";
  displayHTML += "<h3>Wrong  Answers : " + numWrong + "</h3>";
  displayHTML += "<h3>Unanswered  Questions : " + numUnanswered + "</h3>";
  displayHTML += wronganswers.join("");
  $("#results").append(displayHTML);
  resultsContainer.style.display = "block";
  quizContainer.style.display = "none";
  submitButton.style.display = "none";

}



var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var startButton = document.getElementById("start");
var timeLeft = 60;
var myQuestions = [
  {
    question: "How old is the game pacman?",
    answers: {
      a: "10 years",
      b: "20 years",
      c: "35 years",
      d: "45 years"
    },
    correctAnswer: "c",
  },
  {
    question: "Which is not a minecraft character?",
    answers: {
      a: "Steve",
      b: "Ender Dragon",
      c: "Dragon Beast",
      d: "Beast Boy"
    },
    correctAnswer: "c"
  },
  {
    question: "Who is Marios main enemy?",
    answers: {
      a: "Toadette",
      b: "Bowser",
      c: "Birdo",
      d: "Waluigi"
    },
    correctAnswer: "b"
  },
  {
    question:"Best selling video game franchise?",
    answers: {
      a:"Grand Theft Auto",
      b:"Mario",
      c:"Call of Duty",
      d:"Pokemon"
    },
    correctAnswer :"b"
  },
  {
    question:" What cartoon is about video games?",
    answers: {
      a:"Wreck It Ralph",
      b:"Turbo",
      c:"Epic",
      d:"The croods"
    },
    correctAnswer :"a"
  },
  {
    question:"In which year did Nintendo introduce its Home Video game system?",
    answers: {
      a:"1985",
      b:"1987",
      c:"1989",
      d:"1991"
    },
    correctAnswer :"a"
  },
  {
    question:"What does Pokémon stand for?",
    answers: {
      a:"Pokey monsoon",
      b:"Portable collectible monsters",
      c:"Poker monkeys",
      d:"Pocket monsters"
    },
    correctAnswer :"d"
  },
  {
    question:"Who helped created Mario, Zelda, and Star Fox?",
    answers: {
      a:"Gabe Newell",
      b:"Sigeru Miyamoto",
      c:"Nobuo Uematsu",
      d:"Satoru Iwata"
    },
    correctAnswer :"b"
  },
  {
    question:" What was Mario’s name in Donkey Kong?",
    answers:{
      a: "Jumpman",
      b : "Mr. Plumber",
      c: "Antonio",
      d : "Junpei"
    },
    correctAnswer : "a"
  },
  {
    question: "Which of these characters never speaks?",
    answers:{
      a: "Nathan Drake",
      b: "Mario",
      c: "Link",
      d: "Master Chief"
    },
    correctAnswer : "c"
  }
];

// display quiz on start 
startButton.addEventListener("click",buildQuiz);

var timer = setInterval(function(){
  timeLeft--;
  if(timeLeft == 0)
  {
    //say time over and evaluate the answers and show the results and stop the timer.
    clearInterval(timer)
    CheckAnswersShowResults();
  }
  document.getElementById("timer").textContent = timeLeft;
  
},1000);

// on submit, show results
submitButton.addEventListener("click", CheckAnswersShowResults);

});



