const express = require('express');
const authRouter = express.Router();


authRouter.route('/api/user/login').post(cors(), async function (req, res) {
  try {
    const User = await getUserModel();
    const {
      email,
      password
    } = req.body;
    const existingUser = await User.findOne({
      username: email
    }).exec();
    if (!existingUser) {
      return res.status(401).send("Invalid username or password");
    }

    existingUser.passwordIsValid(password, function (err, results) {
      if (err) {
        return res.status(500).send("There is a problem in logging.");
      } else if (!results) {
        return res.status(401).send("Invalid username or password");
      }

      const userInfo = {
        _id: existingUser._id,
        fistName = existingUser.firstName,
        lastName = existingUser.lastName,
        username = existingUser.email
      };

      req.session.login(userInfo);

      return res.status(200).json({
        fistName = existingUser.firstName,
        lastName = existingUser.lastName,
        username = existingUser.email
      })
    });
  } catch (err) {
    return res.status(500).send("There is a problem in logging.");
  }
});