// index.js
import express from "express";
import pool from "./config/database.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Proyecto Backend Grupo 25 Codo a Codo");
});

app.get('/Clientes', async (req, res) => {
  const sql = `
    SELECT 
      Clientes.Nombre_cliente, Clientes.Correo_cliente, Clientes.Nacimiento_cliente,
      Evaluacion.Testimonio AS Testimonio
    FROM 
      Clientes
    JOIN 
      Evaluacion ON Clientes.ID_cliente = Evaluacion.ID_cliente 
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

app.get('/Clientes/:id',async (req, res) => {
  // Implementa la lógica para obtener un cliente por ID
  const id= req.params.id;
  const sql = ` SELECT * FROM Clientes WHERE ID_cliente = ?`;
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

app.post('/Clientes', async (req, res) => {

  const cliente = req.body;

  const sql =`INSERT INTO Clientes SET ?`;

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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
