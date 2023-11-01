const questionModel = require("../models/questionModel");
const scoreModel = require("../models/scoreModel");
const reportModel = require("../models/reportModel");
const { sendMail } = require("../utility/nodemailer");

module.exports.addQuestion = async function addQuestion(req, res) {
  const operation = req.body.operation;
  if (operation == "accept") {
    sendMail(
      "sendAcceptEmail",
      req.body.user.email,
      "Your Question is accepted by foruMe"
    );
  }
  const questionData = new questionModel({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    user: req.body.user,
    image: req.body.image,
  });

  await questionData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Question not added successfully",
      });
    });
};

// /* for Dummy score */
module.exports.addScore = async function addScore(req, res) {
  const scoreData = new scoreModel({
    score: req.body.score,
  });

  await scoreData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "score not added successfully",
      });
    });
};

module.exports.getScore = async function getScore(req, res) {
  try {
    let score = await scoreModel.find();

    if (score) {
      return res.json({
        message: "all score retrieved ",
        data: score,
      });
    } else {
      return res.json({
        message: "user not found ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getQuesNum = async function getQuesNum(req, res) {
  try {
    const Qnum = await questionModel.find({ user: req.body.email }).count();

    if (Qnum) {
      return res.json({
        message: "single question retrieved ",
        data: Qnum,
      });
    } else {
      return res.json({
        message: "question not found ",
        data: Qnum,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.singleQuestion = async function singleQuestion(req, res) {
  try {
    let question = await questionModel.findById(req.body.qid);
    if (question) {
      return res.json({
        message: "single question retrieved ",
        data: question,
      });
    } else {
      return res.json({
        message: "question not found ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAllQuestions = async function getAllQuestions(req, res) {
  try {
    let questions = await questionModel.find();
    if (questions) {
      return res.json({
        message: "all questions retrieved ",
        data: questions.reverse(),
      });
    } else {
      return res.json({
        message: "user not found ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getUserQuestions = async function getUserQuestions(req, res) {
  console.log("getUserQuestions");
  try {
    const question = await questionModel.find({
      user: req.body.user,
    });

    if (question) {
      return res.json({
        message: "all answer retrieved",
        data: question,
      });
    } else {
      return res.json({
        message: "answer not found ",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.likeQuestions = async function likeQuestions(req, res) {
  const {body : {postId , useremail}} = req;
  try {
    const question = await questionModel.findById(postId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    const { likes } = question;
    const userLiked = likes.includes(useremail);

    if (userLiked) {
      await questionModel.findByIdAndUpdate(postId, {
        $pull: { likes: useremail },
      });
      res.json({
         message: 'Like removed successfully' });
    } else {
      await questionModel.findByIdAndUpdate(postId, {
        $addToSet: { likes: useremail },
      });
      res.json({ message: 'Liked added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports.dislikeQuestions = async function dislikeQuestions(req, res) {
  const {body : {postId ,coin, useremail}} = req;
  try {
    const question = await questionModel.findById(postId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    const { dislikes } = question;
    const userDisliked = dislikes.includes(useremail);

    if (userDisliked) {
      await questionModel.findByIdAndUpdate(postId, {
        $pull: { dislikes: useremail },
      });
      res.json({ message: 'Disliked removed successfully' });
    } else {
      await questionModel.findByIdAndUpdate(postId, {
        $addToSet: { dislikes: useremail },
      });
      res.json({ message: 'Disliked added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.reportQuestion = async function reportQuestion(req, res) {
  const reportData = new reportModel({
    question_id: req.body.qid,
    quesTitle: req.body.quesTitle,

    user: req.body.user,
    reportType: req.body.type,
  });

  await reportData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Reports not added successfully",
      });
    });
};

module.exports.updateQuestion = async function (req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    let question = await questionModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      question[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await question.save();
    res.json({
      message: "data updated successfully",
      data: question,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
module.exports.deleteQuestion = async function deleteQuestion(req, res) {
  try {
    let id = req.params.id;
    let deletedQuestion = await questionModel.findByIdAndDelete(id);
    return res.json({
      message: "question deleted successfully",
      data: deletedQuestion,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getQuesScoreNum = async function getQuesNum(req, res) {
  try {
    const Qnum = await questionModel.find({ user: req.body.email });
    if (Qnum) {
      return res.json({
        message: " question retrieved ",
        data: Qnum,
      });
    } else {
      return res.json({
        message: "question not found ",
        data: Qnum,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getHourlyData = async function getHourlyData(req, res) {
  try {
    let currentData = new Date();
    let year = currentData.getFullYear();
    let month = currentData.getMonth();
    let date1 = currentData.getDate();

    const ghd = await questionModel.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(year, month, date1),
            $lte: new Date(year, month, date1 + 1),
          },
        },
      },
      {
        $project: {
          // hours: { $hour: "$created_at" },
          _id: 1,
          title: 1,
          coins: 1,
          dateParts: { $dateToParts: { date: "$updatedAt" } },
        },
      },
    ]);
    if (ghd) {
      return res.json({
        message: "hourly question retrieved ",
        data: ghd,
      });
    } else {
      return res.json({
        message: "question not found ",
        data: ghd,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
