
const express = require("express");
const app = express();

app.use(express.static("public"));

app.use(express.json());

//app.use('/', require ('     '));

app.get("/", (req, res) => {
  res.send("Proyecto Backend Grupo 25 Codo a Codo");
});
app.get('/clientes',(req,res)=>{

});
app.get('/clientes/:id',(req,res)=>{

});
//
app.post('/clientes',(req,res)=>{
    res.send('Resource created');
});
const PORT = 3000;

app.listen(PORT, () => console.log(`${PORT}`));