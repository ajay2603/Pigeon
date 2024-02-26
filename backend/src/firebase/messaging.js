var admin = require("firebase-admin");

function initFireBase() {
  console.log("hello");
  console.log(process.env.FB_SERVICE_KEY);
  var serviceAccount = require(process.env.FB_SERVICE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("done");
}

function getFBAdmin() {
  return admin;
}

module.exports = { getFBAdmin, initFireBase };
