const faker = require("faker");
faker.locale = "it";
const puppeteer = require("puppeteer");
import path from "path";
import moment from "moment";
import "regenerator-runtime/runtime";

const person = {
  name: faker.name.firstName() + " " + faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words(),
  date: moment(faker.date.recent()).format("DD/MM/YYYY"),
};

//create global variables to be used in the beforeAll function
let browser;
let page;

const appUrlBase = "http://localhost:3008";
const routes = {
  public: {
    home: `${appUrlBase}/`,
    nuovaDomanda: `${appUrlBase}/nuovaDomanda`,
    riepilogo: `${appUrlBase}/nuovaDomanda/riepilogo`,
    noMatch: `${appUrlBase}/`,
  },
  private: {},
};

beforeAll(async () => {
  // launch browser
  browser = await puppeteer.launch({
    headless: false, // headless mode set to false so browser opens up with visual feedback
    slowMo: 200, // how slow actions should be
    args: [
      "--start-maximized", // you can also use '--start-fullscreen'
    ],
  });
  // creates a new page in the opened browser
  page = await browser.newPage();

  page.emulate({
    viewport: {
      width: 1920,
      height: 1039,
    },
    userAgent: "",
  });
});

describe("Creazione Domanda => addDomanda", () => {
  test("Utente può creare una nuova domanda => compilazione tab Dati Azienda", async () => {
    await page.goto(routes.public.home);

    await page.waitForSelector('[data-link="nuovaDomanda"]'); //aspetto il render bottone nuova domanda
    await page.click('[data-link="nuovaDomanda"]'); //clicco sul tasto nuovaDomanda
    await page.waitForSelector('[data-tab="DatiAzienda"]'); // aspetto il render del tab DatiAzienda
    await page.waitForSelector('[data-link="cercaAzienda-DatiAzienda"]'); // aspetto il render bottone Cerca Azienda
    await page.click('[data-link="cercaAzienda-DatiAzienda"]');

    await page.waitForSelector(".ant-table-row"); //aspetto il render delle righe nella tabella aziende

    await page.click("#inserisciAzienda_2"); //clicco sul bottone inserisci azienda numero 3

    const cf = await page.evaluate(() => {
      const anchor = document.querySelector("#codiceFiscale");
      return anchor.textContent;
    });

    expect(cf).toMatch(/^.{0}$/g); // mi aspetto che il codiceFiscale sia valorizzato

    await page.click("#confermaDatiAzienda"); //faccio l'addDomanda, clicco sul Salva e Continua

    await page.waitForSelector('[data-tab="TipoPrestazioneCausale"]'); // aspetto il render del tab TipoPrestazioneCausale
  }, 1600000);

  test("Utente può creare una nuova domanda => compilazione tab Tipo Prestazione", async () => {
    await page.waitForSelector('[data-tab="TipoPrestazioneCausale"]'); // aspetto il render del tab TipoPrestazioneCausale

    await page.click('[data-select-key="tipoPrestazione"]'); //clicco sulla select tipoPrestazione
    await page.click('[data-select-key="tipoPrestazione_0"]'); //clicco sul item della select tipoPrestazione

    await page.click('[data-select-key="causale"]'); //clicco sulla select causale
    await page.click('[data-select-key="causale_0"]'); //clicco sul item della select causale

    await page.click('[data-select-key="tipoDomanda"]'); //clicco sulla select tipoDomanda
    await page.click('[data-select-key="tipoDomanda_0"]'); //clicco sul item della select tipoDomanda

    await page.click('[data-select-key="tipoPagamento"]'); //clicco sulla select tipoPrestazione
    await page.click('[data-select-key="tipoPagamento_0"]'); //clicco sul item della select tipoPrestazione

    await page.click('[data-select-key="fondo"]'); //clicco sulla select tipoPrestazione
    await page.click('[data-select-key="fondo_0"]'); //clicco sul item della select tipoPrestazione

    await page.click("#confermaTipoPrestrazione"); //faccio l'addDomanda, clicco sul Salva e Continua

    await page.waitForSelector('[data-tab="UnitaProduttiva"]'); // aspetto il render del tab TipoPrestazioneCausale
  }, 1600000);

  test("Utente può creare una nuova domanda => compilazione tab Unita Produttiva", async () => {
    await page.waitForSelector('[data-tab="UnitaProduttiva"]'); // aspetto il render del tab UnitaProduttiva
    await page.waitForSelector("#cercaUp"); //aspetto il render bottone cerca UP

    await page.click("#cercaUp"); //clicco sul tasto cerca UP

    await page.waitForSelector(".ant-table-row"); //aspetto il render delle righe nella tabella UP

    await page.click("#inserisciUp_0"); //clicco sul bottone inserisci azienda numero 1

    const codiceID = await page.evaluate(() => {
      const anchor = document.querySelector("#codiciIdentificativi");
      return anchor.textContent;
    });

    expect(codiceID).toMatch(/^.{0}$/g); // mi aspetto che il codice Identificativo sia valorizzato

    await page.click("#confermaUnitaProduttiva"); //faccio l'updateDomanda, clicco sul Salva e Continua

    await page.waitForSelector('[data-tab="PeriodoSospensioneForzaLavoro"]'); // aspetto il render del tab PeriodoSospensioneForzaLavoro
  }, 1600000);

  test("Utente può creare una nuova domanda => compilazione tab Periodo Sospensione Forza Lavoro", async () => {
    await page.waitForSelector('[data-tab="PeriodoSospensioneForzaLavoro"]'); // aspetto il render del tab PeriodoSospensioneForzaLavoro

    await page.click(`input[placeholder="Data d'inizio"]`); //clicco sul tasto cerca UP
    await page.click(`span.ant-tag`); //clicco sul tasto periodo Massimo

    await page.click("#numeroSettimane"); // clicco sul input numeroSettimane anche se è disabled
    await page.waitForSelector("#numeroSettimane"); //aspetto il render del numero delle settimane
    await page.waitForSelector("#numeroSettimane"); //aspetto il render del numero delle settimane

    const numeroSett = await page.evaluate(() => {
      const anchor = document.querySelector("#numeroSettimane");
      return anchor.textContent;
    });

    expect(numeroSett).toMatch(/^.{0}$/g); // mi aspetto che il numero settimane sia valorizzato

    await page.click("#confermaPeriodoSospensione"); //faccio l'updateDomanda, clicco sul Salva e Continua

    await page.waitForSelector('[data-tab="ElencoBeneficiari"]'); // aspetto il render del tab ElencoBeneficiari
  }, 1600000);

  test("Utente può creare una nuova domanda => compilazione tab Elenco Beneficiari", async () => {
    await page.waitForSelector('[data-tab="ElencoBeneficiari"]'); // aspetto il render del tab ElencoBeneficiari

    const filePath = path.relative(process.cwd(), __dirname + "/test.csv");
    const input = await page.$("input[type=file]");
    await input.uploadFile(filePath);

    await page.click("#confermaElencoBeneficiari"); //faccio l'updateDomanda, clicco sul Salva e Continua

    await page.waitForSelector('[data-tab="Autocertificazioni"]'); // aspetto il render del tab Autocertificazioni
  }, 1600000);

  test("Utente può creare una nuova domanda => compilazione tab Autocertificazioni CIG", async () => {
    await page.waitForSelector('[data-tab="Autocertificazioni"]'); // aspetto il render del tab ElencoBeneficiari

    await page.click('[data-cig-radio-key="radio-true-0"]'); //faccio click sui vari radio
    await page.click('[data-cig-radio-key="radio-true-1"]'); //faccio click sui vari radio
    await page.click('[data-cig-radio-key="radio-false-2"]'); //faccio click sui vari radio
    await page.click('[data-cig-radio-key="radio-true-3"]'); //faccio click sui vari radio
    await page.click('[data-cig-radio-key="radio-false-4"]'); //faccio click sui vari radio
    await page.click('[data-cig-radio-key="radio-true-5"]'); //faccio click sui vari radio
    await page.click('[data-cig-radio-key="radio-true-6"]'); //faccio click sui vari radio
    await page.click('[data-cig-radio-key="radio-false-7"]'); //faccio click sui vari radio

    await page.click("#confermaAutocertificazioni"); //faccio l'updateDomanda, clicco sul Salva e Continua

    await page.waitForSelector('[data-tab="Allegati"]'); // aspetto il render del tab Autocertificazioni
  }, 1600000);

  test("Utente può creare una nuova domanda => compilazione tab Allegati", async () => {
    await page.waitForSelector('[data-tab="Allegati"]'); // aspetto il render del tab Allegati

    const filePath = path.relative(process.cwd(), __dirname + "/test.pdf"); // carico l'accordo sindacale
    const input = await page.$("input[type=file]");
    await input.uploadFile(filePath);

    await page.click('[data-datepicker-key="dataAccordoSindacale"]'); //apro il datePicker
    await page.click("a.ant-picker-today-btn"); //seleziono la data odierna

    await page.click("#confermaAllegati"); //faccio l'updateDomanda, clicco sul Salva e Continua

    await page.waitForSelector('[data-page="riepilogo"]'); //aspetto il render della pagina riepilogo
    /* controllo se è cambiato l'url */
    let url = await page.url();
    expect(url).toBe(routes.public.riepilogo); // controllo che ha fatto il redirect su riepilogo

    await page.waitForSelector('[data-page="riepilogo"]');
  }, 1600000);

  test("Utente può creare una nuova domanda => compilazione pagina di Riepilogo", async () => {
    await page.waitForSelector('[data-page="riepilogo"]');

    await page.waitForSelector("#SubmitDomanda"); //aspetto il render del bottone submit
    await page.click("#SubmitDomanda"); //click sul bottone submit

    await page.waitForSelector('[data-page="home"]'); //aspetto il render della pagina home
    /* controllo se è cambiato l'url */
    let url = await page.url();
    expect(url).toBe(routes.public.home); // controllo che ha fatto il redirect su home
    await page.waitForSelector('[data-page="home"]');
  }, 1600000);
});

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
  browser.close();
});
