const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: string,
        unique: true,
        lowercase: true,
        required: true
    },
    facebook: String,
    token: Array, 
    profile: {
        name: { type: String, require: true},
        pic: { type: String, default: ''} // put default image and add path
    },
    courseTeach: [{
        course: {type: Schema.Types.ObjectId, ref: 'Course'}
    }],
    courseTaken: [{
        course: {type: Schema.Types.ObjectId, ref: 'Course'}
    }]

});

module.exports = mongoose.model('User', UserSchema);