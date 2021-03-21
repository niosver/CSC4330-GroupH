export class Dock{
    bikedock_number: number;
    number_of_bikes: number;
    location: string;

    constructor(dock_num:number,num_bikes:number,location:string) {
        this.bikedock_number = dock_num;
        this.number_of_bikes = num_bikes;
        this.location = location;
    }
}