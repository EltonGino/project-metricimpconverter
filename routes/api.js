const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler');

const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;
  if (!input) return res.json({ error: 'No input provided' });

  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  if (initNum === null || initUnit === null) {
    return res.json({ error: 'invalid number and/or unit' });
  }

  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const returnNum = convertHandler.convert(initNum, initUnit);
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

  res.json({ initNum, initUnit, returnNum, returnUnit, string });
});

module.exports = router;