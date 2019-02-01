const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

mongoose.connect(
  'mongodb://127.0.0.1:27017/users',
  { useNewUrlParser: true }
);

const {
  APP_PORT = 80,
  NODE_ENV = 'development'
} = process.env

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: NODE_ENV == 'development'
});

server.applyMiddleware({ app });

app.listen({ port: APP_PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)