/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {  
  name: "Republic de Prueba",
  id: "ZYZ",
  flag: "https://flagcdn.com/999/888.png",
  continent: "Desconocido",
  capital: "Desconocida",
  Sub_region: "infinito",
  area: 10,
  population: 1    
};

describe('Must return information from all countries when the request is sent', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries', () => {
    it('Should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
});

describe('It should return information of a country, when its id is sent', () => {
  describe('GET /countries/:id', () => {
    it('Must reply with 200 if an id is sent', () =>
      agent.get('/countries/ZYZ').expect(200));
    it('Must respond with 404 if a nonexistent id is sent', () =>
      agent.get('/countries/ZZZ').expect(404));
  });
});
