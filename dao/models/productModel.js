import mongoose from 'mongoose';
// const mongoDBURL = 'mongodb://localhost:27017/ecommerce';
// mongoose.connect(mongoDBURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
