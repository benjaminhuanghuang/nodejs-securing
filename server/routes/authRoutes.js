import { Router } from "express";
import cors from "cors";
import color from "color";
import Promise from "bluebird";

import {registrationSchema} from '../validation/validationSchemas';

const uthRouter = Router();

uthRouter.route('/api/user/register').post(cors(), async function (req, res) {
  const delayResponse = response =>{
    setTimeout(()=>response(), 1000);
  }
  try {
    const User = await getUserModel();
    // 
    req.checkBody(registrationSchema)
    const err = req.validationErrors();
    if (err) {
      return res.status(500).json(err);
    }

    const { email, password, firstName, lastName} = req.body;
    const existingUser = await User.findOne({
      username: email
    }).exec();
    
    if (!existingUser) {
      return res.status(409).send(`The email ${email} already exists.`);
    }

    const submittedUser = {
      firstName,
      lastName,
      username: email,
      password,
      created: Date.now()
    }
   
    const user = new User(submittedUser);
    await user.save()
    .then(function(user){
      if(user)
      {
        console.log(colors.yellow(`Created user ${JSON.stringify(user)}`));
      }
    })
    .catch(function(err){
      if(err)
      {
        console.log(color.yellow(`Error occurred saving User ${err}`));
      }
    });
    return delayResponse(()=>res.status(201).json({
      user:{
        firstName: user.firstName,
        lastName:user.lastName,
        email: user.email
      }
    }));
    
  } catch (err) {
    return delayResponse(()=>res.status(500).send("There is a problem in logging."));
  }
});

authRouter.route('/api/user/login').post(cors(), async function (req, res) {
  try {
    const User = await getUserModel();
    const { email, password} = req.body;
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