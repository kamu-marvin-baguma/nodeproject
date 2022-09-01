
const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const passport = require("passport")



// const routes = require("./routes/routes")
const workerRoutes = require("./routes/workerRoutes")
const loginRoutes = require("./routes/loginRoutes")
const signuproute = require("./routes/signuproute")
const randomRoutes = require("./routes/randomRoutes")

const Signup = require("./models/signup")
// const workerRoutes = require("./routes/produceRoutes")


//creating ssession
const expressSession = require('express-session')({
    secret: 'secret',
    resave:false,
    saveUninitialized:false,
  });


// const WorkerModel = require("./models/workerModel")
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "pug")


//mongodb://localhost:27017
mongoose.connect("mongodb://localhost:27017/farm",
    { useNewUrlParser: true,
    useUnifiedTopology: true},
    (err) => {
        if(!err) console.log("Connected to mongo DB");
        else console.log("Error connecting to mongoDB  " + err)
    })


app.use(expressSession)
// configuring passport
app.use(passport.initialize());
app.use(passport.session());

//-----------------------------------
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());


// app.use("/", routes)
app.use("/", workerRoutes)
// app.use("/produce", produceRoutes)
app.use("/", signuproute)
app.use("/", loginRoutes)
app.use("/",randomRoutes)

//http://localhost:3000
//http://localhost:3000/
//http://localhost:3000/produce/
//http://localhost:3000/index/user


//this is the smallest server you can have
app.listen(process.env.port || 3000)
console.log("sever running on port" + (process.env.port || 3000))
