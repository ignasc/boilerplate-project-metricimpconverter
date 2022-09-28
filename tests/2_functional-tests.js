const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

/*
DONE Convert a valid input such as 10L: GET request to /api/convert.
DONE Convert an invalid input such as 32g: GET request to /api/convert.
DONE Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
DONE Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
DONE Convert with no number such as kg: GET request to /api/convert
*/

//my own constants to use
const localHost = "http://localhost:" + process.env.PORT
const requester = chai.request(localHost);

suite('Functional Tests', function() {

  test("Converting a valid input", function(){
  //this test also serves as a 1_unit_test.js test, that correctly returns a spelled out string. I cannot perform that test without calling GET request to url, which runs through all converHandler functions to get each necesary variable for constructing a spelled out string.
    let testValue;

      chai.request(localHost)
        .get("/api/convert?input=10L")
        .then(response => {
          testValue = JSON.parse(response.res.text);
          //console.log(testValue.string)
          assert.equal(testValue.string, "10 liters converts to 2.64172 gallons", "converting a valid input")
        });
    
    });

  test("Converting an invalid input unit", function(){

      chai.request(localHost)
        .get("/api/convert?input=32g")
        .then(response => {
          assert.equal(response.res.text, "invalid unit", "converting an invalid input unit")
        });
      
    });

  test("Converting an invalid number", function(){

      chai.request(localHost)
        .get("/api/convert?input=3/7.2/4kg")
        .then(response => {
          assert.equal(response.res.text, "invalid number", "converting an invalid input number")
        });
      
    });

  test("Converting an invalid number AND unit", function(){

      chai.request(localHost)
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .then(response => {
          assert.equal(response.res.text, "invalid number and unit", "converting an invalid input number and unit")
        });
      
    });

  test("Converting an input with no number", function(){

      chai.request(localHost)
        .get("/api/convert?input=kg")
        .then(response => {
          testValue = JSON.parse(response.res.text);
          //console.log(testValue.string)
          assert.equal(testValue.string, "1 kilograms converts to 2.20462 pounds", "converting a valid input with no number")
        });
      
    });

});
