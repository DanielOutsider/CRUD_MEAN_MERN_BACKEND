// import express from 'express'  // es lo mismo que abajo
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')

require('dotenv').config();

//crea el servidor en express
const app = express();

// base de datos
dbConnection();

// configuramos CORS
// USE = se usa para definir  un middleware
app.use( cors() );


// rutas
app.get('/',(req, res) =>{
    res.json({
        ok: true,
        msg: 'hola mundo'
    })
});

// selecciono el puerto en el q va a correr
app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en el puerto' + process.env.PORT);
});