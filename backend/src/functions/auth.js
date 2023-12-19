const Logs = require("../database/db_models").userlogs;

const authSessionLogin = async (userName, logID) => {
  if (userName && logID) {
    const userLog = await Logs.findOne({ userName: userName });
    if (userLog) {
      const exist = userLog.clients.find((client) => client.logId === logID);
      if (exist) {
        exist.expiresAt = new Date(Date.now() + 259200000);
        await userLog.save();
        return { stat: true, userName: userName, logID: logID };
      } else return { stat: false };
    } else {
      return { stat: false };
    }
  } else {
    return { stat: false };
  }
};

module.exports = { authSessionLogin: authSessionLogin };
