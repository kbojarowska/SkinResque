import mongoose from "mongoose";
const { Schema } = mongoose;

const Cosmetic = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    recipe: String,
    ingredients: [String],
})

export default Cosmetic