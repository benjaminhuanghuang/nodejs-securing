
## Using bcrypt to hash the password
  npm install -S bcrypt

  Hash the password in User schema
  
## Use express-validator 
  npm install express-validator
  
  app.use(expressValidator());

  create validation schema
  req.checkBody(registrationSchema)
  const err = req.validationErrors();

## Brute force safeguards
  Delay response
  ```
  const delayResponse = response =>{
    setTimeout(()=>response(), 1000);
  }

  ...
  return delayResponse(()=>res.status(201).json({...}));
  return delayResponse(()=>res.status(500).send("There is a problem in logging."));
 ```

## Tracking failed Login
  Using LoginSchema to trace the login failed attempts

