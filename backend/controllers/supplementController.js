const supplements = require("../models/supplementModel");

const getAllSupplements = (req, res) => {
    res.status(200).json(supplements);
};

module.exports = { getAllSupplements };
