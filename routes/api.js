const express = require('express'); // ✅ Import Express
const router = express.Router(); // ✅ Initialize the Router
const ConvertHandler = require('../controllers/convertHandler');

const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;
  if (!input) return res.json({ error: 'invalid number and unit' });

  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  if (initNum === null && initUnit === null) {
    return res.json({ error: 'invalid number and unit' }); // ✅ Fix this
  }
  if (initNum === null) {
    return res.json({ error: 'invalid number' }); // ✅ Fix this
  }
  if (initUnit === null) {
    return res.json({ error: 'invalid unit' }); // ✅ Fix this
  }

  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const returnNum = convertHandler.convert(initNum, initUnit);
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

  res.json({ initNum, initUnit, returnNum, returnUnit, string });
});

module.exports = router; // ✅ Ensure you're exporting `router`
