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
    'run': function(){
      return PlayersList.find();  
    }
  });
  Template.leaderboard.events({
    //events go here
    'click .first':function(){
      alert("Looks Good!");
    }
  });
}

// if(Meteor.isServer){
//   console.log("Hello Server!!");
// }

