import path from "path";
import { config } from "dotenv";

const root = path.resolve(__dirname, "..");
if (process.env.NODE_ENV === "production") {
  config({ path: path.join(root, ".env.prod") });
} else {
  config({ path: path.join(root, ".env.local") });
}
