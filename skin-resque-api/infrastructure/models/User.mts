import mongoose from "mongoose";
import Cosmetic from "./Cosmetics.mjs";
import Palette from "./Pallete.mjs";
const { Schema } = mongoose;

const User = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    skin_type: String,
    saved_cosmetics: [Cosmetic],
    saved_palletes: [Palette],
})

export default User