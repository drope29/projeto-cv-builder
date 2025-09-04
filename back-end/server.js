const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

app.use(express.json());

const cors = require('cors');
app.use(cors());

const CURRICULOS_FILE = './curriculos.json';

const readCurriculos = () => {
    if (!fs.existsSync(CURRICULOS_FILE)) {
        return [];
    }
    const dados = fs.readFileSync(CURRICULOS_FILE, 'utf-8');
    return JSON.parse(dados);
};

const writeCurriculos = (dados) => {
    fs.writeFileSync(CURRICULOS_FILE, JSON.stringify(dados, null, 2));
};

app.get('/', (req, res) => {
    res.send("Servidor rodando...");
});

app.get('/curriculos', (req, res) => {
    try {
        const curriculos = readCurriculos();
        res.json(curriculos);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao ler currículos' });
    }
});

app.get('/curriculos/recentes', (req, res) => {
    try {
        const curriculos = readCurriculos();
        const recentes = curriculos
            .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
            .slice(0, 5);

        res.json(recentes);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar currículos recentes' });
    }
});

app.get('/curriculos/:id', (req, res) => {
    try {
        const curriculos = readCurriculos();
        const id = req.params.id;
        const curriculo = curriculos.find(c => c.id === id);

        if (!curriculo) {
            return res.status(404).json({ error: 'Currículo não encontrado' });
        }

        res.json(curriculo);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar currículo' });
    }
});

app.post('/curriculos', (req, res) => {
    try {
        const curriculos = readCurriculos();
        const novo = req.body;

    
        const id = Date.now().toString();

    
        if (!novo.nomeCompleto || !novo.email) {
            return res.status(400).json({ error: 'Nome completo e email são obrigatórios' });
        }

    
        const curriculoCompleto = {
            id,
            criadoEm: new Date().toISOString(),
            ...novo
        };

        curriculos.unshift(curriculoCompleto);
        writeCurriculos(curriculos);

        res.status(201).json(curriculoCompleto);
    } catch (err) {
        res.status(500).json({ error: `Erro ao salvar currículo ${err}` });
    }
});

app.put('/curriculos/:id', (req, res) => {
    try {
        const curriculos = readCurriculos();
        const id = req.params.id;
        const index = curriculos.findIndex(c => c.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Currículo não encontrado' });
        }

    
        const curriculoAtualizado = {
            ...curriculos[index],
            ...req.body,
            id,
            criadoEm: curriculos[index].criadoEm
        };

        curriculos[index] = curriculoAtualizado;
        writeCurriculos(curriculos);

        res.json(curriculoAtualizado);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar currículo' });
    }
});

app.delete('/curriculos/:id', (req, res) => {
    try {
        const curriculos = readCurriculos();
        const id = req.params.id;
        const index = curriculos.findIndex(c => c.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Currículo não encontrado' });
        }

        const curriculoRemovido = curriculos.splice(index, 1);
        writeCurriculos(curriculos);

        res.json({ message: 'Currículo removido com sucesso', curriculo: curriculoRemovido[0] });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao remover currículo' });
    }
});

app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}/`);
});