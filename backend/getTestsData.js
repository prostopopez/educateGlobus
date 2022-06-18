const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        difficulty: Number,
        name: String,
        questions: [{
            name: String,
            options: [String],
            truth: Number
        }],
        time: String,
        img: String,
    },
    {timestamps: false}
);

module.exports = mongoose.model("tests", DataSchema);
