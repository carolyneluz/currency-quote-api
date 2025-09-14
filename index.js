const express = require('express');
const app = express();

// Nossos dados simulados
const simulatedRates = {
  "USD-BRL": 5.25,
  "EUR-BRL": 5.62,
  "BTC-USD": 67180.50,
};

// Endpoint para buscar uma cotação. Ex: /quote/USD-BRL
app.get('/quote/:pair', (req, res) => {
  const { pair } = req.params;
  const rate = simulatedRates[pair];

  if (rate) {
    res.status(200).json({ pair, rate });
  } else {
    res.status(404).json({ error: `Cotação para o par '${pair}' não encontrada.` });
  }
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Exportamos para usar nos testes da próxima semana
module.exports = { app, server };