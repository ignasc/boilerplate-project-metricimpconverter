function ConvertHandler() {

  const UNIT_KG = "kg";
  const UNIT_LBS = "lbs";
  const UNIT_KM = "km";
  const UNIT_MI = "mi";
  const UNIT_L = "l";
  const UNIT_L_CAPS = "L";
  const UNIT_GAL = "gal";

  //strings for invalid number and unit
  var INVALID_NUM = "invalid number";
  var INVALID_UNIT = "invalid unit";

  //my custom function to split input into a number and unit
  function splitInput(input) {
    //console.log("------------------------------------------------")
    //console.log("splitInput function called with input: " + input)
    //console.log("testFormat function called with parameter: " + input)

    //returns an array, that contains input split into a number and unit.
    
    let result = [];
    //let formatRegex = new RegExp(/^\d+\.\d+[a-z]+$|^\d+[a-z]+$/gm);
    //check for correct format, including any possible fractions (/) and decimals:
    /*
      good test set:
250km
2km
9kg
250.5km
25/50km
250mi
250.5mi
25/50mi
250gal
250.5gal
25/50gal
250l
250.5l
25/50l
250lbs
250.5lbs
25/50lbs
250kg
250.5kg
25/50kg
2.5/50kg
25/5.0kg
2.5/5.5l
km
l
gal
mi
      Bad test set:
250.kg
250gaal
gaal
kmkm
250..5kmkm
25//50km
250..5mi
25//50mi
250..5gal
25//50gal
250..5l
25//50l
250..5lbs
25//50lbs
250..5kg
25//50kg
250..5
25//50
2.5/50

    */

    /*
    Checking to make sure input format is correct:/^\d+[a-z]+$|^\d+[\/\.]{1}\d+[a-z]+$/gm
    Checking to make sure input format is correct:/^\d+(?:[\/\.]\d+)?[a-z]+/gm
    Use above to make sure format is correct

    Then attempt to split the input by grabbing units from the end of input:
    Capturing correct units only:/(?:kg|lbs|mi|km|l|gal)$/gm
    And grabbing the number from the front of input:
    Capturing correct number only:/^\d+(?:[\/\.]\d+)?/gm
    
    */

    
    //let formatRegex = new RegExp(/^\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?[a-z]+/gm);//test if all characters are in their right places (does not check for correct unit names)
    let firstCharacterRegex = new RegExp(/[a-z]/);//to find the index of the first character for spliting input into number and unit
    
    //return formatRegex.test(input) ? input : "invalid number and unit";

    //console.log("position of first character: " + input.search(firstCharacterRegex))

    let characterPosition = input.search(firstCharacterRegex);
    //console.log("Character position: " + characterPosition)

    //Split input into number and unit
    if(characterPosition == -1){
      result[0] = input;
      result[1] = INVALID_UNIT;
    } else {
      result[0] = input.slice(0,characterPosition);
      result[1] = input.slice(characterPosition);
    };
    //console.log("input split into number " + result[0] + " and unit " + result[1])

    //check if no number was supplied
    if(result[0] == ''){
      //console.log("seting number to default 1")
      result[0] = "1";
    };

    //validate number format and remove fraction if present
    //console.log("Validating number format")
    if( validateNumber(result[0]) ){
      result[0] = checkDivisionAndConvert(result[0]);
    } else{
      result[0] = INVALID_NUM;
    };
    
    return result;
    
  };

  //check if number input is in correct format
  function validateNumber(input){
    //console.log("validateNumber executed")
    let validNumberRegex = new RegExp(/^\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?$/mg);
    return validNumberRegex.test(input);
  };

  //function to check if number has a fraction and convert string into actual number type. parameter is a number part of string input
  function checkDivisionAndConvert(input){
    //console.log("checkDivisionAndConvert called with input: " + input)
    let fractionRegex = new RegExp(/\//mg);
    let decimalRegex = new RegExp(/\./mg);

    let fractionPosition = input.search(fractionRegex);
    //console.log("fraction position: " + fractionPosition)
    let numberArray = [];

    if(fractionPosition != -1){
      numberArray[0] = input.slice(0, fractionPosition);
      numberArray[1] = input.slice(fractionPosition + 1);//+1 to skip fraction position
    } else {
      numberArray[0] = input;
    };

    //console.log("number array after check for fraction character")
    //console.log(numberArray)

    //convert the numbers from string to number type
    let numberRegexWithDot = new RegExp(/^\d+\.?\d+/gm);
    let numberRegexNoDot = new RegExp(/^\d+/gm);
    
    //convert the strings to numbers:
    for (let i = 0; i < numberArray; i++) {
      if(numberRegexWithDot.test(numberArray[i])){
        numberArray[i] = parseFloat(numberArray[i].match(numberRegexWithDot));
      //console.log("number with dot")
      } else if(numberRegexNoDot.test(numberArray[i])){
        numberArray[i] = parseInt(numberArray[i].match(numberRegexNoDot));
      //console.log("number without dot")
      };
    };

    if (numberArray.length > 1) {
      result = numberArray[0] / numberArray[1];
      return result;
    } else {
      return numberArray[0];
    }

    //return result;
    
  };
  
  this.getNum = function(input) {

    //console.log("---------------------------------------------")
    //console.log("getNum function called, splitting input")
    
    result = splitInput(input)[0];
    //console.log("getNum returning: " + result)
    
    
    return result;
  };
  
  this.getUnit = function(input) {
    //console.log("----------------------------------------------")
    //console.log("Calling getUnit function with input: " + input)
    let result;
    input = splitInput(input)[1];
    //console.log("getUnit function called with split input: " + input)
    //let testInput = "";//this will force switch to default case if variable not changed
    //let regexUnit = new RegExp(/(?<=^\d+(?:[\/\.]\d+)?)(?:km|mi|kg|lbs|l|gal)$/gm); //to get the correct input unit, while making sure the rest of input is a correct number
    let regexUnit = new RegExp(/^(?:km|mi|kg|lbs|l|gal)$/gm);

    try {
      input.match(regexUnit)[0];
    } catch (error) {
      //not executing anything, this is just to prevent program to stop if unable to read property [0] of input, a.k.a input supplied without units, only a number
      //if unable to read, in any case it means the input is not a valid unit.
      //console.log("NOTE: .getUnit() caught error on input: " + input + " and returned " + INVALID_UNIT)
      return INVALID_UNIT;
    };
    
    //test if input unit is correct and return it
    switch(input.match(regexUnit)[0]){
      case UNIT_KG:
        //console.log("CASE: KG");
        result = UNIT_KG;
      break;
      case UNIT_LBS:
        //console.log("CASE: LBS");
        result = UNIT_LBS;
      break;
      case UNIT_KM:
        //console.log("CASE: KM");
        result = UNIT_KM;
      break;
      case UNIT_MI:
        //console.log("CASE: MILES");
        result = UNIT_MI;
      break;
      case UNIT_L:
        //console.log("CASE: LITERS");
        result = UNIT_L_CAPS;
      break;
      case UNIT_GAL:
        //console.log("CASE: GALLONS");
        result = UNIT_GAL;
      break;
      default:
        //console.log("CASE: invalid unit");
        //do nothing as invalid unit is already assigned in declaration
        result = INVALID_UNIT ;
      break;
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    let inputUnit = splitInput(initUnit.toLowerCase())[1];//toLowerCase is executed as .getUnit returns liters in caps, but .splitInput does not check for "L".
    //console.log("getReturnUnit called with input: " + initUnit + ". And converted to " + inputUnit + " for processing")

    //initUnit.toLowerCase()
    switch(inputUnit){
      case UNIT_KG:
        result = UNIT_LBS;
      break;
      case UNIT_LBS:
        result = UNIT_KG;
      break;
      case UNIT_KM:
        result = UNIT_MI;
      break;
      case UNIT_MI:
        result = UNIT_KM;
      break;
      case UNIT_L:
        result = UNIT_GAL;
      break;
      case UNIT_GAL:
        result = UNIT_L_CAPS;
      break;
      default:
        //do nothing as there will not be a case to default to
        //console.log("Default case reached in .getReturnUnit() method, returning invalid unit");
        result = INVALID_UNIT
      break;
    };
    //console.log("getReturnUnit return: " + result)
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch(unit.toLowerCase()){
      case UNIT_KG:
        result = "kilograms";
      break;
      case UNIT_LBS:
        result = "pounds";
      break;
      case UNIT_KM:
        result = "kilometers";
      break;
      case UNIT_MI:
        result = "miles";
      break;
      case UNIT_L:
        result = "liters";
      break;
      case UNIT_GAL:
        result = "gallons";
      break;
      default:
        //do nothing as there will not be a case to default to
        result = "Default case reached in .spellOutUnit() method";
      break;
    };
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit.toLowerCase()){
      case UNIT_KG:
        result = initNum / lbsToKg;
      break;
      case UNIT_LBS:
        result = initNum * lbsToKg;
      break;
      case UNIT_KM:
        result = initNum / miToKm;
      break;
      case UNIT_MI:
        result = initNum * miToKm;
      break;
      case UNIT_L:
        result = initNum / galToL;
      break;
      case UNIT_GAL:
        result = initNum * galToL;
      break;
      default:
        //do nothing as there will not be a case to default to
        result = "Default case reached in .convert() method";
      break;
    };

    //round result to 5 decimal places.
    if(result % 1 != 0){
      result = Math.round(result * 100000)/100000;
      return result;
    };
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit)
      };
    
    return result;
  };
  
}

module.exports = ConvertHandler;
