const express = require("express");
const router = express.Router();
const Institue = require("../models/institute");

router.post("/register", async (req, res) => {
  try {
    const {
      institueType,
      schoolDetails,
      collegeDetails,
      playHouseDetails,
      competitiveExamsDetails,
    } = req.body;
    if (!institueType) {
      return res.status(400).json({ error: "Institue type is required" });
    }

    let newInstitute = {
      institueType,
    };

    if (institueType === "School") {
      const { board, medium, classCategory, standards } = schoolDetails;
      if (!board || !medium || !classCategory || !standards) {
        return res
          .status(400)
          .json({ error: "School details are incomplete." });
      }
      newInstitute.schoolDetails = {
        board,
        medium,
        classCategory,
        standards,
      };
    }
    if (institueType === "College") {
      const { university, degreetype } = collegeDetails;
      if (!degreetype || !university) {
        return res
          .status(400)
          .json({ error: "Collge details are incomplete." });
      }
      newInstitute.collegeDetails = {
        university,
        degreetype,
      };
    }
    if (institueType === "Playhouse") {
      const { playHouseType } = playHouseDetails;
      if (!playHouseType) {
        return res
          .status(400)
          .json({ error: "Playhouse details are incomplete." });
      }
      newInstitute.playHouseDetails = {
        playHouseType,
      };
    }
    if (institueType === "Competitive Exam Center") {
      const { examType } = competitiveExamsDetails;
      if (!examType) {
        return res.status(400).json({
          error: "Competitive Exam Center details are incomplete.",
        });
      }
      newInstitute.competitiveExamsDetails = {
        examType,
      };
    }
    const institute = new Institue(newInstitute);
    let response = await institute.save();
    console.log("response :>> ", response);
    res
      .status(201)
      .json({ message: "Institue registered successfully.", institute });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!!" });
  }
});

router.get("/institues", async (req, res) => {
  try {
    const institues = await Institue.find();
    res.status(200).json(institues);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ error: "Something went wrong!!" });
  }
});

module.exports = router;
