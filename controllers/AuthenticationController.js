const {
  PangeaConfig,
  AuthNService,
  PangeaErrors,
  AuthN,
} = require("pangea-node-sdk");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const Doctor = require("../models/DoctorModel");
const token = process.env.PANGEA_AUTHN_TOKEN;
const config = new PangeaConfig({ domain: process.env.PANGEA_DOMAIN });
const authn = new AuthNService(token, config);
const RANDOM_VALUE = new Date().getTime().toString();

//users login
const createuser = async (req, res) => {
  const { firstName, lastName, email, password, passwordVerify } = req.body;
  try {
    if (!email || !password || !passwordVerify)
      return res.status(401).json({ error: "Email and Password are required" });
    if (password.length < 6)
      return res.status(401).json({ error: "Password must be Greater that 6" });
    if (password !== passwordVerify)
      return res.status(401).json({ error: "Passwords do not match" });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "An account with that email already exists" });
    }
    const createResp = await authn.user.create(
      email,
      password,
      AuthN.IDProvider.PASSWORD,
      { profile: { firstName, lastName } }
    );
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log("Create user success. Result: ", createResp.result);
    USER_ID = createResp.result.id;
    const newAccount = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });
    res.status(200).json({ user: newAccount });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "please enter all required values" });
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ error: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ error: "Wrong email or password." });
    const loginResp = await authn.user.login.password(email, password);
    const userToken = loginResp.result.active_token?.token || "";
    console.log("Login success. Result: ", loginResp.result);
    res.status(200).json(loginResp.result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const createdoctor = async (req, res) => {
  const { firstName, lastName, email, hospital, password, passwordVerify } =
    req.body;
  try {
    if (!email || !password || !passwordVerify)
      return res.status(401).json({ error: "Email and Password are required" });
    if (password.length < 6)
      return res.status(401).json({ error: "Password must be Greater that 6" });
    if (password !== passwordVerify)
      return res.status(401).json({ error: "Passwords do not match" });
    const existingUser = await Doctor.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "An account with that email already exists" });
    }
    const createResp = await authn.user.create(
      email,
      password,
      AuthN.IDProvider.PASSWORD,
      { profile: { firstName, lastName, hospital } }
    );
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log("Create user success. Result: ", createResp.result);
    USER_ID = createResp.result.id;
    const newAccount = await Doctor.create({
      firstName,
      lastName,
      hospital,
      email,
      passwordHash,
    });
    res.status(200).json({ user: newAccount });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

//doctors login
const doctorlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "please enter all required values" });
    const existingUser = await Doctor.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ error: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ error: "Wrong email or password." });
    const loginResp = await authn.user.login.password(email, password);
    const userToken = loginResp.result.active_token?.token || "";
    console.log("Login success. Result: ", loginResp.result);
    res.status(200).json(loginResp.result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  userlogin,
  doctorlogin,
  createdoctor,
  createuser,
};

// users logout
//doctors logout
//get user
//get doctors
//get all users
// get all doctors
//update user
//update doctor
//delete user
//delete doctor
