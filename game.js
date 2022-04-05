const buttonColor = ["red", "green", "blue", "yellow"];

var gamePattern =[];
var userClickedPattern =[];

var started = false;
var level = 0;

//Starting the game by taking a keyboard press.
$(document).keydown(function(){
    if(!started){
        
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});


//Collecting the user pattern
$(".btn").click(function()
{
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    
    checkAnswer(userClickedPattern.length-1);
});


//Checking the game pattern with the user patern
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);

        }

    } else{
        console.log("Wrong");

        //Playing the wrong sound
        playSound("wrong");


        //Changing the body color after pressing the wrong pattern
        $("body").addClass("game-over");
        setTimeout (function(){
        $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press any key to restart");

        startOver();
        

    }
}

//Choosing random number and color
function nextSequence(){

    userClickedPattern =[];
    
    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColor);
    
}

//Playing Sound
function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}


//Transition after clicking btn
 function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
 //Transition out after clicking a btn after
 setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}


