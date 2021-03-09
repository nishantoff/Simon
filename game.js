var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red", "blue", "green", "yellow"];
var level = 0;

// New Sequence

function newSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChoosenColor=buttonColors[randomNumber];
  $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChoosenColor);
}

// User Click

$(".btn").click(function(){
  var userChoosenColor=$(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
});



// Play Sound

function playSound(name)
{
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

// Animation

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

$(document).keydown(function(){
  if(gamePattern.length==0)
  {
    newSequence();
  }
});

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
  {
    if(userClickedPattern.length==gamePattern.length)
    {
      setTimeout(function () {
        newSequence();
      }, 1000);

    }
  }
  else{
    endGame();
  }
}

function endGame()
{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },300);
  $("h1").text("Game over, press any key to restart");
  gamePattern=[];
  level=0;

}
