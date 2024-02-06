
// Global variables
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

--++++++-// To start the game
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level"+level);
    nextSequence();
    started = true;
  }
});


//To set the Sequence
function nextSequence(){
  userClickedPattern = [];
level++;
$('#level-title').text("Level:" +level);
var randomNumber = Math.floor(Math.random()*4)

// generating the sequence of the game
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

// Animating the clicks
$("#" +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//sounds for the random colour
playsound(randomChosenColour);

}


// function for button sound
function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
  }




// To check which button is being cicked
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1);
});



//Checking answers
function checkAnswer(currentLevel){
  console.log(gamePattern);
  console.log(userClickedPattern);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if(userClickedPattern.length ==+ gamePattern.length){
        setTimeout(() => {
          nextSequence();
        },1000);
      }
    }else{
      playsound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}







//function for animation
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");  
  },100);
}



//Reset the game
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}