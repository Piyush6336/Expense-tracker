const { v4: uuidv4 } = require("uuid");
const db = require("../config/database");
const { hashPassword, verifyPassword } = require("../utils/password");
const { validateUser } = require("../utils/validators");

function register(req, res) {
  const errors = validateUser(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const user = {
    id: uuidv4(),
    name: req.body.name.trim(),
    email: req.body.email.trim().toLowerCase(),
    password: hashPassword(req.body.password),
  };

  db.run(
    "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
    [user.id, user.name, user.email, user.password],
    (err) => {
      if (err) {
        return res.status(400).json({ message: "Email already registered" });
      }

      createSession(res, user, 201);
    }
  );
}

function login(req, res) {
  const errors = validateUser(req.body, true);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const email = req.body.email.trim().toLowerCase();

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Login failed" });
    }

    if (!user || !verifyPassword(req.body.password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    createSession(res, user);
  });
}

function logout(req, res) {
  db.run("DELETE FROM sessions WHERE token = ?", [req.token], () => {
    res.json({ message: "Logged out successfully" });
  });
}

function createSession(res, user, statusCode = 200) {
  const token = uuidv4();

  db.run("INSERT INTO sessions (token, user_id) VALUES (?, ?)", [token, user.id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Could not login user" });
    }

    res.status(statusCode).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
}

module.exports = { register, login, logout };
