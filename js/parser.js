var Variable = require('./variable');

var Parser = module.exports = function(){}
Parser.prototype.parse = function(input) {
    return new Variable(input);
}
