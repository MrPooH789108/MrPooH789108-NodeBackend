const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const cardSchema = new Schema(
  {
  fullname: {
    type: String,
    required: [true, "Please Include fullname"]
  },
  nickname: {
    type: String,
    required: [true, "Please Include nickname"]
  },
  gender: {
    type: String,
    required: [true, "Please Include gender"]
  },
  facility: {
    type: Array,
    //type: String,
    required: [true, "Please Include faclity"]
  },
  number: {
    type: String,
    required: [true, "Please Include number"]
  },
  IDCardnumber: {
    type: String,
    required: [true, "Please Include IDCardnumber"]
  },
  objective: {
    type: String,
    required: [true, "Please Include number"]
  },
  cardnumber: {
    type: String,
    required: [true, "Please Include cardnumber"]
  },
  startdate: {
    type: String,
    required: [true, "Please Include startdate"]
  },
  enddate: {
    type: String,
    required: [true, "Please Include enddate"]
  },
  returndate: {
    type: String,
  },
  createby: {
    type: String,
    required: [true, "Please Include createby"]
  }
},
{ collection: 'cardlist' }
);
module.exports = mongoose.model("cardlist", cardSchema);

///////////////////////////////////////////////////////////////////////////////////////////////

const historycardSchema = new Schema(
  {
  fullname: {
    type: String,
    required: [true, "Please Include fullname"]
  },
  nickname: {
    type: String,
    required: [true, "Please Include nickname"]
  },
  gender: {
    type: String,
    required: [true, "Please Include gender"]
  },
  facility: {
    type: Array,
    required: [true, "Please Include faclity"]
  },
  number: {
    type: String,
    required: [true, "Please Include number"]
  },
  IDCardnumber: {
    type: String,
    required: [true, "Please Include IDCardnumber"]
  },
  objective: {
    type: String,
    required: [true, "Please Include number"]
  },
  cardnumber: {
    type: String,
    required: [true, "Please Include cardnumber"]
  },
  startdate: {
    type: String,
    required: [true, "Please Include startdate"]
  },
  enddate: {
    type: String,
    required: [true, "Please Include enddate"]
  },
  returndate: {
    type: String,
    required: [true, "Please Include enddate"]
  },
  createby: {
    type: String,
    required: [true, "Please Include createby"]
  }
},
{ collection: 'cardhistory' }
);

module.exports = mongoose.model("cardhistory", historycardSchema);
////////////////////////////////////////////////////////////////////////////////////////////////////////

const userSchema = mongoose.Schema(
  {
  name: {
    type: String,
    required: [true, "Please Include name"]
  },
  username: {
    type: String,
    required: [true, "Please Include username"]
  },
  password: {
    type: String,
    required: [true, "Please Include password"]
  },
  role: {
    type: String,
    required: [true, "Please Include role"]
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
},
{ collection: 'userlist' }
);

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//this method generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id, name: user.name, username: user.username },
  "secret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//this method search for a user by username and password.
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error({ error: "Invalid login details" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login details" });
  }
  return user;
};

const User = mongoose.model("userlist", userSchema);
module.exports = User;


////////////////////////////////////////////////////////////////////////////////////////////////////////
