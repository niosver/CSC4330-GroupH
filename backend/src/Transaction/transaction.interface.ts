export enum Status {
    in_progress = "in_progress",
    complete = "complete"
}

const msToHour = 3600000;
const hrFee = 9;
const halfHrFee = 5;
export class Transaction{
    price: number | undefined;
    damage_fee: number;
    cc_number: string;
    start_date: Date;
    end_date: Date | undefined;
    customer_id: number;
    origin_dock: number;
    destination_dock: number | undefined;
    status: Status;

    constructor(cc_number: string, start_date: Date, customer_id: number,origin_dock:number,destination_dock?:number,price?:number) {
        this.price = undefined;
        this.end_date = undefined;
        this.destination_dock = undefined;

        this.cc_number = cc_number;
        this.start_date = start_date;
        this.customer_id = customer_id;
        this.origin_dock = origin_dock;
        this.damage_fee = 0;
        if(destination_dock!= undefined) {
            this.destination_dock = destination_dock;
        }
        if(price!=undefined) {
            this.price = price;
        }
        this.status = Status.in_progress;
    }
    

    set_status(new_status:Status){
        this.status = new_status;
    }

    set_destination(dest:number) {
        this.destination_dock = dest;
    }

    set_end_date(end:Date) {
        this.end_date = end;
    }
    add_fee(fee:number) {
        this.damage_fee = fee;
    }

    calculate_price(end?: Date) {
        if(end != undefined) {
            this.end_date = end;
        }
        //@ts-ignore
        let ms = this.start_date - this.end_date;
        let hrs = ms/msToHour;
        let hr = Math.floor(hrs);
        let remainder = hrs - hr;
        let price = hr*hrFee;
        if(remainder < 0.5) {
            price+= halfHrFee;
        }
        else {
            price+=hrFee;
        }
        this.price = price;
        return price;
    }

}