var admin = require("firebase-admin");

function initFireBase() {
  var serviceAccount = require(process.env.FB_SERVICE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

function getFBAdmin() {
  return admin;
}

module.exports = { getFBAdmin, initFireBase };
