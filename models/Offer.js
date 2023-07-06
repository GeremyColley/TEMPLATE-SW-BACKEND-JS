const mongoose = require("mongoose");

const Offer = mongoose.model("Offer", {
    Titre: String,
    Date: { type: Date, default: Date.now },
    Montant: Number,
    Comment: String,
    Nombre: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = Offer;
