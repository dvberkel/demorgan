var Variable = module.exports = function(name){
    if (!name) {
	throw 'name not initialized';
    }
    this.name = name;
}
Variable.prototype.equals = function(other){
    return this.name === other.name;
}
