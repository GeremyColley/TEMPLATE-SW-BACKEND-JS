const mongoose = require("mongoose");

const Projet = mongoose.model("Projet", {
    NomProjet: String,
    Type: String,
    NbrSouscripteurs: Number,
    MontantDuProjet: Number,
    MontantRecolté: Number,
    Close: Boolean,
});

module.exports = Projet;
