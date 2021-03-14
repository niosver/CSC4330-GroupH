export class Customer{
    customer_id: number;
    first_name: string;
    last_name: string;
    address: string;
    birthdate: Date;
    email: string;
    cc_number: string;
    cc_name: string;
    billing_address: string;

    constructor(f_name:string,l_name:string,add:string,bday:string,ema:string,cc_num:string,cc_na:string,bill_add:string,id?:number) {
        this.first_name=f_name;
        this.last_name=l_name;
        this.address=add;
        this.birthdate = new Date(bday);
        this.email = ema;
        this.cc_number = cc_num;
        this.cc_name = cc_na;
        this.billing_address = bill_add;
        if(id == undefined) {
            this.customer_id = -1;
        }
        else {
            this.customer_id = id;
        }
    }

}