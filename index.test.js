const request = require('supertest');
const { app, server } = require('./index');

describe('API Endpoints', () => {

  // Fecha o servidor após todos os testes
  afterAll(done => {
    server.close(done);
  });

  // Teste 1: Verifica se o endpoint /pairs retorna as cotações disponíveis
  test('GET /pairs should return a list of available pairs', async () => {
    const res = await request(app).get('/pairs');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('available_pairs');
    expect(res.body.available_pairs).toEqual(["USD-BRL", "EUR-BRL", "BTC-USD"]);
  });

  // Teste 2: Verifica se o endpoint /quote/:pair retorna a cotação correta para USD-BRL
  test('GET /quote/:pair should return the correct rate for a valid pair', async () => {
    const res = await request(app).get('/quote/USD-BRL');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pair', 'USD-BRL');
    expect(res.body).toHaveProperty('rate');
    expect(res.body.rate).toBe(5.25);
  });

  // Teste 3: Verifica se o endpoint /quote/:pair retorna a cotação correta para EUR-BRL
  test('GET /quote/:pair should return the correct rate for EUR-BRL', async () => {
    const res = await request(app).get('/quote/EUR-BRL');
    expect(res.statusCode).toBe(200);
    expect(res.body.pair).toBe('EUR-BRL');
    expect(res.body.rate).toBe(5.62);
  });

  // Teste 4: Verifica se o endpoint /quote/:pair retorna 404 para um par inválido
  test('GET /quote/:pair should return 404 for an invalid pair', async () => {
    const res = await request(app).get('/quote/INVALID-PAIR');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', "Cotação para o par 'INVALID-PAIR' não encontrada.");
  });

  // Teste 5: Verifica se o endpoint /quote/:pair lida com um parâmetro vazio
  test('GET /quote/:pair should return 404 for an empty pair parameter', async () => {
    const res = await request(app).get('/quote/');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /quote/:pair should return the correct rate for BTC-USD', async () => {
    const res = await request(app).get('/quote/BTC-USD');
    expect(res.statusCode).toBe(200);
    expect(res.body.pair).toBe('BTC-USD');
    expect(res.body.rate).toBe(67180.50);
  });
});
