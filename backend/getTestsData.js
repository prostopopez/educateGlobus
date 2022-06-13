const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        difficulty: String,
        name: String,
        questions: [],
        time: String,
        img: String,
    },
    {timestamps: false}
);

module.exports = mongoose.model("tests", DataSchema);
