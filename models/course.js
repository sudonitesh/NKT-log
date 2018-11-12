const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    
    title: String,
    price: Number,
    Teacher: { type: Schema.Types.ObjectId, ref: 'User'},
    Student: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    total_students: Number

});

module.exports = mongoose.model('Course', CourseSchema);