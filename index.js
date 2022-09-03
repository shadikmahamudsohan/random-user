const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const toolsRoutes = require("./routes/v1/tools.route.js");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());


app.use("/api/v1/tools", toolsRoutes);

app.get("/", (req, res) => {
  res.send("Find random users");
});

app.all("*", (req, res) => {
  res.send("NO route found.");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});