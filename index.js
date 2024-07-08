// index.js
import express from "express";
import pool from "./config/database.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Proyecto Backend Grupo 25 Codo a Codo");
});



/*CRUD Aclaracion:
Tener en cuenta las restricciones en las relaciones de las tablas, y seguir
el orden correcto para crear y borrar los clientes, las evaluaciones y las consultas!!!*/


/*Peticion GET para traer a todos los clientes con su motivo de consulta, servicio 
 solicitado y su testimonio:*/
app.get('/Clientes', async (req, res) => {
  const sql = `
    SELECT 
    Clientes.Nombre_cliente,
    Consulta_cliente.Motivo_consulta AS Motivo_Consulta,
    Servicios.Nombre_servicio AS Servicio_Solicitado,
    Evaluacion.Testimonio AS Testimonio
    FROM 
    Consulta_cliente
    JOIN 
    Clientes ON Consulta_cliente.ID_Cliente = Clientes.ID_cliente
    JOIN 
    Servicios ON Consulta_cliente.ID_Servicio = Servicios.ID_servicio
    JOIN 
    Evaluacion ON Consulta_cliente.ID_Evaluacion = Evaluacion.ID_evaluacion
    ORDER BY 
    Clientes.Nombre_cliente`;

   try {
    console.log("Connecting to database...");
    const connection = await pool.getConnection();
    console.log("Database connection established.");
    
    console.log("Executing query...");
    const [rows] = await connection.query(sql);
    console.log("Query executed successfully.");
    
    connection.release();
    console.log("Connection released.");

    res.json(rows);
   } catch (error) {
    console.error("Error during database operation:", error);
    res.status(500).send('Internal server error');
  }
});

// Petición GET para traer a un cliente en particular por ID:
app.get('/Clientes/:id',async (req, res) => {
 
  const id= req.params.id
  const sql = ` SELECT * FROM Clientes WHERE ID_cliente= ?`;

  try {
    
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [id]);
    connection.release();
    console.log("Connection released.");

    res.json(rows[0]);
  } catch (error) {
    console.error("Error during database operation:", error);
    res.status(500).send('Internal server error');
  }
});

// Peticion POST para crear un cliente
app.post('/Clientes', async (req, res) => {

  const cliente = req.body;

  const sql = `INSERT INTO Clientes SET ?`; 

  try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query(sql, [cliente]);
      connection.release();
      res.send(`
          <h1>Cliente creado con id: ${rows.insertId}</h1>
      `);
  } catch (error) {
      res.send(500).send('Internal server error')
  }
});

// Petición PUT para modificar un cliente
app.put('/Clientes/:id', async (req, res) => {
  const id = req.params.id;
  const cliente = req.body;

  const sql = `UPDATE Clientes SET ? WHERE ID_Cliente = ?`; 

  try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query(sql, [cliente, id]);
      connection.release();
      console.log(rows)
       res.send(`
          <h1>Cliente actualizado id: ${id}</h1>
      `);
  } catch (error) {
      res.send(500).send('Internal server error')
  }

});

// Peticion DELETE para borrar un cliente:
app.delete('/Clientes/:id', async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM Clientes WHERE ID_Cliente = ?`;

   try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query(sql, [id]);
      connection.release();
      console.log(rows)
       res.send(`
          <h1>Cliente borrado id: ${id}</h1>
      `);
  } catch (error) {
      res.send(500).send('Internal server error')
  }
});

//Peticion POST para crar una EVALUACION
app.post('/Evaluacion', async (req, res) => {

  const evaluacion = req.body;

  const sql = `INSERT INTO Evaluacion SET ?`; 

  try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query(sql, [evaluacion]);
      connection.release();
      res.send(`
          <h1>Evaluacion creada con id: ${rows.insertId}</h1>
      `);
  } catch (error) {
      res.send(500).send('Internal server error')
      
  }
});

// Peticion DELETE para borrar una EVALUACION
app.delete('/Evaluacion/:id', async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM Evaluacion WHERE ID_Cliente = ?`;

   try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query(sql, [id]);
      connection.release();
      console.log(rows)
       res.send(`
          <h1>Evaluacion borrada id: ${id}</h1>
      `);
  } catch (error) {
      res.send(500).send('Internal server error')
  }
});


// Peticion POST para crear una CONSULTA
app.post('/Consulta_cliente', async (req, res) => {

  const consulta = req.body;

  const sql = `INSERT INTO Consulta_cliente SET ?`; 

  try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query(sql, [consulta]);
      connection.release();
      res.send(`
          <h1>Consulta creada con id: ${rows.insertId}</h1>
      `);
  } catch (error) {
      res.send(500).send('Internal server error')
  }
});

// Petición GET para traer a una CONSULTA en particular por ID
app.get('/Consulta_cliente/:id',async (req, res) => {
 
  const id= req.params.id
  const sql = ` SELECT * FROM Consulta_cliente WHERE ID_consulta= ?`;

  try {
    
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [id]);
    connection.release();
    console.log("Connection released.");

    res.json(rows[0]);
  } catch (error) {
    console.error("Error during database operation:", error);
    res.status(500).send('Internal server error');
  }
});

// Petición PUT para modificar una CONSULTA
app.put('/Consulta_cliente/:id', async (req, res) => {
  const id = req.params.id;
  const consulta = req.body;

  const sql = `UPDATE Consulta_cliente SET ? WHERE ID_consulta = ?`;

  try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query(sql, [consulta, id]);
      connection.release();
      console.log(rows)
       res.send(`
          <h1>Consulta actualizada id: ${id}</h1>
      `);
  } catch (error) {
      res.send(500).send('Internal server error')
  }

});

// Peticion DELETE para borrar una Consulta
app.delete('/Consulta_cliente/:id', async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM Consulta_cliente WHERE ID_consulta = ?`;

   try {
      const connection = await pool.getConnection()
      const [rows] = await connection.query(sql, [id]);
      connection.release();
      console.log(rows)
       res.send(`
          <h1>Consulta borrada id: ${id}</h1>
      `);
  } catch (error) {
      res.send(500).send('Internal server error')
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
