function ConvertHandler() {

  this.getNum = function(input) {
    let numRegex = /^[\d/.]+/;
    let match = input.match(numRegex);

    console.log("Raw Input:", input);
    console.log("Matched Number:", match);

    if (!match) return 1; // ✅ Default to 1 if no number is provided

    let num = match[0];

    // ✅ Ensure fractions are valid (only one `/`)
    if (num.includes('/')) {
      let fractionParts = num.split('/');
      if (fractionParts.length !== 2) {
        console.log("Invalid fraction:", num);
        return null; // ❌ Invalid fraction
      }
      return parseFloat(fractionParts[0]) / parseFloat(fractionParts[1]);
    }

    return parseFloat(num);
  };

  this.getUnit = function(input) {
    let unitRegex = /[a-zA-Z]+$/;
    let match = input.match(unitRegex);

    console.log("Raw Input:", input);
    console.log("Matched Unit:", match);

    if (!match) return null; // ✅ Return `null` if no valid unit is found

    let unit = match[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) {
      console.log("Invalid unit:", unit);
      return null; // ✅ Return `null` for invalid units
    }

    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    return unitMap[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const spellings = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    return spellings[unit] || null;
  };

  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      lbs: 0.453592,
      kg: 1 / 0.453592,
      mi: 1.60934,
      km: 1 / 1.60934
    };

    let result = initNum * conversionRates[initUnit];
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
