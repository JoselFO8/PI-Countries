const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

const country = {  
  name: "Republic de Prueba",
  id: "ZYZ",
  flag: "https://flagcdn.com/999/888.png",
  continent: "Desconocido",
  capital: "Desconocida",
  Sub_region: "infinito",
  area: 10,
  population: 1    
}

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators:', () => {
    beforeEach(() => Country.sync({ force: true }));

    describe('name', () => {
      it('Should throw an error if name is null', (done) => {
        Country.create({
          id: "ZYZ",
          flag: "https://flagcdn.com/999/888.png",
          continent: "Desconocido",
          capital: "Desconocida",
          Sub_region: "infinito",
          area: 10,
          population: 1 
        })
        .then(() => done())
        .catch((error) => {
            // console.log("VALIDACION",error.message)
            expect(error.message).to.be.match(/Country.name cannot be null/)
            done()
          });
      });

      it('Should work when its a valid name', async () => {
        const response = await Country.create(country);
        expect(response.toJSON()).to.have.property('name', response.name);
      });
    });

    describe('id', () => {
      it('Should throw an error if id is null', (done) => {
        Country.create({})
        .then(() => done())
        .catch((error) => {
            expect(error.message).to.be.match(/Country.id cannot be null/)
            done()
          });
      });

      it('Should work when its a valid id', async () => {
        const response = await Country.create(country);
        let result = response.toJSON()
        expect(result.id).to.eql('ZYZ')
      });
    });

    describe('flag', () => {
      it('Should throw an error if flag is null', (done) => {
        Country.create({})
        .then(() => done())
        .catch((error) => {
            expect(error.message).to.be.match(/Country.flag cannot be null/)
            done()
          });
      });

      it('Should work when its a valid flag', async () => {
        const response = await Country.create(country);
        expect(response.toJSON()).to.have.property('flag', response.flag);
      });
    });

    describe('continent', () => {
      it('Should throw an error if continent is null', (done) => {
        Country.create({})
        .then(() => done())
        .catch((error) => {
            expect(error.message).to.be.match(/Country.continent cannot be null/)
            done()
          });
      });

      it('Should work when its a valid continent', async () => {
        const response = await Country.create(country);
        expect(response.toJSON()).to.have.property('continent', response.continent);
      });
    });

    describe('capital', () => {
      it('Should throw an error if capital is null', (done) => {
        Country.create({})
        .then(() => done())
        .catch((error) => {
            expect(error.message).to.be.match(/Country.capital cannot be null/)
            done()
          });
      });

      it('Should work when its a valid capital', async () => {
        const response = await Country.create(country);
        expect(response.toJSON()).to.have.property('capital', response.capital);
      });
    });


    describe('Sub region', () => {
      it('Should work when its a valid sub region', async () => {
        const response = await Country.create(country);
        expect(response.toJSON()).to.have.property('subregion', response.subregion);
      });
    });

    describe('area', () => {
      it('Should throw an error if area is null', (done) => {
        Country.create({})
        .then(() => done())
        .catch((error) => {
            expect(error.message).to.be.match(/Country.area cannot be null/)
            done()
          });
      });

      it('Should work when its a valid area', async () => {
        const response = await Country.create(country);
        expect(response.toJSON()).to.have.property('area', response.area);
      });
    });

    describe('population', () => {
      it('Should throw an error if population is null', (done) => {
        Country.create({})
        .then(() => done())
        .catch((error) => {
            expect(error.message).to.be.match(/Country.population cannot be null/)
            done()
          });
      });

      it('Should work when its a valid population', async () => {
        const response = await Country.create(country);
        expect(response.toJSON()).to.have.property('population', response.population);
      });
    });

  });
});


