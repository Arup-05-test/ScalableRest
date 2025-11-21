require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./src/app");

connectDB();
const User = require("./src/models/user.model");
const bcrypt = require("bcryptjs");

async function createAdmin() {
  const adminExists = await User.findOne({ email: "admin@example.com" });
  if (adminExists) return;

  const hashed = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Super Admin",
    email: "admin@example.com",
    password: hashed,
    role: "admin"
  });

  console.log("Admin Created → email: admin@example.com | password: Admin@123");
}

createAdmin();

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
