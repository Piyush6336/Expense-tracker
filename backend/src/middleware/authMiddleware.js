const db = require("../config/database");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Login required" });
  }

  const sql = `
    SELECT users.id, users.name, users.email
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token = ?
  `;

  db.get(sql, [token], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Authentication failed" });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    req.token = token;
    next();
  });
}

module.exports = authMiddleware;
