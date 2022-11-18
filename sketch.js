var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database = firebase.database()
  
    var location = database.ref("ball/position")
    //First argument of the listener function(on) must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".
    location.on("value",readposition,errormessage)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(a,b){
    database.ref("ball/position").update({
        x:position.x+a,
        y:position.y+b

    })

}


function readposition (data){
         position = data.val()
       ball.x = position.x
       ball.y = position.y
         
}

function errormessage (){
    console.log("Data not received from database.")
}
