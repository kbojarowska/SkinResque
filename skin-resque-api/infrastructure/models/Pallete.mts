import mongoose from "mongoose";
const { Schema } = mongoose;

const Palette = new Schema({
    name: String,
    colors: [String]
})

export default Palette