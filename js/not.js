var Not = module.exports = function(formula){
    if (!formula) {
	throw 'NOT not initialized';
    }
    this.formula = formula;
}
Not.prototype.equals = function(formula) {
    if (formula instanceof Not) {
	return this.formula.equals(formula.formula);
    }
    return false;
}
