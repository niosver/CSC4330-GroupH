export class Report {
    total_revenue: number;
    total_rentals: number;
    docks: DockReport[];
    constructor(rev:number,rent:number) {
        if(rev != null) {
            this.total_revenue = rev;
        }
        else {
            this.total_revenue = 0;
        }
        if(rent!=null) {
            this.total_rentals = rent;
        }
        else {
            this.total_rentals = 0;
        }
        
        this.docks = [];
    }
    push(dock:DockReport) {
        this.docks.push(dock);
    }
}

export class DockReport {
    bike_dock_number: number;
    location: string;
    number_of_rentals: number;
    revenue: number;
    bikes_returned_other_dock: number | undefined;
    other_rentals_returned_here: number | undefined;
    constructor(dock:number,loc:string,num:number,rev:number) {
        this.bike_dock_number = dock;
        this.location = loc;
        this.number_of_rentals = num;
        if(rev != null) {
            this.revenue = rev;
        }
        else {
            this.revenue = 0;
        }
        this.bikes_returned_other_dock = undefined;
        this.other_rentals_returned_here = undefined;
    }
    add_other_rent(dock:number) {
        this.bikes_returned_other_dock = dock;
    }
    add_other_return(dock:number) {
        this.other_rentals_returned_here = dock;
    }
}