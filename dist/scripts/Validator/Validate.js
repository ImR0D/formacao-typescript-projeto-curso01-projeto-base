export default class Validate {
    _error = {};
    _isNullOrUndefinedMessageError = 'Objeto nulo ou não definido';
    _isNullOrWhiteSpaceMessageError = 'Valor do texto é nulo ou vazio';
    _isNotEqualsMessageError = 'Os objetos não são iguais';
    _lesserThanOrEqualToMessageError = 'O valor não é menor ou igual';
    _lesserThanMessageError = 'O valor não é menor';
    _greaterThanOrEqualToMessageError = 'O valor não é maior ou igual';
    _greaterThanMessageError = 'O valor não é maior';
    constructor() { }
    IsNullOrUndefined(target) {
        const validation = target == null || target == undefined;
        if (validation) {
            this._error['IsNullOrUndefinedError'] =
                this._isNullOrUndefinedMessageError;
        }
        return validation;
    }
    IsNullOrWhitespace(str) {
        const validation = str === null || str.trim() == '';
        if (validation) {
            this._error['IsNullOrWhiteSpaceError'] =
                this._isNullOrWhiteSpaceMessageError;
        }
        return validation;
    }
    GreaterThan(a, b) {
        if (!(a > b)) {
            this._error['GreaterThanError'] = this._greaterThanMessageError;
        }
        return a > b;
    }
    GreaterThanOrEqualTo(a, b) {
        if (!(a > b)) {
            this._error['GreaterThanOrEqualToError'] =
                this._greaterThanOrEqualToMessageError;
        }
        return a >= b;
    }
    LesserThanOrEqualTo(a, b) {
        if (!(a <= b)) {
            this._error['LesserThanOrEqualToError'] =
                this._lesserThanOrEqualToMessageError;
        }
        return a <= b;
    }
    LesserThan(a, b) {
        if (!(a < b)) {
            this._error['LesserThanError'] = this._lesserThanMessageError;
        }
        return a < b;
    }
    isEquals(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (typeof a !== typeof b)
            return false;
        if (typeof a === 'object' && typeof b === 'object') {
            if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime();
            }
            if (Array.isArray(a) !== Array.isArray(b))
                return false;
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length)
                return false;
            for (const key of keysA) {
                if (!Object.prototype.hasOwnProperty.call(b, key))
                    return false;
                if (!this.isEquals(a[key], b[key])) {
                    this._error['IsNotEqualsError'] = this._isNotEqualsMessageError;
                    return false;
                }
            }
        }
        return true;
    }
    HasErrors() {
        return Object.keys(this._error).length > 0;
    }
    Errors() {
        return this._error;
    }
    GetMessageErrorByFunctionName(funcName) {
        let textError = funcName.includes('Error')
            ? funcName
            : funcName.padEnd(funcName.length + 'Error'.length, 'Error');
        let tracedError = '';
        if (textError == null) {
            Object.keys(this._error).forEach((k) => {
                if (k == textError ||
                    k.toLowerCase() === String(textError).toLowerCase()) {
                    tracedError = this._error[textError];
                }
            });
        }
        return tracedError;
    }
    ClearErrors() {
        if (this._error == null) {
            return;
        }
        this._error = {};
    }
}
