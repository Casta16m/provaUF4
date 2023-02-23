const express = require("express");
const apicache = require("apicache");
const v1UserRouter = require("./v1/routes/userRoutes");
const v1TaskRouter = require("./v1/routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/users", v1UserRouter);
app.use("/api/v1/tasks", v1TaskRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
