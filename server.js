// Initializing required dependencies

const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');


// configuring environment variables
dotenv.config();


// creating a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// testing the connection
 db.connect((err) => {
    
    // if connection error
    if(err) {
        return console.log("Error connecting to database: ", err)
    }

    // if connection successful
    console.log("Successfully connected to MySQL:", db.threadId)
});



// Q1. Retrieve all patients (patient_id, first_name, last_name, date_of_birth)
app.get('/patients', (req, res) => {
   const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
   db.query(getPatients, (err, data) => {
    
    // if there is an error
    if(err) {
        return res.status(400).send("Failed to fetch data")
    }

    // if no error
    res.status(200).send(data)
    })
});


// Q2. Retrieve all providers (first_name, last_name, provider_specialty)
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        
        // if there is an error
        if(err) {
            return res.status(400).send("Failed to fetch data: ", err)
        }

        // if no error
        res.status(200).send(data)
    })
});


// Q.3 Filter patients by First Name
app.get('/patients-by-first-name', (req, res) => {
    const getPatientsByFirstName = "SELECT * FROM patients ORDER BY first_name"
    db.query(getPatientsByFirstName, (err, data) => {
        
        // if there is an error
        if(err) {
            return res.status(400).send("Failed to fetch data: ", err)
        }

        // if no error
        res.status(200).send(data)
    })
});



// Q.4 Retrieve all providers by their specialty
app.get('/providers-by-specialty', (req, res) => {
    const getProvidersBySpecialty = "SELECT * FROM providers ORDER BY provider_specialty"
    db.query(getProvidersBySpecialty, (err, data) => {
        
        // if error occurs
        if(err) {
            return res.status(400).send("Failed to fetch: ", err)
        }

        // if no error
        res.status(200).send(data)
    })
});


// basic end point to say Hello World
app.get('', (req, res) => {
    res.send("Hello World. This is sweet. Let's start coding.")
});





// start listening to server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});