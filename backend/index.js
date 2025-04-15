const express = require("express")
// const mysql = require("mysql")
const cors = require("cors");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const registrationRouter = require(".//registration_center/registration_backend");
// const fs = require('fs');
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"], //originally 3000
        methods: ["GET", "POST"],
        credentials: true
    })
);
//-----------------i dont need to understand but i always have to use this
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
//----------------------------------------------------------------------------

app.use(
    session({
        key: "userId",
        secret: "subscribe", //this should be really long and complicated 
        resave: false, 
        saveUninitialized: false,
        cookie: {
            // expires: 60 * 60 * 24,
            expires: 365 * 24 * 60 * 60 * 1000, // Set to 1 year in milliseconds
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
        }
    })
)

app.use("/register/", registrationRouter);


app.listen(3002, () => {
    console.log("Server running on http://localhost:3002");
})