/* Rent */
export type RentReq = {
    dock: number;
};
export type RentRes = {
    transaction_id: number;
    origin_dock: number;
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
type ActiveTransaction = { transaction_id: number; origin_dock: number; start_date: Date };
export type ActiveTransRes = { active_transactions: ActiveTransaction[] };

export type CompleteTransReq = {};
type CompleteTransaction = {
    origin_dock: number;
    destination_dock: number;
    start_date: Date;
    end_date: Date;
    damage_fee: number;
    price: number;
};
export type CompleteTransRes = { complete_transactions: CompleteTransaction[] };

export type DamageChargeRes = { transaction_id: number; damage_fee: number };
type RecentReturn = {
    transaction_id: number;
    start_date: Date;
    end_date: Date;
    origin_dock: number;
    destination_dock: number;
};
export type RecentReturnsRes = RecentReturn[];
