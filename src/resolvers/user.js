const User = require('../models')
const { UserInputError } = require('apollo-server-express');
const mongoose = require('mongoose');

module.exports = {
  Query: {
    users: (root, args, context, info) => {
      return User.find({})
    },
    user: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(args.id)){
        throw new UserInputError(`${id} not valid ID`)
      }
      
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      return User.create(args)
    }
  }
}