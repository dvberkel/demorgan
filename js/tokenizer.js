var Tokenizer = module.exports = function(){}

var types = [
    { 'regexp': /^(AND)/, 'result': function(){ return {'type': 'operator', 'kind': 'and' }; } },
    { 'regexp': /^(OR)/,  'result': function(){ return {'type': 'operator', 'kind': 'or' }; } },
    { 'regexp': /^(NOT)/, 'result': function(){ return {'type': 'operator', 'kind': 'not' }; } },
    { 'regexp': /^( )/,   'result': function(){ return {'type': 'whitespace' }; } },
    { 'regexp': /^(\t)/,  'result': function(){ return {'type': 'whitespace' }; } },
    { 'regexp': /^(\n)/,  'result': function(){ return {'type': 'whitespace' }; } },
    { 'regexp': /^(\()/,  'result': function(){ return {'type': 'bracket', 'kind': 'left' }; } },
    { 'regexp': /^(\))/,  'result': function(){ return {'type': 'bracket', 'kind': 'right' }; } },
    { 'regexp': /^(\w+)/, 'result': function(name){ return {'type': 'variable', 'name': name }; } },
    { 'regexp': /^(.)/,   'result': function(name){ return {'type': 'unknown', 'input': name }; } },
];

Tokenizer.prototype.tokenize = function(input){
    var tokens = [];
    while (!!input) {
	for(var index = 0; index < types.length; index++){
	    var type = types[index];
	    var result = input.match(type.regexp);
	    if (result) {
		var group = result[1];
		tokens.push(type.result(group));
		input = input.slice(group.length);
		break;
	    }
	}
    }
    return tokens;
}
