import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { handleProration } from "./allocation-controller";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/prorate", handleProration);
