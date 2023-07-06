const mongoose = require("mongoose");

const Offer = mongoose.model("Offer", {
    titre: String,
    date: { type: Date, default: Date.now },
    montant: Number,
    comment: String,
    nombre: Number,
    owner: String,
});

module.exports = Offer;
