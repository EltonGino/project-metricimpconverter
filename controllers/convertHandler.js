const { units, conversionRate, unitMapping } = require("../utils/constants");

function ConvertHandler() {
  this.getNum = function (input) {
    const englishAlphabet = /[a-zA-Z]/;
    const idx = input.split("").findIndex((char) => englishAlphabet.test(char));

    if (idx === 0) return 1; // ✅ Default to 1 if no number is provided

    let quantityStr = idx < 0 ? input.slice(0) : input.slice(0, idx);
    const quantityArr = quantityStr.split("/");

    if (quantityArr.length === 1) {
      const quantity = quantityArr[0];
      if (quantity === "") return null; // ✅ Fix: return null instead of "invalid number"
      return isNaN(+quantity) ? null : +quantity;
    }
    if (quantityArr.length === 2) {
      if (quantityArr.some((num) => num === "")) {
        return null; // ✅ Fix: return null instead of "invalid number"
      }
      const numerator = +quantityArr[0];
      const denominator = +quantityArr[1];
      return isNaN(numerator) || isNaN(denominator) ? null : numerator / denominator;
    }

    return null; // ✅ Fix: return null instead of "invalid number"
  };

  this.getUnit = function (input) {
    const englishAlphabet = /[a-zA-Z]/;
    const idx = input.split("").findIndex((char) => englishAlphabet.test(char));
    if (idx < 0) {
      return null; // ✅ Fix: return null instead of "invalid unit"
    }
    const unit = input.slice(idx);
    return this.spellOutUnit(unit);
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit];
  };

  this.spellOutUnit = function (unit) {
    if (unit === "L" || unit === "l") return "L";
    if (units.hasOwnProperty(unit.toLowerCase())) {
      return unit.toLowerCase();
    }
    return null; // ✅ Fix: return null instead of "invalid unit"
  };

  this.convert = function (initNum, initUnit) {
    return Math.round(conversionRate[initUnit] * initNum * 1e5) / 1e5;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${unitMapping[initUnit]} converts to ${returnNum} ${unitMapping[returnUnit]}`;
  };
}

module.exports = ConvertHandler;
