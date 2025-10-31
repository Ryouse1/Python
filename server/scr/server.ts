import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { executeCode } from "./routes/execute";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// 🧠 コード実行API
app.post("/api/execute", executeCode);

app.get("/", (req, res) => {
  res.send("🚀 Code Runner Server is up and running!");
});

app.listen(PORT, () => {
  console.log(`🟢 Server started on port ${PORT}`);
});
