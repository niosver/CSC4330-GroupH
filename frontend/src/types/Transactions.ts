/* Rent */
export type RentReq = {
    dock: number;
};
export type RentRes = {
    transaction_id: number;
};
/* Return */
export type ReturnReq = {
    transaction_id: number;
    destination_dock: number;
};
export type ReturnRes = {
    price: number;
};
/* Docks */
export type DockReq = {};
export type DockRes = {
    bike_docks: [
        {
            bikedock_number: number;
            number_of_bikes: number;
            location: string;
        }
    ];
};
/* Current Transactions */
export type ActiveTransReq = {};
type Transaction = { transaction_id: number; origin_dock: number; start_date: Date };
export type ActiveTransRes = { active_transactions: Transaction[] };
