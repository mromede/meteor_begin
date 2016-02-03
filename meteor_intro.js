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
    }
  })
  
  Template.addPlayerForm.events({
    'submit form': function(){
      console.log("Can you see me?!");
    }
  })
}

// if(Meteor.isServer){
//   console.log("Hello Server!!");
// }

