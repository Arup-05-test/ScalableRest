const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id,role: user.role }, 
    process.env.JWT_SECRET, 
    {expiresIn: process.env.JWT_EXPIRES_IN}
);
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "Email exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed });

  res.status(201).json({
    token: generateToken(user),
    user: { id: user._id, name, email, role: user.role }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid creds" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid creds" });

  res.json({
    token: generateToken(user),
    user: { id: user._id, name: user.name, email, role: user.role }
  });
};
