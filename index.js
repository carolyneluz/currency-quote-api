const express = require('express');
const app = express();

const simulatedRates = {
  "USD-BRL": 5.25,
  "EUR-BRL": 5.62,
  "BTC-USD": 67180.50,
};

app.get('/pairs', (req, res) => {
  const availablePairs = Object.keys(simulatedRates);
  res.status(200).json({
    available_pairs: availablePairs
  });
});

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

module.exports = { app, server };