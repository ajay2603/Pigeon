var admin = require("firebase-admin");

function initFireBase() {
  var serviceAccount = require(process.env.FB_SERVICE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FBP_ID,
  });
}

function sendMsgNotification(token, user, msg) {
  if (!admin.apps.length) {
    initFireBase();
  }
  const message = {
    notification: {
      title: `${user}:`,
      body: msg,
    },
    token: token, // Specify the FCM token here
  };
  admin
    .messaging()
    .send(message)
    .then(() => console.log("Notification sent"))
    .catch((err) => {
      console.log("Error in sending  notification\n", err);
    });
}

module.exports = { initFireBase, sendMsgNotification };
