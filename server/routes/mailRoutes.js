const express = require("express");
const router = express.Router();
const { sendMail } = require("../controllers/mailController");

// POST body should include: name,email,phone,city,program,message,fromForm,branch
router.post("/send-mail", sendMail);

module.exports = router;
