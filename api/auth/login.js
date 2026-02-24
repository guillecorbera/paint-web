import jwt from "jsonwebtoken";

const getEnv = (name) => process.env[name] || "";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body || {};
  const adminUser = getEnv("ADMIN_USER");
  const adminPass = getEnv("ADMIN_PASSWORD");
  const jwtSecret = getEnv("JWT_SECRET");

  if (!jwtSecret) {
    return res.status(500).json({ message: "JWT secret not configured" });
  }

  if (
    !username ||
    !password ||
    username !== adminUser ||
    password !== adminPass
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: "24h" });
  return res.status(200).json({ token, username });
}
