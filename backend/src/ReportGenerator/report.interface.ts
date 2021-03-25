export class Report {
    total_revenue: number;
    total_rentals: number;
    docks: DockReport[];
    constructor(rev:number,rent:number) {
        this.total_revenue = rev;
        this.total_rentals = rent;
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
        this.revenue = rev;
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