let express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');
let port = 4123

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
  hello: () => {
    return 'Hello world!';
  },
};

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
