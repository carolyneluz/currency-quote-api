const request = require('supertest');
const { app, server } = require('./index');

// Garante que o servidor seja fechado após todos os testes rodarem
afterAll((done) => {
  server.close(done);
});

describe('Currency Quote API Endpoints', () => {

  // Teste 1: Verifica se o endpoint de cotação funciona para um par válido
  it('should return a valid quote for a known pair', async () => {
    const response = await request(app).get('/quote/USD-BRL');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      pair: 'USD-BRL',
      rate: 5.25,
    });
  });

  // Teste 2: Verifica se o endpoint de listar pares funciona
  it('should return a list of available pairs', async () => {
    const response = await request(app).get('/pairs');
    expect(response.statusCode).toBe(200);
    expect(response.body.available_pairs).toContain('USD-BRL');
    expect(response.body.available_pairs).toContain('EUR-BRL');
  });

  // Teste 3: Verifica se a API retorna um erro 404 para um par inválido
  it('should return 404 for an unknown pair', async () => {
    const response = await request(app).get('/quote/XYZ-ABC');
    expect(response.statusCode).toBe(404);
  });

});