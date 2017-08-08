export const registrationSchema = {
  "email":{
    notEmpty:true,
    isEmail:{
      errorMessage:"Invalid Email"
    }
  },
  "password": {
    notEmpty: true,
    isLength: {
      option: [{ min: 8 }],
      errorMessage: "Password must be at least 8 characters."
    },
    matches: {
      option: ["?=.*[a-zA-Z])(?=.*[0-9]+)(?=.*[!*&^%$#@()+]+).*", "g"],
      errorMessage: "Password must be alphanumeric."
    },
    errorMessage: "Invalid password"
  }
}