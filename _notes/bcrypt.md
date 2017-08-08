## Install
  npm install -S bcrypt

## Hash the password in schema
  ```
  UserSchema.pre('save', function(next){
    if(!this.isModified(password)){
      return next();
    }

    bcrypt.hash(password, 16.5, (err, hash)=>{
      if(err){
        next(err);
        return;
      }
      this.password = hash;
      next();
    });
  });

  ```


