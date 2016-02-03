PlayersList = new Mongo.Collection('players'); //creating a global variable named PlayersList to reference the collection

// PlayersList.insert({ //Putting elements in our collection
//   name: "Ed", 
//   score: 13
// })

if(Meteor.isClient){ //This displays only on the console
  console.log("Hello Client");
  Template.leaderboard.helpers({ //This lets us create multiple helper functions
    'player': function(){
        return PlayersList.find({}, {sort: {score: -1, name: 1} })
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
        return "selected";
      }
    }
  });
  Template.leaderboard.events({
    'click .player': function(){//To SET/display id's for players
      console.log(this); 
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      // var selectedPlayer = Session.get('selectedPlayer');
      // console.log(selectedPlayer);
    },
    'click .increment': function(){ //Increases the "score" variable of each element/player we select
      var selectedPlayer = Session.get('selectedPlayer');
      //console.log(selectedPlayer);
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decrement': function(){ //Decreases the "score" variable of each element/player we select
      var selectedPlayer = Session.get('selectedPlayer');
      //console.log(selectedPlayer);
      PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    },
    'showSelectedPlayer': function(){//Returns the "name" value of the found selectedPlayer
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer)
    },
    'click .remove':function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
    }
  })
  
  Template.addPlayerForm.events({ //There are several ways to submit forms, so this is the safest way to make sure every "submit" event executes properly
    'submit form': function(event){
      event.preventDefault();//This prevents the default function and we can set it to do whatever we want
      //console.log("Can you see me?!");
      //console.log(event.type);
      var playerNameVar = event.target.playerName.value;
      console.log(playerNameVar);
      PlayersList.insert({
        name: playerNameVar,
        score: 0
      });
    }
  })
}

// if(Meteor.isServer){
//   console.log("Hello Server!!");
// }

