// server/server.js
import express from "express";
import cors from "cors";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware, JWT_SECRET } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to services data
const SERVICES_FILE = path.join(__dirname, "data", "services.json");
const MESSAGES_FILE = path.join(__dirname, "data", "messages.json");

// Admin credentials (in production, store in database with hashed password)
const ADMIN_USER = {
  username: "admin",
  // Password: admin123 (hashed)
  passwordHash: "$2a$10$8K1p/a0dL3LZeHWsXKeCe.6xRXC4qYKqKqKqKqKqKqKqKqKqKqKqK",
};

// Helper function to read services
async function readServices() {
  try {
    const data = await fs.readFile(SERVICES_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading services:", error);
    return [];
  }
}

// Helper function to write services
async function writeServices(services) {
  try {
    await fs.writeFile(
      SERVICES_FILE,
      JSON.stringify(services, null, 2),
      "utf8",
    );
    return true;
  } catch (error) {
    console.error("Error writing services:", error);
    return false;
  }
}

// Helper function to read messages
async function readMessages() {
  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading messages:", error);
    return [];
  }
}

// Helper function to write messages
async function writeMessages(messages) {
  try {
    await fs.writeFile(
      MESSAGES_FILE,
      JSON.stringify(messages, null, 2),
      "utf8",
    );
    return true;
  } catch (error) {
    console.error("Error writing messages:", error);
    return false;
  }
}

// ============ PUBLIC ROUTES ============

// GET all services (public)
app.get("/api/services", async (req, res) => {
  try {
    const services = await readServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
});

// POST contact message (public)
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const messages = await readMessages();
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || "Sin asunto",
      message,
      date: new Date().toISOString(),
      read: false,
    };

    messages.push(newMessage);
    const success = await writeMessages(messages);

    if (success) {
      res
        .status(201)
        .json({ message: "Message saved successfully", id: newMessage.id });
    } else {
      res.status(500).json({ message: "Error saving message" });
    }
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Error saving message" });
  }
});

// ============ AUTH ROUTES ============

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== ADMIN_USER.username) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // For simplicity, we'll accept the password "admin123"
    // In production, use bcrypt.compare with stored hash
    const isValid = password === "admin123";

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: ADMIN_USER.username }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token, username: ADMIN_USER.username });
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
});

// ============ PROTECTED ADMIN ROUTES ============

// GET all messages (protected)
app.get("/api/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await readMessages();
    // Sort by date, newest first
    messages.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// PATCH mark message as read (protected)
app.patch("/api/messages/:id/read", authMiddleware, async (req, res) => {
  try {
    const messages = await readMessages();
    const message = messages.find((m) => m.id === req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.read = true;
    const success = await writeMessages(messages);

    if (success) {
      res.json(message);
    } else {
      res.status(500).json({ message: "Error updating message" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating message" });
  }
});

// DELETE message (protected)
app.delete("/api/messages/:id", authMiddleware, async (req, res) => {
  try {
    const messages = await readMessages();
    const filteredMessages = messages.filter((m) => m.id !== req.params.id);

    if (filteredMessages.length === messages.length) {
      return res.status(404).json({ message: "Message not found" });
    }

    const success = await writeMessages(filteredMessages);

    if (success) {
      res.json({ message: "Message deleted successfully" });
    } else {
      res.status(500).json({ message: "Error deleting message" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting message" });
  }
});

// CREATE new service (protected)
app.post("/api/services", authMiddleware, async (req, res) => {
  try {
    const services = await readServices();
    const newService = {
      id: Date.now().toString(),
      ...req.body,
    };

    services.push(newService);
    const success = await writeServices(services);

    if (success) {
      res.status(201).json(newService);
    } else {
      res.status(500).json({ message: "Error creating service" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating service" });
  }
});

// UPDATE service (protected)
app.put("/api/services/:id", authMiddleware, async (req, res) => {
  try {
    const services = await readServices();
    const index = services.findIndex((s) => s.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Service not found" });
    }

    services[index] = {
      ...services[index],
      ...req.body,
      id: req.params.id, // Preserve ID
    };

    const success = await writeServices(services);

    if (success) {
      res.json(services[index]);
    } else {
      res.status(500).json({ message: "Error updating service" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating service" });
  }
});

// DELETE service (protected)
app.delete("/api/services/:id", authMiddleware, async (req, res) => {
  try {
    const services = await readServices();
    const filteredServices = services.filter((s) => s.id !== req.params.id);

    if (filteredServices.length === services.length) {
      return res.status(404).json({ message: "Service not found" });
    }

    const success = await writeServices(filteredServices);

    if (success) {
      res.json({ message: "Service deleted successfully" });
    } else {
      res.status(500).json({ message: "Error deleting service" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting service" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api/services`);
});
