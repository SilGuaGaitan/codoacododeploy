import express from "express";
import pool from "./config/database.js";

//const express = require("express");
const app = express();

app.use(express.static("public"));

app.use(express.json());

//app.use('/', require ('     '));

app.get("/", (req, res) => {
  res.send("Proyecto Backend Grupo 25 Codo a Codo");
});
app.get('/Consulta_cliente', async(req,res)=>{
  const sql= `SELECT Consulta_cliente.ID_consulta, Consulta_cliente.Motivo_consulta,
            
                FROM Consulta_cliente
                JOIN Clientes ON Consulta_cliente.ID_Cliente= Clientes.ID_cliente
                
                ORDER By Clientes.Nombre_cliente `;
                try {
                  // Obtiene una conexión del pool de conexiones a la base de datos
                  const connection = await pool.getConnection();
          
                  // Ejecuta la consulta SQL y obtiene los resultados
                  const [rows] = await connection.query(sql);
          
                  // Libera la conexión para que pueda ser reutilizada por otros clientes
                  connection.release();
          
                  // Envia la respuesta al cliente en formato JSON con los resultados obtenidos
                  res.json(rows);
              } catch (error) {
                  // Maneja los errores y envia una respuesta de error 500 (Internal Server Error)
                  res.status(500).send('Internal server error');
              }
          });
app.get('/clientes/:id',(req,res)=>{

});
//
app.post('/clientes',(req,res)=>{
    res.send('Resource created');
});
const PORT = 3000;

app.listen(PORT, () => console.log(`${PORT}`));