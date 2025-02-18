"use strict";

const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const { input } = req.query;

    if (!input) {
      return res.json({ error: "invalid number and unit" }); // ✅ JSON response
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === null && initUnit === null) {
      return res.json({ error: "invalid number and unit" }); // ✅ JSON response
    }
    if (initNum === null) {
      return res.json({ error: "invalid number" }); // ✅ JSON response
    }
    if (initUnit === null) {
      return res.json({ error: "invalid unit" }); // ✅ JSON response
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
