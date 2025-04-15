const {
    RegisteringNewAccount
} = require("./registration_functions")

const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log("the backend! router post");

    if(username && password){
        try {
            const tempAccountRegistered = await RegisteringNewAccount(username, password, req, res);
            tempAccountRegistered;
        } catch (error) {
            res.status(500).send("Error registering user");
            console.error("Error registering user", error);
        }
    }
})


module.exports = router;