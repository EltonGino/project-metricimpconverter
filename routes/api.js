const express = require('express'); // ✅ Import Express
const router = express.Router(); // ✅ Initialize the Router
const ConvertHandler = require('../controllers/convertHandler');

const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;

  // ✅ Ensure we check for missing input
  if (!input) {
    return res.json({ error: 'invalid number and unit' });
  }

  // ✅ Extract number and unit from the input
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  // ✅ Handle different invalid input cases
  if (initNum === null && initUnit === null) {
    return res.json({ error: 'invalid number and unit' });
  }
  if (initNum === null) {
    return res.json({ error: 'invalid number' });
  }
  if (initUnit === null) {
    return res.json({ error: 'invalid unit' });
  }

  // ✅ Convert the valid input
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const returnNum = convertHandler.convert(initNum, initUnit);
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

  // ✅ Return the correct response format
  res.json({ initNum, initUnit, returnNum, returnUnit, string });
});

module.exports = router; // ✅ Ensure correct export
