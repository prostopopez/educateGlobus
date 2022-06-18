const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        id: Number,
        username: String,
        password: String,
        courses_id: [mongoose.Schema.Types.ObjectId],
        tests_progress: [{
            id: mongoose.Schema.Types.ObjectId,
            success: Number
        }]
    },
    {timestamps: false}
);

module.exports = mongoose.model('users', User);
