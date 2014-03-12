var Tokenizer = require('./tokenizer');

var Variable = require('./variable');
var Not = require('./not');

var whitespaceFilter = function(token){
    return token.type != 'whitespace';
};

var Parser = module.exports = function(){
    this.tokenizer = new Tokenizer();
}
Parser.prototype.parse = function(input) {
    var tokens = this.tokenizer.tokenize(input).filter(whitespaceFilter);
    if (tokens[0].type == 'variable') {
	return new Variable(tokens[0].name);
    } else if (tokens[0].type == 'operator' && tokens[0].kind == 'not') {
	return new Not(new Variable(tokens[1].name));
    }
}
