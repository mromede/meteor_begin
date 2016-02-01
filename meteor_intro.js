PlayersList = new Mongo.Collection('players'); //creating a global variable named PlayersList to reference the collection

// PlayersList.insert({ //Putting elements in our collection
//   name: "Ed", 
//   score: 13
// })

if(Meteor.isClient){ //This displays only on the console
  console.log("Hello Client");
  Template.leaderboard.helpers({ //This lets us create multiple helper functions
    'player': function(){
        return PlayersList.find();
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
   // events go here
    'click .player': function(){//To SET/display id's for players
      console.log(this); 
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      // var selectedPlayer = Session.get('selectedPlayer');
      // console.log(selectedPlayer);
    }
  });
}

// if(Meteor.isServer){
//   console.log("Hello Server!!");
// }

