const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/AuthenticationController");

//TO CREATE ACCOUNTS
router.post("/", authenticationController.createuser);
router.post("/doctor", authenticationController.createdoctor);
//TO LOGIN
router.post("/login/user", authenticationController.userlogin);
router.post("/login/doctor", authenticationController.doctorlogin);
