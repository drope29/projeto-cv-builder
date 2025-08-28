const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Servidor rodando...")
});

app.listen(port, () => {
    console.log(`Aplicação rodando em http:localhost:${port}/`)
})