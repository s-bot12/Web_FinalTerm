const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RankSchema = new Schema({
  point: {
      type: Number,
      default: '0'
  },
  name: String,
  gameName: String,
  datePosted:{ 
    type: Date,
    default: new Date()
  }, 
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Rank = mongoose.model('Rank',RankSchema);
module.exports = Rank;