class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
   question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz

    fill(0);
    textSize(35);
    text("Result of the Quiz",320,40);
    text("----------------------------",300,60);
    

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
if(allContestants !== undefined){
  var displayAnswer = 230;
    //write code to add a note here
    fill("blue");
    textSize(22);
    text("*Note: Contestant who answered correct are highlighted in green colour", 130, 230)
    //write code to highlight contest who answered correctly
     for( var plr in allContestants){
       var correctAns = "2";
       if(correctAns === allContestants[plr].answer)
         fill("green");
         else
         fill("red")
         
         displayAnswer+=30;
         textSize(22);
      text(allContestants[plr].name + ":" +  allContestants[plr].answer, 200, displayAnswer);
     }
    }
  }
}