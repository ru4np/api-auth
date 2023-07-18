require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Model
const User = require('./models/User')


function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Acess denied' })

  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)
    next()
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Token Invalid' });
  }
}

// Open Route - Public Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to API" });
});

// Private Route
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  // check if ID is valid
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  // check if user exists
  const user = await User.findById(id, '-password')

  if (!user) return res.status(404).json({ message: 'User not found' });

  res.status(200).json({ user });
})

// Register User

app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) return res.status(400).json({ message: "Fill in all fields" });

  if (password != confirmPassword) return res.status(403).json({ message: "Password is not equal with confirm password" });

  const userExist = await User.findOne({ email: email })

  if (userExist) return res.status(403).json({ message: 'Email already exists' });

  // create security password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: 'An error occurred on the server' });
  }
});

// Login User
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Fill in all fields" });

  const user = await User.findOne({ email: email })

  if (!user) return res.status(404).json({ message: 'Email or password invalid' });

  //check password
  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) return res.status(403).json({ message: 'Password is incorrect' });

  try {
    const secret = process.env.SECRET
    const token = jwt.sign({ id: user._id }, secret);

    res.status(200).json({ token });
  }

  catch (err) {
    console.log(err);
    res.status(403).json({ message: 'An error occurred on the server' });
  }
})

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.krwqqey.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("Server connected on port 3000");
  })
  .catch((err) => console.log(err));
