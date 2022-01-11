const faker = require("faker");
const puppeteer = require("puppeteer");
import "regenerator-runtime/runtime";

const person = {
  name: faker.name.firstName() + " " + faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words(),
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
    slowMo: 250, // how slow actions should be
  });
  // creates a new page in the opened browser
  page = await browser.newPage();
});

describe("Modifica Domanda", () => {
  test("Utente può modificare una domanda in lavorazione", async () => {
    await page.goto(routes.public.home);
    await page.waitForSelector('[data-row-key="0_inLavorazione"]'); //deve esserci almeno una riga

    await page.hover('[data-menu-icon-key="menu-inLavorazione-icon-row-0"]'); // apri il menu
    await page.click('[data-menu-modify-key="modify-inLavorazione-0"]'); // clicca sul modifica

    await page.waitForSelector(".ant-tabs");
    const url = await page.url();
    expect(url).toBe(routes.public.nuovaDomanda); // controllo che ha fatto il redirect
    await page.waitForSelector('[data-link="link-home"]');

    /*     await page.type("input[name=fullname]", person.name);
    await page.click("input[name=email]");
    await page.type("input[name=email]", person.email);
    await page.click("textarea[name=message]");
    await page.type("textarea[name=message]", person.message);
    await page.click("input[type=checkbox]");

    await page.click("input[name=question]");

    await page.click("button[type=submit]"); */
  }, 1600000);
});

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
  browser.close();
});
