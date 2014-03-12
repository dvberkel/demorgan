var expect = require('chai').expect;
var Parser = require('../js/parser');

var Tokenizer = require('../js/tokenizer');
var Variable = require('../js/variable');
var Not = require('../js/not.js');

describe('Parser', function(){
    it('should parse a variable', function(){
	var parser = new Parser();

        var formula = parser.parse("a")

	expect(formula.equals(new Variable('a'))).to.be.ok;
    });
});

describe('Tokenizer', function(){
    var tokenizer;

    beforeEach(function(){
	tokenizer = new Tokenizer();
    });

    describe('unknown', function(){
	var unknown = [
	    {  'input': '{' },
	];

	unknown.forEach(function(testCase){
	    it('should tokenize a variable ' + testCase.input, function(){
		var tokens = tokenizer.tokenize(testCase.input);

		expect(tokens).to.eql([ {'type': 'unknown', 'input': testCase.input } ]);
	    });

	});
    });

    describe('variables', function(){
	var variables = [
	    {  'input': 'a', 'name': 'a' },
	    {  'input': 'b', 'name': 'b' },
	    {  'input': 'ab', 'name': 'ab' },
	];

	variables.forEach(function(testCase){
	    it('should tokenize a variable ' + testCase.input, function(){
		var tokens = tokenizer.tokenize(testCase.input);

		expect(tokens).to.eql([ {'type': 'variable', 'name': testCase.name } ]);
	    });

	});
    });

    describe('whitespace', function(){
	var whitespace = [
	    {  'input': ' ' },
	    {  'input': '\t' },
	    {  'input': '\n' },
	]

	whitespace.forEach(function(testCase, index){
	    it('should tokenize a whitespace ' + index, function(){
		var tokens = tokenizer.tokenize(testCase.input);

		expect(tokens).to.eql([ {'type': 'whitespace' } ]);
	    });

	});
    });

    describe('brackets', function(){
	var brackets = [
	    {  'input': '(', 'kind': 'left' },
	    {  'input': ')', 'kind': 'right' },
	];

	brackets.forEach(function(testCase, index){
	    it('should tokenize a whitespace ' + index, function(){
		var tokens = tokenizer.tokenize(testCase.input);

		expect(tokens).to.eql([ {'type': 'bracket', 'kind': testCase.kind } ]);
	    });

	});
    });

    describe('operators', function(){
	var operators = [
	    { 'input': 'OR', 'kind': 'or' },
	    { 'input': 'AND', 'kind': 'and' },
	    { 'input': 'NOT', 'kind': 'not' },
	];

	operators.forEach(function(testCase){
	    it('should tokenize ' + testCase.input, function(){
		var tokens = tokenizer.tokenize(testCase.input);

		expect(tokens).to.eql([ {'type': 'operator', 'kind': testCase.kind } ]);
	    });
	});
    });

    describe('complex', function(){
	var complexes = [
	    { 'input': 'a', 'tokens': [{'type': 'variable', 'name': 'a' }] },
	    { 'input': 'a ', 'tokens': [{'type': 'variable', 'name': 'a' }, {'type': 'whitespace' }] },
	];

	complexes.forEach(function(testCase){
	    it('should tokenize ' + testCase.input, function(){
		var tokens = tokenizer.tokenize(testCase.input);

		expect(tokens).to.eql(testCase.tokens);
	    });
	});
    });
});

describe('Variable', function(){
    it('should be contructed with a name', function(){
	expect(function(){ new Variable() }).to.throw('name not initialized');
    });

    it('should equal if name is the same', function(){
	var a1 = new Variable('a');
	var a2 = new Variable('a');

 	expect(a1.equals(a2)).to.be.ok;
    });

    it('should not equal if name differ', function(){
	var a = new Variable('a');
	var b = new Variable('b');

 	expect(a.equals(b)).to.not.be.ok;
    });
});

describe('Operator', function(){
    describe('NOT', function(){
	it('should be contructed with a formula', function(){
	    expect(function(){ new Not() }).to.throw('NOT not initialized');
	});

	it('should equal if formual is the same', function(){
	    var a1 = new Not(new Variable('a'));
	    var a2 = new Not(new Variable('a'));

 	    expect(a1.equals(a2)).to.be.ok;
	});

	it('should not equal if name differ', function(){
	    var a = new Not(new Variable('a'));
	    var b = new Not(new Variable('b'));

 	    expect(a.equals(b)).to.not.be.ok;
	});
    });
});
