import fs from "fs";
import path from "path";

const DATA_FILE = path.join(__dirname, "data.json");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}