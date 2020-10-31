const User = {
  Query: {
    findManyUser: (_parent, args, { prisma }) => {
      return prisma.user.findMany(args)
    },
    findManyUserCount: (_parent, args, { prisma }) => {
      return prisma.user.count(args)
    },
  },
  Mutation: {
    createOneUser: (_parent, args, { prisma }) => {
      return prisma.user.create(args)
    },
    updateOneUser: (_parent, args, { prisma }) => {
      return prisma.user.update(args)
    },
    deleteOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.delete(args)
    },
  },
}

module.exports = {
  User,
}
