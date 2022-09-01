const express = require("express")
const workerModel = require("../models/workerModel")
const connectEnsureLogin = require("connect-ensure-login");

const router = express.Router()

router.get("/ceoDash",(req, res)=>{
    res.render("ceoDash")
})

router.get("/managerDash",(req, res)=>{
    res.render("managerDash")
})

router.get("/regularDash",(req, res)=>{
    res.render("regularDash")
})



module.exports = router