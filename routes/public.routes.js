var express = require("express");
const path = require("path");
var router = express.Router();

/* GESTIONE ROUTING REACT E VARI REFRESH RICHIESTI DAL BROWSER */
// router.get(
//   "/gestione-progetti",
//   ensureAuthenticated,
//   function (req, res, next) {
//     /* tutto quello che sta sul path /users non è di react */
//     /*   res.header("Pragma", "no-cache");
//   res.header("Expires", -1);
//   res.header('Cache-Control', "private, no-cache, no-store, must-revalidate"); */
//     res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
//       if (err) {
//         console.log("INDEX.HTML NOT FOUND ERROR!");
//         res.status(500).send(err);
//       }
//     });
//   }
// );

const testResponse = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

router.get("/test-api-table", function (req, res, next) {
  /* tutto quello che sta sul path /users non è di react */
  /*   res.header("Pragma", "no-cache");
  res.header("Expires", -1);
  res.header('Cache-Control', "private, no-cache, no-store, must-revalidate"); */
  res.status(200).send(testResponse);
});

module.exports = router;
