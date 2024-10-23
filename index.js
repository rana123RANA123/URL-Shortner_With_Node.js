const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb+srv://firstbackend:firstbackend@cluster0.zpsvvf1.mongodb.net/Nodejs-Deploy?retryWrites=true&w=majority&appName=Cluster0").then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());

app.use("/url", urlRoute);
app.get("/", async (req, res) => {
  console.log(Vercel Server Running!)
})
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
