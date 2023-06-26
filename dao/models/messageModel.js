import mongoose from 'mongoose';
// const mongoDBURL = 'mongodb://localhost:27017/ecommerce';
// mongoose.connect(mongoDBURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;

