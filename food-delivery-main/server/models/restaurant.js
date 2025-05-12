import { model, Schema } from "mongoose";



const RestaurantSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    pass: { type: String, require: true },
    owner: { type: String, require: true },
},
    { timestamps: true }
)

export const Restaurant = model("Restaurant", RestaurantSchema);