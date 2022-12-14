const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password, city, from, desc, relationship } =
    req.body;
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      city,
      from,
      desc,
      relationship,
    });

    // save user
    const user = await newUser.save();
    res.status(200).send("User created successfully");
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    !user && res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json({ message: "Invalid password" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
