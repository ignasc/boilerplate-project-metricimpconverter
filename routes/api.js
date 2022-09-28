'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  //middleware to always convert input into lower case before doing anything with it. (exception: L unit is dealt with later)
  app.use("/api/convert", (req, res, next) => {
    if(req.query.input){
      //console.log("-----------------converting input to lower case")
      req.query.input = req.query.input.toLowerCase();
    };
    next();
  } );

  app.get("/api/convert", (req, res) => {
    let result;
    let inputNumber;
    let inputUnit;
    let convertedNumber;
    let convertedUnit;
    let fullString;

    //read input number
    //read input unit
    //check of any or both are false (invalid)
    //return the invalid result or...
    //select the unit to convert to
    //convert the unit
    //generate text string
    // return result

    inputNumber = convertHandler.getNum(req.query.input);
    inputUnit = convertHandler.getUnit(req.query.input);
    convertedNumber = convertHandler.convert(inputNumber, inputUnit);
    convertedUnit = convertHandler.getReturnUnit(inputUnit);
    fullString = convertHandler.getString(inputNumber, inputUnit, convertedNumber, convertedUnit);
    

  
    result = fullString;

    //convertHandler.getNum(req.query.input);//so far working as intended

    //console.log("Conversion results below.")
    //console.log("inputNumber: " + inputNumber);
    //console.log("inputUnit: " + inputUnit);
    //console.log("convertedNumber: " + convertedNumber);
    //console.log("convertedUnit: " + convertedUnit);
    //console.log("fullString: " + fullString);
    
    
    //console.log("Returning the following:")

    //VALIDATION CHECK. If number or unit or both are invalid, change the result value accordingly.
    if(inputNumber == "invalid number" || inputUnit == "invalid unit"){

      //cases: 1 - invalid number only, 2 - invalid unit only, 3 - both inputs are invalid

      let validationNumber = 0;
      validationNumber = inputNumber == "invalid number" ? validationNumber + 1 : validationNumber;
      validationNumber = inputUnit == "invalid unit" ? validationNumber + 2 : validationNumber;
      
      switch(validationNumber){
        case 1:
          result = "invalid number"
          break;
        case 2:
          result = "invalid unit"
          break;
        case 3:
          result = "invalid number and unit"
          break;
        default:
          //do nothing. Should not reach this state.
          //console.log("WARNING: input and number validation swtich() reached default state. Check conditions!")
          break;
      };
      
    };
    
    //console.log(result)
    res.send(result);
  });

};
