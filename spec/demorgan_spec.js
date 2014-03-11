var expect = require('chai').expect;

describe('breaking down formulas into elements', function(){
    it('should recognize a formula with one variable as one element', function(){

        var formulaElements = parseFormulaString("a")
	expect(formulaElements).to.equal("Array");
    });
});
 
