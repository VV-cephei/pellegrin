const graphql = require('graphql')
const userMongo = require('./userSchema')

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} = graphql

let TODOS = [];

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID},
    taskName: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    todos: {
        type: new GraphQLList(TodoType),
        args: {},
        resolve (parentValue, args) {
            //code to get data from db/other source
          return [
            {
              id: 1,
              taskName: 'Order Pizza',
              completed: true
            },
            {
              id: 2,
              taskName: 'Go to Bank',
              completed: false
            },
            {
              id: 3,
              taskName: 'Buy Milk',
              completed: false
            }
          ]
        }
      }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})