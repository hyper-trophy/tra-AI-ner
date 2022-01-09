var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
// console.log(serviceAccount)
if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://trainer-83174-default-rtdb.firebaseio.com/"
      });
}

export default admin;