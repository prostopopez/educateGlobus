const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        author: String,
        name: String,
        topics: [String],
        time: String,
        level: String,
        description: String,
        rating: Number,
        img: String,
        price: Number
    },
    {timestamps: false}
);

module.exports = mongoose.model("courses", DataSchema);
