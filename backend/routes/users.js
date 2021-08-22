const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const verify = require("../verifyToken");

// update
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Możesz dokonać aktualizacji tylko swojego konta.");
  }
});

// delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Użytkownik usunięty");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Możesz usunąć tylko swoje konto.");
  }
});

// get
router.get("/find/:id", async (req, res) => {
  try {
    const findedUser = await User.findById(req.params.id);
    const { password, ...info } = findedUser._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query ? await User.find().sort({_id:-1}).limit(3) : await User.find();
      //   const { password, ...info } = findedUser._doc;
      res.status(200).json(users);
    } catch (err) {
      res.status(403).json(err);
    }
  } else {
    res.status(403).json("Nie jesteś adminem i nie zobaczysz wszystkich użytkowników");
  }
});

// get user stats

//GET USER STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
