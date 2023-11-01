const express = require("express");
const router = express.Router();
const questionRouter = require("./questionRouter");
const answerrouter = require("./answerRouter");
const smsrouter = require("./smsRouter");
const messagerouter = require("./messageRouter");

router.get("/", (req, res) => {
  res.send("Welcome to stack overflow clone");
});

router.use("/question", questionRouter);
router.use("/answer", answerrouter);
router.use("/message", messagerouter);
router.use("/sms", smsrouter);

module.exports = router;
