export type Report = {
    total_revenue: number;
    total_rentals: number;
    docks: [
        {
            bike_dock_number: number;
            location: string;
            number_of_rentals: number;
            revenue: number;
            bikes_returned_other_dock: number;
            other_rentals_returned_here: number;
        }
    ];
};
