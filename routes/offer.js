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


router.post("/offer/create",
  async (req, res) => {
  console.log("route : /offer/create"); 
  console.log("Compass : " + process.env.MONGODB);
 
  try {
    const {titre, date, montant, comment, nombre, idLogin } = req.body
    console.log("titre " +  req.body.titre);
    console.log("date " +  req.body.date);
    console.log("montant " +  req.body.montant);
    console.log("comment " +  req.body.comment);
    console.log("nombre " +  req.body.nombre);
    console.log("idLogin " +  req.body.idLogin);

    const newOffer = new Offer({
      titre: titre,
      date: date,
      montant: montant,
      comment: comment,
      nombre: nombre,
      owner: idLogin,
    });

    await newOffer.save();
   
    res.json({ message: "newOffer" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




router.get("/offer/:id", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    res.json(offer);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
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