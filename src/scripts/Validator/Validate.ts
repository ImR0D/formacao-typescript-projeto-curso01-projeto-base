export default class Validate<T extends object> {
  private _error: Record<string, string> = {};
  private _isNullOrUndefinedMessageError = 'Objeto nulo ou não definido';
  private _isNullOrWhiteSpaceMessageError = 'Valor do texto é nulo ou vazio';
  private _isNotEqualsMessageError = 'Os objetos não são iguais';
  private _lesserThanOrEqualToMessageError = 'O valor não é menor ou igual';
  private _lesserThanMessageError = 'O valor não é menor';
  private _greaterThanOrEqualToMessageError = 'O valor não é maior ou igual';
  private _greaterThanMessageError = 'O valor não é maior';

  constructor() {}

  protected IsNullOrUndefined(target: T): boolean {
    const validation = target == null || target == undefined;
    if (validation) {
      this._error['IsNullOrUndefinedError'] =
        this._isNullOrUndefinedMessageError;
    }
    return validation;
  }
  protected IsNullOrWhitespace(str: string): boolean {
    const validation = str === null || str.trim() == '';
    if (validation) {
      this._error['IsNullOrWhiteSpaceError'] =
        this._isNullOrWhiteSpaceMessageError;
    }
    return validation;
  }
  protected GreaterThan(a: number, b: number): boolean {
    if (!(a > b)) {
      this._error['GreaterThanError'] = this._greaterThanMessageError;
    }
    return a > b;
  }
  protected GreaterThanOrEqualTo(a: number, b: number): boolean {
    if (!(a > b)) {
      this._error['GreaterThanOrEqualToError'] =
        this._greaterThanOrEqualToMessageError;
    }
    return a >= b;
  }
  protected LesserThanOrEqualTo(a: number, b: number): boolean {
    if (!(a <= b)) {
      this._error['LesserThanOrEqualToError'] =
        this._lesserThanOrEqualToMessageError;
    }
    return a <= b;
  }
  protected LesserThan(a: number, b: number): boolean {
    if (!(a < b)) {
      this._error['LesserThanError'] = this._lesserThanMessageError;
    }
    return a < b;
  }
  public isEquals(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a !== typeof b) return false;
    if (typeof a === 'object' && typeof b === 'object') {
      if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      }

      if (Array.isArray(a) !== Array.isArray(b)) return false;

      const keysA = Object.keys(a as object);
      const keysB = Object.keys(b as object);

      if (keysA.length !== keysB.length) return false;

      for (const key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;

        if (!this.isEquals((a as any)[key], (b as any)[key])) {
          this._error['IsNotEqualsError'] = this._isNotEqualsMessageError;
          return false;
        }
      }
    }
    return true;
  }

  protected HasErrors(): boolean {
    return Object.keys(this._error).length > 0;
  }
  protected Errors(): Record<string, string> {
    return this._error;
  }
  protected GetMessageErrorByFunctionName(funcName: string): string {
    let textError: string = funcName.includes('Error')
      ? funcName
      : funcName.padEnd(funcName.length + 'Error'.length, 'Error');
    let tracedError: string = '';
    if (textError == null) {
      Object.keys(this._error).forEach((k) => {
        if (
          k == textError ||
          k.toLowerCase() === String(textError).toLowerCase()
        ) {
          tracedError = this._error[textError];
        }
      });
    }

    return tracedError;
  }
  protected ClearErrors(): void {
    if (this._error == null) {
      return;
    }
    this._error = {};
  }
}
