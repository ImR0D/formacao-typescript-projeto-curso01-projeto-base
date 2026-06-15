import Validate from '../../Validator/Validate.js';
// Classe não está em uso ainda
export default class Account extends Validate {
    _privateAccountKey;
    _publicKeys;
    _fullName = '';
    _nickName = '';
    _balance = 0;
    constructor(fullName) {
        super();
        this._privateAccountKey = crypto.randomUUID();
        this._publicKeys = [];
        this._fullName = fullName;
        this._nickName = fullName.split(' ')[0];
    }
    get Balance() {
        return this._balance;
    }
    get Nickname() {
        return this._nickName;
    }
    get Fullname() {
        return this._fullName;
    }
    get AccountSubscriptionKeys() {
        return this._publicKeys;
    }
    GenerateRandomSubscriptionKey() {
        let generateUUID = crypto.randomUUID();
        let fragments = generateUUID.split('-');
        this._publicKeys.push(String(`${fragments[1]}${fragments[2]}${fragments[3]}`));
    }
    Credit(transaction) {
        this.LesserThan(transaction.value, 0);
        if (this.HasErrors())
            return;
        this._balance += transaction.value;
    }
    Debit(transaction) {
        this.LesserThan(transaction.value, 0);
        if (this.HasErrors())
            return;
        this._balance -= transaction.value;
    }
}
