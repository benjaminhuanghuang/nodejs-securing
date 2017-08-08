const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    match: /(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[!*&^%$#@()+]+).*/,
    minlength: 8
  },
  email: {
    type: String,
    required: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  },
  created: {
    type: Date,
    required,
    default: new Date()
  }
});

UserSchema.pre('save', function (next) {
  if (!this.isModified(password)) {
    return next();
  }

  try {
    const hash = await bcrypt.hashAsync(this.password, 16.5);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.passWordIsValid = async function (password) {
  try {
    return await bcrypt.compareAsync(password, this.password);
  } catch (err) {
    throw err;
  }
};

export {
  UserSchema
};

const LoginSchema = new Schema({
  identityKey: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  failedAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  timeout: {
    type: Date,
    required: true,
    default: new Date()
  },
  inProgress: {
    type: Boolean
  }
});

LoginSchema.static("canLogin", async function (key) {
  const login = await this.findOne({
    identityKey: key
  });
  if (!login || login.failedAttempts < 5) {
    return true;
  }
  const timeout = (new Date() - new Date(login.timeout).addMinutes(1));
  if (timeout > 0) {
    await login.remove();
    return true;
  }
  return false;
});