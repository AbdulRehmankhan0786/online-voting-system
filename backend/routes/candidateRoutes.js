const express = require("express");
const Candidate = require("../models/candidate");
const User = require("../models/users");
const auth = require("../middleware/auth");

const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});







  //  ADD CANDIDATE (ADMIN ONLY)


router.post("/add", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, party, age, gender } = req.body;

    if (!name || !party || !age || !gender) {
      return res.status(400).json({ message: "All fields required" });
    }

    const candidate = new Candidate({
      name,
      party,
      age,
      gender
    });

    await candidate.save();

    res.json({ message: "Candidate added successfully" });

  } catch (error) {
    console.log("ADD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


/* =============================
   ADMIN VOTING HISTORY (UPDATED)
============================= */
router.get("/history", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const candidates = await Candidate.find()
      .populate("votes.user", "name aadharCardNumber mobile email");

    let history = [];

    candidates.forEach(candidate => {
      candidate.votes.forEach(vote => {
        if (!vote.user) return;

        history.push({
          voterName: vote.user.name,
          aadhar: vote.user.aadharCardNumber,
          mobile: vote.user.mobile,
          email: vote.user.email,
          candidateName: candidate.name,
          votedAt: vote.votedAt,
          status: "Voted"
        });
      });
    });

    res.json(history);

  } catch (error) {
    console.log("HISTORY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =============================
   DELETE CANDIDATE (ADMIN ONLY)
============================= */
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    await Candidate.findByIdAndDelete(req.params.id);

    res.json({ message: "Candidate deleted successfully" });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/results", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    console.log("RESULT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});




/* =============================
   VOTE ROUTE
============================= */
router.post("/vote", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { candidateId } = req.body;

    if (!candidateId) {
      return res.status(400).json({ message: "Candidate ID required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.hasVoted) {
      return res.status(400).json({ message: "You already voted" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // ✅ increase count
    candidate.voteCount += 1;

    // ✅ push into votes array (IMPORTANT)
    candidate.votes.push({
      user: userId,
      votedAt: new Date()
    });

    await candidate.save();

    user.hasVoted = true;
    await user.save();

    res.json({ message: "Vote successful" });

  } catch (error) {
    console.log("VOTE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
