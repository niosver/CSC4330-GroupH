import express from "express";
import { Dock } from "./dock.interface";

const router = express.Router();

const get_docks = "SELECT * FROM BikeDock;";

router.get("/get_docks",async function (req, res, next) {
	let db = req.app.locals.db;
    let docks = [];
    try {
        if(!req.session.username) {
			res.status(400).send("Please login");
            return next();
		}
        let result = await db.query(get_docks);
        for(var i =0;i<result.length;i++) {
            let dock = new Dock(
                result[i].bike_dock_number,
                result[i].number_of_bikes,
                result[i].location
            );
            docks.push(dock);
        }
        res.status(200).send({bike_docks:docks});
    }
    catch {
        res.status(400).send("Unable to retrieve dock information");
    }
});

export default router;