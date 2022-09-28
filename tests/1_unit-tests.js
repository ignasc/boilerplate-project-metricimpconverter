const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

/*
DONE convertHandler should correctly read a whole number input.
DONE convertHandler should correctly read a decimal number input.
DONE convertHandler should correctly read a fractional input.
DONE convertHandler should correctly read a fractional input with a decimal.
DONE convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
DONE convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
DONE convertHandler should correctly read each valid input unit.
DONE convertHandler should correctly return an error for an invalid input unit.
DONE convertHandler should return the correct return unit for each valid input unit.
DONE convertHandler should correctly return the spelled-out string unit for each valid input unit.
DONE convertHandler should correctly convert gal to L.
DONE convertHandler should correctly convert L to gal.
DONE convertHandler should correctly convert mi to km.
DONE convertHandler should correctly convert km to mi.
DONE convertHandler should correctly convert lbs to kg.
DONE convertHandler should correctly convert kg to lbs.
*/

suite('Unit Tests', function(){

  suite("Reading input number", function(){

    test("Correctly returning whole number", function(){
      assert.equal(convertHandler.getNum("1km") % 1, 0, "value was not read as whole number");
    });
    
    test("Correctly returning whole number", function(){
      assert.equal(convertHandler.getNum("20kg") % 1, 0, "value was not read as whole number");
    });
    
    test("Correctly returning whole number", function(){
      assert.equal(convertHandler.getNum("300gal") % 1, 0, "value was not read as whole number");
    });
    
    test("Correctly returning whole number", function(){
      assert.equal(convertHandler.getNum("2400l") % 1, 0, "value was not read as whole number");
    });

    test("Correctly returning decimal number", function(){
      assert.notEqual(convertHandler.getNum("1.1km") % 1, 0, "value was not read as decimal number");
    });
    
    test("Correctly returning decimal number", function(){
      assert.notEqual(convertHandler.getNum("20.22kg") % 1, 0, "value was not read as decimal number");
    });
    
    test("Correctly returning decimal number", function(){
      assert.notEqual(convertHandler.getNum("300.333gal") % 1, 0, "value was not read as decimal number");
    });
    
    test("Correctly returning decimal number", function(){
      assert.notEqual(convertHandler.getNum("2400.2424l") % 1, 0, "value was not read as decimal number");
    });

    test("Correctly read fractional number inputs", function(){
      assert.equal(convertHandler.getNum("10/5km"), 2, "fractional value was not read correctly");
    });
    
    test("Correctly read fractional number inputs", function(){
      assert.equal(convertHandler.getNum("20/10kg"), 2, "fractional value was not read correctly");
    });
    
    test("Correctly read fractional number inputs", function(){
      assert.equal(convertHandler.getNum("300/150gal"), 2, "fractional value was not read correctly");
    });
    
    test("Correctly read fractional number inputs", function(){
      assert.equal(convertHandler.getNum("2400/1200l"), 2, "fractional value was not read correctly");
    });
    
    test("Correctly read invalid fractional number inputs", function(){
      assert.equal(convertHandler.getNum("240/0/1200l"), "invalid number", "invalid fractional value was not read correctly");
    });
    
    test("Correctly read invalid fractional number inputs", function(){
      assert.equal(convertHandler.getNum("24/00/1200"), "invalid number", "invalid fractional value was not read correctly");
    });

    test("Correctly read fractional number inputs with decimal points", function(){
      assert.equal(convertHandler.getNum("10.10/2km"), 5.05, "10.10/2km fractional value with decimal was not read correctly");
    });
    
    test("Correctly read fractional number inputs with decimal points", function(){
      assert.equal(convertHandler.getNum("5.5/5.5kg"), 1, "5.5/5.5kg fractional value with decimal was not read correctly");
    });
    
    test("Correctly read fractional number inputs with decimal points", function(){
      assert.equal(convertHandler.getNum("10/2.50gal"), 4, "10/2.50gal fractional value with decimal was not read correctly");
    });
    
    test("Correctly read fractional number inputs with decimal points", function(){
      assert.equal(convertHandler.getNum("10.5/2.5l"), 4.2, "10.5/2.5l fractional value with decimal was not read correctly");
    });
      
    test("Correctly default to 1 when no number is supplied", function(){
      assert.equal(convertHandler.getNum("l"), 1, "value was not defaulted to 1");
      assert.equal(convertHandler.getNum("kml"), 1, "value was not defaulted to 1");
    });
    
  });

  suite("Reading input unit", function(){

    test("Correctly returning the unit", function(){
      assert.equal(convertHandler.getUnit("1km"), "km", "convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the unit", function(){
      assert.equal(convertHandler.getUnit("10mi"), "mi", "convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the unit", function(){
      assert.equal(convertHandler.getUnit("10kg"), "kg", "convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the unit", function(){
      assert.equal(convertHandler.getUnit("10lbs"), "lbs", "convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the unit", function(){
      assert.equal(convertHandler.getUnit("10l"), "L", "convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the unit", function(){
      assert.equal(convertHandler.getUnit("10gal"), "gal", "convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the unit", function(){
      assert.equal(convertHandler.getUnit("km"), "km", "convertHandler should correctly read each valid input unit");
    });

    test("Correctly returning the error when wrong unit given", function(){
      assert.equal(convertHandler.getUnit("1kz"), "invalid unit", "kz invalid unit correctly read and returned error");
    });
    
    test("Correctly returning the error when wrong unit given", function(){
      assert.equal(convertHandler.getUnit("10mai"), "invalid unit", "mai invalid unit correctly read and returned error");
    });
    
    test("Correctly returning the error when wrong unit given", function(){
      assert.equal(convertHandler.getUnit("10kilg"), "invalid unit", "kilg invalid unit correctly read and returned error");
    });
    
    test("Correctly returning the error when wrong unit given", function(){
      assert.equal(convertHandler.getUnit("10lbsa"), "invalid unit", " lbsa invalid unit correctly read and returned error");
    });
    
    test("Correctly returning the error when wrong unit given", function(){
      assert.equal(convertHandler.getUnit("10llitter"), "invalid unit", "llitter invalid unit correctly read and returned error");
    });
    
    test("Correctly returning the error when wrong unit given", function(){
      assert.equal(convertHandler.getUnit("10gaal"), "invalid unit", "gaal invalid unit correctly read and returned error");
    });
    
    test("Correctly returning the error when wrong unit given", function(){
      assert.equal(convertHandler.getUnit("kb"), "invalid unit", "kb invalid unit correctly read and returned error");
    });

    test("Correctly returning the output unit", function(){
      assert.equal(convertHandler.getReturnUnit("1km"), "mi", "output convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the output unit", function(){
      assert.equal(convertHandler.getReturnUnit("10mi"), "km", "output convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the output unit", function(){
      assert.equal(convertHandler.getReturnUnit("10kg"), "lbs", "output convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the output unit", function(){
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg", "output convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the output unit", function(){
      assert.equal(convertHandler.getReturnUnit("2.5l"), "gal", "output convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the output unit", function(){
      assert.equal(convertHandler.getReturnUnit("10gal"), "L", "output convertHandler should correctly read each valid input unit");
    });
    
    test("Correctly returning the output unit", function(){
      assert.equal(convertHandler.getReturnUnit("L"), "gal", "output convertHandler should correctly read each valid input unit");
    });
    
  });

  //NOTE a test for correctly spelled out string has been moved to functional test module. Need to call GET request to perform that conversion, so might as well do it there with chai-http already setup.
  
  suite("Testing output unit coversion", function(){

    test("Correctly returning output unit", function(){
      assert.equal(convertHandler.getReturnUnit("km"), "mi", "km should be converted to mi");
    });
    
    test("Correctly returning output unit", function(){
      assert.equal(convertHandler.getReturnUnit("mi"), "km", "mi should be converted to km");
    });
    
    test("Correctly returning output unit", function(){
      assert.equal(convertHandler.getReturnUnit("l"), "gal", "l should be converted to gal");
    });
    
    test("Correctly returning output unit", function(){
      assert.equal(convertHandler.getReturnUnit("L"), "gal", "L should be converted to gal");
    });
    
    test("Correctly returning output unit", function(){
      assert.equal(convertHandler.getReturnUnit("gal"), "L", "gal should be converted to L");
    });
    
    test("Correctly returning output unit", function(){
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs", "kg should be converted to lbs");
    });
    
    test("Correctly returning output unit", function(){
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg", "lbs should be converted to kg");
    });
    
  });

});
