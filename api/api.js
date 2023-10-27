const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

const Blog = require("./models/Blog");
const Contact = require("./models/Contact");

const app = express();
const port = 4000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect("mongodb+srv://sam:sam@blog.iw2ikgr.mongodb.net/myblogs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to mongodb");
  })
  .catch((err) => {
    console.log("Error Connecting to mongodb ", err);
  });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("The Api is not working.....");
});

app.get("/api/blogs", (req, res) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/contact", (req, res) => {
  
  try {
    res.send(req.body);
    const result = Contact.create(req.body);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/blogs",(req,res)=>{
  console.log(req.body);
  try{
    res.send(req.body);
    Blog.create(req.body);
  }
  catch(error){
    console.log(error);
    res.send(error);
  }
})

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
