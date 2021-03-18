export enum Account_Type {
    customer = "customer",
    manager = "manager",
    owner = "owner"
}

export class Account{
    username: string;
    password: string;
    account_type: Account_Type;
    customer_id: number|null;

    constructor(name: string, pass: string, acc: Account_Type, cust: number|null = null) {
        this.username = name;
        this.password = pass;
        this.account_type = acc;
        this.customer_id = cust;
    }

}
