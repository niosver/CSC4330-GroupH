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
export type ActiveTransRes = { transaction_ids: number[] };
