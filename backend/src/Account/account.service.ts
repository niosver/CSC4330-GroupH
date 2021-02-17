import express from "express";
import {Account} from "./account.interface"

var router = express.Router();

router.post('/signup', async function(req,res) {
    res.send("Not implemented")
});

router.post('/create_manager', async function(req,res) {
    res.send("Not implemented");
});

router.get('/login', async function(req,res) {
    res.send("Not implemented");
});


export default router