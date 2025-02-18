const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler');

const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;

  // ✅ Ensure we check for missing input
  if (!input) {
    return res.json({ error: 'invalid number and unit' });
  }

  // ✅ Extract number and unit from input
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  // ✅ Handle invalid cases with correct error messages
  if (initNum === null && initUnit === null) {
    return res.json({ error: 'invalid number and unit' }); // ❌ Avoid { status: 'unavailable' }
  }
  if (initNum === null) {
    return res.json({ error: 'invalid number' });
  }
  if (initUnit === null) {
    return res.json({ error: 'invalid unit' });
  }

  // ✅ Convert valid input
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const returnNum = convertHandler.convert(initNum, initUnit);
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

  res.json({ initNum, initUnit, returnNum, returnUnit, string });
});

module.exports = router;
