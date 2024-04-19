var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var a=-1;
var level=0;
var highscore=0;

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]) return true;
    else return false;

}
function  changeLevel(l){
    $("h1").text("Level "+l);
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(()=>{$("."+currentColour).toggleClass("pressed");});
}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
$(".btn").click(function(){
    a+=1
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    if(checkAnswer(a)){
        playSound(userChosenColour);
        if(a===level){
            setTimeout(()=>{
                a=0;
                userClickedPattern=[];
                newSequence();
                
            },300);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(()=>{$("body").toggleClass("game-over");},200);
        userClickedPattern=[];
        gamePattern=[];
        a=-1;
        level=0;
    }
    

});

function newSequence(){
    if(level>highscore){
        $("h2").text("High score : "+level);
        highscore=level;
    }
    level+=1;
    changeLevel(level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
}
$(document).keypress(function(event){
    if(a===-1){
        a=0;
        newSequence();
    }
})