// ----------------------------
// ✅ Imports & Setup
// ----------------------------
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = 3002;

// ----------------------------
// ✅ Middleware
// ----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const logData = `Date: ${new Date().toISOString()} | Method: ${
    req.method
  } | URL: ${req.url}\n`;
  fs.appendFile("./log.txt", logData, (err) => {
    if (err) console.error("Error writing to log file", err);
  });
  next();
});

// ----------------------------
// ✅ Database Connection
// ----------------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/mynodedb")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ----------------------------
// ✅ User Schema & Model
// ----------------------------
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ----------------------------
// ✅ Routes
// ----------------------------

// 1️⃣ Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error fetching users", error: err });
  }
});

// 2️⃣ Get all users as HTML
app.get("/api/users/html", async (req, res) => {
  try {
    const users = await User.find({});
    const html = `
      <ul>
        ${users
          .map(
            (user) =>
              `<li><h3>${user.first_name} ${user.last_name || ""}</h3>Email: ${
                user.email
              }</li>`
          )
          .join("")}
      </ul>`;
    res.send(html);
  } catch (err) {
    res.status(500).json({ message: "Error generating HTML", error: err });
  }
});

// 3️⃣ Get a single user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
});

// 4️⃣ Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const { first_name, last_name, password, email, gender } = req.body;

    if (!first_name || !password || !email)
      return res.status(400).json({ message: "Missing required fields" });

    const newUser = await User.create({
      first_name,
      last_name,
      password,
      email,
      gender,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Error creating user", error: err });
  }
});

// 5️⃣ Update (PATCH) user by ID
app.patch("/api/users/:id", async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err });
  }
});

// 6️⃣ Delete user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
});

// ----------------------------
// ✅ Start Server
// ----------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
