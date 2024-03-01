var fcmToken = new Map();

function removeFcmToken(user, token) {
  if (fcmToken) {
    let tokens = fcmToken.get(user);
    const index = tokens.indexOf(token);
    console.log(index);
    if (index > -1) {
      tokens.splice(index, 1);
      if (tokens.length == 0) {
        fcmToken.delete(user);
        return;
      }
      fcmToken.set(user, tokens);
    }
  }
}

function addNewFcmToken(user, token) {
  if (fcmToken.has(user)) {
    let tokens = fcmToken.get(user);
    if (tokens.includes(token)) return;
    tokens.push(token);
    fcmToken.set(user, tokens);
  } else {
    fcmToken.set(user, [token]);
  }
}

function getUserTokens(user) {
  return fcmToken.get(user) ? fcmToken.get(user) : [];
}

module.exports = { removeFcmToken, addNewFcmToken, getUserTokens };
