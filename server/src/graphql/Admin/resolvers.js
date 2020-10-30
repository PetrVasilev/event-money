const Admin = {
  Query: {
    findOneAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findOne(args)
    },
    findFirstAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findFirst(args)
    },
    findManyAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findMany(args)
    },
    findManyAdminCount: (_parent, args, { prisma }) => {
      return prisma.admin.count(args)
    },
    aggregateAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.aggregate(args)
    },
  },
  Mutation: {
    createOneAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.create(args)
    },
    updateOneAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.update(args)
    },
    deleteOneAdmin: async (_parent, args, { prisma }) => {
      return prisma.admin.delete(args)
    },
  },
}

module.exports = {
  Admin,
}
