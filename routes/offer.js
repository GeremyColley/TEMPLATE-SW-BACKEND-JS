const express = require("express");
const router = express.Router();

const Offer = require('../models/Offer');
const User = require("../models/User");

router.get("/offers", async (req,res) => {
    console.log("route : /");
    try {

      let filters = {};

      if (req.query.title) {
        filters.NomProjet = new RegExp(req.query.title, "i");
      }

      const cctProjet = await Projet.find(filters);
      console.log(cctProjet);
      res.json(cctProjet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.post("/create", async (req, res) => {
  console.log("route : /create"); 
  console.log("Compass : " + process.env.MONGODB_URI_NET);
 
  try {
    
    const newOffer = new Offer({
      titre: req.body.titre,
      date: req.body.date,
      montant: req.body.montant,
      comment: req.body.comment,
      nombre: req.body.nombre,
      owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
      },
    });

    await newOffer.save();
   
    res.json({ message: "newOffer" });

 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;