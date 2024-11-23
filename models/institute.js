const moongose = require("mongoose");
const Schema = moongose.Schema;

const institueSchema = new Schema({
  institueType: {
    type: String,
    required: true,
    enum: ["Playhouse", "School", "College", "Competitive Exam Center"],
  },
  schoolDetails: {
    board: {
      type: String,
      required: function () {
        return this.institueType === "School";
      },
      enum: ["GSAB", "CBSE"],
    },
    medium: {
      type: String,
      required: function () {
        return this.institueType === "School";
      },
      enum: ["English", "Hindi", "Gujarati"],
    },
    classCategory: {
      type: String,
      required: function () {
        return this.institueType === "School";
      },
      enum: ["Pre-primary", "Primary", "Secondary", "Higher Secondary"],
    },
    standards: [
      {
        standard: String,
        subject: [String],
      },
    ],
  },
  collegeDetails: {
    university: {
      type: String,
      required: function () {
        return this.institueType === "College";
      },
    },
    degreetype: {
      type: String,
      required: function () {
        return this.institueType === "College";
      },
      enum: ["Bachelor", "Master"],
    },
  },
  playHouseDetails: {
    playHouseType: {
      type: String,
      required: function () {
        return this.institueType === "Playhouse";
      },
      enum: ["LKG", "UKG"],
    },
  },
  competitiveExamsDetails: {
    examType: {
      type: String,
      required: function () {
        return this.institueType === "Competitive Exam Center";
      },
    },
  },
});
const Institue = moongose.model("Institue", institueSchema);

module.exports = Institue;
