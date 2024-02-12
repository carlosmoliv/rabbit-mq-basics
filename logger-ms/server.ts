import express, { json } from "express";
import { Producer } from "./producer";

const producer = new Producer();

const app = express();
app.use(json());
app.post("/send-log", async (req, res, next) => {
  await producer.publishMessage(req.body.logType, req.body.message);
  res.send();
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
