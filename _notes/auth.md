
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

## Tracking failed Login
