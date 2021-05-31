const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 
const PostUploadSchema = new Schema({
  title: String,
  body: String,
  username: String,
  views: {type:Number, default:0},
  numId:{type:Number, default:1},
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  datePosted:{ 
    type: Date,
    default: new Date()
  }, 
  image: String,
});

const PostUpload = mongoose.model('PostUpload',PostUploadSchema);
module.exports = PostUpload