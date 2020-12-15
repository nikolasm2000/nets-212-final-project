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
    }

    
}
