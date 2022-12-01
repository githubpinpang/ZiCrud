
//const { Int32 } = require('bson');
const mongoose = require('mongoose');
const schema = 
mongoose.Schema({
    DateOfBirth: {
        type:Date,
        default: Date.now
    },
    Id:Number,
    Name: String,
    Nationality: String
});




 module.exports = mongoose.model ('Register', schema);
