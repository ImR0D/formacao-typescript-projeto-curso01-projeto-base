import { ITransaction } from '../../interfaces/ITransaction.js';
import Validate from '../../Validator/Validate.js';

// Classe não está em uso ainda
export default class Account extends Validate<Account> {
  private _privateAccountKey: string;
  private _publicKeys: string[];
  private _fullName: string = '';
  private _nickName: string = '';
  private _balance: number = 0;

  constructor(fullName: string) {
    super();
    this._privateAccountKey = crypto.randomUUID();
    this._publicKeys = [];
    this._fullName = fullName;
    this._nickName = fullName.split(' ')[0];
  }
  public get Balance(): Readonly<number> {
    return this._balance;
  }
  public get Nickname(): Readonly<string> {
    return this._nickName;
  }
  public get Fullname(): Readonly<string> {
    return this._fullName;
  }
  public get AccountSubscriptionKeys(): Readonly<string[]> {
    return this._publicKeys;
  }
  public GenerateRandomSubscriptionKey(): void {
    let generateUUID = crypto.randomUUID();
    let fragments = generateUUID.split('-');
    this._publicKeys.push(
      String(`${fragments[1]}${fragments[2]}${fragments[3]}`),
    );
  }

  public Credit(transaction: ITransaction): void {
    this.LesserThan(transaction.value, 0);
    if (this.HasErrors()) return;
    this._balance += transaction.value;
  }
  public Debit(transaction: ITransaction): void {
    this.LesserThan(transaction.value, 0);
    if (this.HasErrors()) return;
    this._balance -= transaction.value;
  }
}
