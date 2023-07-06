const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

const Offer = require('../models/Offer');
const User = require("../models/User");

router.get("/offer", async (req,res) => {
    console.log("route : /");
    try {

      let filters = {};

      if (req.query.title) {
        filters.titre = new RegExp(req.query.title, "i");
      }

      const cctProjet = await Offer.find(filters);
      console.log(cctProjet);
      res.json(cctProjet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.post("/offer/create", async (req, res) => {
  console.log("route : /create"); 
  console.log("Compass : " + process.env.MONGODB_URI_NET);
 
  try {
    
    const newOffer = new Offer({
      titre: req.body.titre,
      date: req.body.date,
      montant: req.body.montant,
      comment: req.body.comment,
      nombre: req.body.nombre,
      owner: req.body.idLogin,
    });

    await newOffer.save();
   
    res.json({ message: "newOffer" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post(
  "/offer/connect",
  isAuthenticated,
  (req, res) => {
    try {
      console.log("Je rentre dans ma route");
      console.log(req.user);
      res.json({
        connect: "Welcome",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;