import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true }
  },
  { timestamps: true }
);

export const Product = model('Product', ProductSchema);