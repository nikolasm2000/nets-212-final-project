db = require('./database.js');

console.log(process.argv[2])

if(process.argv[2] == undefined){
    console.log("Creating tables...")
    db.create_table();
} else {
    console.log("Deleting tables...")
    switch(process.argv[2]){
        case "users":
            db.user.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table User has been deleted');
                }
              });
            break;
        case "posts":
            db.posts.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table Posts has been deleted');
                }
              });
            break;
        case "friends":
            db.friends.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table Friends has been deleted');
                }
              });
            break;
        case "notifications":
            db.notifications.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table Notifications has been deleted');
                }
              });
            break;
        case "userinterests":
            db.userInterests.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table UserInterests has been deleted');
                }
              });
            break;
        case "useraffiliations":
          db.userAffiliations.deleteTable(function(err) {
              if (err) {
                console.log('Error deleting table: ', err);
              } else {
                console.log('Table UserAffiliations has been deleted');
              }
            });
          break;
        case "reactions":
            db.reactions.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table Reactions has been deleted');
                }
              });
            break;
        case "finalweights":
            db.finalWeights.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table FinalWeights has been deleted');
                }
              });
            break;
        case "homepage":
            db.homepage.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table Homepage has been deleted');
                }
              });
            break;
        case "chats":
            db.chats.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table Chats has been deleted');
                }
              });
            break;
        case "chatmembers":
            db.chatMembers.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table Chat Members has been deleted');
                }
              });
            break;
        case "messages":
            db.messages.deleteTable(function(err) {
                if (err) {
                  console.log('Error deleting table: ', err);
                } else {
                  console.log('Table Messages has been deleted');
                }
              });
            break;     
    }

    
}
