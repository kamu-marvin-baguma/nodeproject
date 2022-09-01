//const | Router | = require("express")
const express = require("express")
const workerModel = require("../models/workerModel")
const connectEnsureLogin = require("connect-ensure-login");

const router = express.Router()

router.get("/", connectEnsureLogin.ensureLoggedIn(),
async (req, res) => {
    const produce = await produceModel.find({})
    res.render("produce", {
        title: "Producers", produce
    })
})


router.get("/profile", connectEnsureLogin.ensureLoggedIn(),
(req, res)=> {
    res.render("test")
})

//here we are creating a route.
router.get("/worker-form", (req, res)=> {
    res.render("workerForm")
})

//4 diff methods of routing
//get - gets data from server
//post=gets data from the fornt end & sends to the end
//update= updates info already in database
//delete = deletes info from database




router.post("/newworker", connectEnsureLogin.ensureLoggedIn(),
async (req,res)=>{
    try{
        const newWorker = new workerModel(req.body)
        await newWorker.save()
        res.redirect("/worker-form")
        console.log(req.body)
   }
   //you redirect to a path and you render a file.
   catch(err){
    res.status(400).render("workerForm")
   }
})

router.get("/worker-list", connectEnsureLogin.ensureLoggedIn(),
async(req,res) =>{
   try{
       console.log(req.user.firstname)
        let items = await workerModel.find()
        res.render("workerlist",{workers : items, username:req.user.firstname})
    }
   catch(err){
   console.log(err)
   res.send("could not get workers list")
   }
 })

 //delete route
router.post("/worker-list", connectEnsureLogin.ensureLoggedIn(),
async(req,res)=>{
    try{
        await workerModel.deleteOne({
            _id: req.body._id
        })
        res.redirect("/worker/worker-list")
    }
    catch(err){
        res.status(400).send("Unable to delete items from the database")
    }  
})

router.get("/editWorker/:id", async(req,res) =>{
    try{
        const currentWorker = await workerModel.findById({_id:req.params.id})
        res.render("editWorker",{worker:currentWorker})
     }
    catch(err){
   
    }
  })

  router.post("/editWorker", async(req,res) =>{
    try{
        console.log(req.query,req.body)
        await workerModel.findByIdAndUpdate({_id:req.query.id},req.body)
       res.redirect('/worker-list')
     }
    catch(err){
   
    }
  })


//this should always be the last line in your routes
module.exports = router
