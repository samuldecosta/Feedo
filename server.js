const express = require("express");
const connectDB = require("./config/db");
const app = express();

// connect data base
connectDB();

//init Middleware
app.use(express.json({ extended: false }));
//Define Routes
app.get("/", (req, res) => res.send("API Running"));

app.use("/api/employees", require("./routes/api/employees"));
app.use("/api/feedbackrequests", require("./routes/api/requestPool"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/feedback", require("./routes/api/feedback"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is started on port-${PORT}`));
