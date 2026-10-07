require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro na consulta:', err);
    res.status(500).json({ error: 'Erro ao conectar ao banco de dados', detalhe: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('API do OZ Anúncios a rodar com sucesso!');
});
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});