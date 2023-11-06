var gamePattern = []
var userClickedPattern = []
var level = 0;

var buttonColors = ["red","blue","green","yellow"];



$(document).keypress((event) => {
    if(level!=0){
        return false;
    }
    nextSequence();
});

var clickedbuttons = 0;
function reply(x){
    userClickedPattern.push(x);
    var len = userClickedPattern.length;
    animatePress(x);
    var audio = new Audio("./sounds/"+x+".mp3");
    audio.play();
    if (x!=gamePattern[clickedbuttons]){
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game over! Press any key");
        setTimeout(() => {
            $("body").removeClass("game-over");
        },2000);
        restart();
    }
    else if(gamePattern.length == userClickedPattern.length){
        setTimeout(() => {
            nextSequence();
        },1000)
    }
    clickedbuttons = clickedbuttons+1;
}


function restart(){
    gamePattern=[];
    level=0;
}

function animatePress(x){
    $("#"+x).addClass("pressed");
    setTimeout(() => {
        $("#"+x).removeClass("pressed");
    },500)
}

function nextSequence(){
    userClickedPattern = [];
    clickedbuttons = 0;
    level = level + 1;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var i = 0;
    var myinterval = setInterval(() => { 
        
        $("#"+gamePattern[i]).animate({opacity:0.5}).animate({opacity: 1});
        var audio = new Audio("./sounds/"+gamePattern[i]+".mp3");
        audio.play();
        i = i+1;
        if(i==level){
            clearInterval(myinterval);
        }
    }, 1000);
}