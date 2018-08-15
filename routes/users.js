var express = require('express');
var router = express.Router();
let { buildSchema } = require('graphql');

let schema = buildSchema(`
  type Query {
    getLebron: lebron
  }

  type lebron{
    name: String
    team: String
  }
`);

let root = {
  getLebron: {
    title: "reasons why lebron is better than jordan",
    credibleNewsSource: "https://www.forbes.com/sites/leighsteinberg/2018/05/31/5-reasons-why-lebron-is-the-greatest-of-all-time/"
  }
};

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
