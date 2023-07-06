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


module.exports = router;