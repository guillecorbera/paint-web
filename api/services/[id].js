import { promises as fs } from "fs";
import path from "path";

const SERVICES_FILE = path.join(
  process.cwd(),
  "server",
  "data",
  "services.json",
);

const readServices = async () => {
  const data = await fs.readFile(SERVICES_FILE, "utf8");
  return JSON.parse(data);
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const services = await readServices();
      const service = services.find((item) => item.id === req.query.id);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      return res.status(200).json(service);
    } catch (error) {
      console.error("Error reading services:", error);
      return res.status(500).json({ message: "Error fetching service" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
