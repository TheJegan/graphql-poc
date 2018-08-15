let express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');
let port = 4123

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    getLebron: lebron
  }

  type lebron{
    name: String
    team: String
  }
`);





// The root provides a resolver function for each API endpoint
let root = {
  getLebron: {
    title: "reasons why lebron is better than jordan",
    credibleNewsSource: "https://www.forbes.com/sites/leighsteinberg/2018/05/31/5-reasons-why-lebron-is-the-greatest-of-all-time/"
  }
};

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.use('/', function(req,res,next){
	res.send('server running');
});
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
