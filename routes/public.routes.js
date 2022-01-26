var express = require("express");
const path = require("path");
var router = express.Router();
var chance = require("chance");

router.get("/test-api-table", function (req, res, next) {
  /* tutto quello che sta sul path /users non è di react */
  /*   res.header("Pragma", "no-cache");
  res.header("Expires", -1);
  res.header('Cache-Control', "private, no-cache, no-store, must-revalidate"); */
  res.status(200).send(getArrayOfPersons());
});

module.exports = router;

function getArrayOfPersons(num = 15) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(new RandomPerson());
  }
  return arr;
}

function RandomPerson() {
  let Chance = new chance();
  return {
    key: Chance.guid(),
    name: Chance.name(),
    age: Chance.age(),
    address: Chance.address(),
  };
}
