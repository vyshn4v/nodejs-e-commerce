const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    discription: { type: String, required: true },
    image: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
}, { timestamps: true })

module.exports = mongoose.model("product", ProductSchema)