import connectProvider from "../data_access/connnectionProvider";
import { serverSettings } from "../settings";
import session from "express-session";
import mongoStorageFactory from "connect-monogo"

export default function sessionManagementConfig(app) {
  session.Session.prototype.login = function (user) {
    this.userInfo = user;
  }

  const MongoStore = mongoStorageFactory(session);

  app.use(session(
    {
      store: new MongoStore({
        dbPromise: connectionProvider(serverSettings.serverUrl, serverSettings.database),
        ttl: (1 * 60 * 60)
      }),
      secret: serverSettings.session.password,
      saveUninitialized: true,
      resave: false,
      cookie: {
        path: "/",
        httpOnly: false,
        secure: false,
        maxAge: 1 * 60 * 60 * 1000
      },
      name: "id"
    }
  ));
}