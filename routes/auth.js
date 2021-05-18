const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation/joiValidation");
const jwt = require("jsonwebtoken");

//create admin
router.post("/register", async (req, res) => {
  const result = await registerValidation.validateAsync(req.body);
  //    res.send(result)

  //checking db for existing user
  const doesExist = await User.findOne({ email: result.email });
  if (doesExist) {
    res.status(400).send("email already exists");
  }

  //password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(result.password, salt);

  //creating new admin user
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
    role: "admin",
  });
  try {
    const savedUser = await user.save();
    //    res.send({user: user._id});

    const registerToken = jwt.sign(
      {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      },
      process.env.TOKEN_SECRET
    );
    res.header("register-token", registerToken).send(registerToken);
  } catch (error) {
    res.send(error);
  }
});

//create user
router.post("/signup", async (req, res) => {
  const result = await registerValidation.validateAsync(req.body);
  //    res.send(result)

  //checking db for existing user
  const doesExist = await User.findOne({ email: result.email });
  if (doesExist) {
    res.status(400).send("email already exists");
  }

  //password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(result.password, salt);

  //creating new customer
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
    role: "user",
  });
  try {
    const savedUser = await user.save();

    const registerToken = jwt.sign(
      {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      },
      process.env.TOKEN_SECRET
    );
    res.header("register-token", registerToken).send(registerToken);
  } catch (error) {
    res.send(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const result = await loginValidation.validateAsync(req.body);
    const userExist = await User.findOne({ email: result.email }); //checking if user is registered
    if (!userExist) {
      return res.status(400).send("email does not exist, pls register");
    }

    const validPass = await bcrypt.compare(result.password, userExist.password);
    if (!validPass) {
      return res.status(400).send("invalid pass!");
    }

    //res.send('Success!');
    //creating jwt token
    const loginToken = jwt.sign(
      {
        email: userExist.email,
        _id: userExist._id,
        role: userExist.role,
      },
      process.env.TOKEN_SECRET
    );
    res.header("login-token", loginToken).send(loginToken);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
