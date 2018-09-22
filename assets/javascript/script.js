$(document).ready(function(){
function buildQuiz() {
  // we'll need a place to store the HTML output
  $(".Instructions").empty();
  submitButton.style.display= "block";
  const output = [];
 
  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // we'll want to store the list of answer choices
    var answers = [];
    //console.log (questionNumber);
    // and for each available answer...
    for (letter in currentQuestion.answers) {
      // ...add an HTML radio button
      // answers.push("<label><input type='radio' name='"+ questionNumber +"' value='" + letter + "' class='option-input radio'>" +
      //      currentQuestion.answers[letter] + "</label>");
      answers.push(`<label>
            <input type="radio" class= "option-input radio" name="question${questionNumber}" value="${letter}">      
            ${currentQuestion.answers[letter]}
          </label>`
        );
   
    }
    
    // add this question and its answers to the output
    output.push("<div class='question'>" +  currentQuestion.question + "</div>" +
    " <div class='answers'>" +  answers.join("") + "</div>");
    
  });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = "<h4>Time Left : " + "<span id = 'timer'></span></h4>" + output.join(""); 
  //quizContainer.innerHTML = output.join("");
  //console.log(output);
}


function CheckAnswersShowResults()
{
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");

  // keep track of user's answers
  var numCorrect = 0;
  var numWrong = 0;
  var numUnanswered = 0;
  var wronganswers = [];

  
 // console.log(myQuestions);
  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // find selected answer
    var answerContainer = answerContainers[questionNumber];
    //console.log(answerContainers);
    var selector = `input[name=question${questionNumber}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;
   // console.log(currentQuestion.correctAnswer, userAnswer);

    // if answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = "lightgreen";
    } else {
      // if answer is wrong or blank
      // color the answers red
      //console.log(currentQuestion.answers[currentQuestion.correctAnswer]);
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

  // show number of correct answers out of total
  var displayHTML = "<h3>Correct Answers : " + numCorrect + "</h3>";
  displayHTML += "<h3>Wrong  Answers : " + numWrong + "</h3>";
  displayHTML += "<h3>Unanswered  Questions : " + numUnanswered + "</h3>";
  displayHTML += wronganswers.join("");
  
  //resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  //resultsContainer.appendChild(displayHTML);
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
//buildQuiz();
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



