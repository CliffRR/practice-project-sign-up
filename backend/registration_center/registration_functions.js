const express = require("express")
const mysql = require("mysql")
const cors = require("cors");
// const bcrypt = require("bcrypt")
const app = express();
// require('dotenv').config();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"], //originally 3000
        methods: ["GET", "POST"],
        credentials: true
    })
);
console.log("checking root", process.env.REACT_APP_DB_USER);

const db = mysql.createPool({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

async function RegisteringNewAccount(username, password, req, res){
    let connection;

    try {
        connection = await new Promise((resolve, reject) => {
            db.getConnection((err, conn) => {
                if (err) reject(err);
                else resolve(conn);
            });
        });

        if (!connection) {
            throw new Error("Failed to establish database connection");
        }

        await connection.beginTransaction();

        //create account
        const newAccount = await new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO users (username, password) VALUES (?,?)", [username, password],
                (err, result) => {
                    // console.log(result);
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });

        const newUserId = newAccount.insertId;

        req.session.user = 
        [
            {
                id: newUserId,
                username: username,
            }
        ]

        await connection.commit();
        res.send(req.session.user);
    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error in RegisteringNewAccount function:", error);
        res.status(500).send("Error creating new account");
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { 
    RegisteringNewAccount
}