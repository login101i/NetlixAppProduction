const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// create movie
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Nie możesz dodać filmu. Nie jesteś adminem.");
  }
});

// update
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Możesz dokonać updatefilmu. Nie jesteś adminem.");
  }
});

// delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json(`Film ${req.params.id} usunięty.`);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Nie możesz usuwać filmów.");
  }
});

// get
router.get("/find/:id", verify, async (req, res) => {
  try {
    const findedMovie = await Movie.findById(req.params.id);

    res.status(200).json(findedMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get random movie

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([{ $match: { isSeries: true } }, { $sample: { size: 1 } }]);
    } else {
      movie = await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const movies = query ? await Movies.find().sort({ _id: -1 }).limit(2) : await Movie.find();
      res.status(200).json(movies);
    } catch (err) {
      res.status(403).json(err);
    }
  } else {
    res.status(403).json("Nie jesteś adminem i nie zobaczysz wszystkich filmów");
  }
});


module.exports = router;
