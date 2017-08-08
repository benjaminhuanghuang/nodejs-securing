const modelMap = new Map([
    [ "User", UserSchema ],
    [ "TimelineItem", TimelineSchema ],
    [ "EventVote", EventVoteSchema ],
    [ "EventVote", LingSchema ],
  ]);

export const getModel = async function (modelName) {
  try {
    const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database);
    return conn.model(modelName, modelMap.get(modelName));
  } catch (err) {
    throw err;
  }
}

export const getUserModel = async function () {
  try {
    const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database);
    return conn.model("User", UserSchema);
  } catch (err) {
    throw err;
  }
}

export const getTimelineModel = async function () {
  try {
    const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database);
    return conn.model("TimelineItem", TimelineSchema);
  } catch (err) {
    throw err;
  }
}

export const getEventVoteModel = async function () {
  try {
    const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database);
    return conn.model("EventVote", EventVoteSchema);
  } catch (err) {
    throw err;
  }
}

export const getLoginsModel = async function () {
  try {
    const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database);
    return conn.model("Logins", LingSchema);
  } catch (err) {
    throw err;
  }
}