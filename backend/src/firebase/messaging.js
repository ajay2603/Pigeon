var admin = require("firebase-admin");

function initFireBase() {
  var serviceAccount = require(process.env.FB_SERVICE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FBP_ID,
  });
}

module.exports = { initFireBase };
