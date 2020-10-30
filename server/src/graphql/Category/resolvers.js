const Category = {
  Query: {
    findOneCategory: (_parent, args, { prisma }) => {
      return prisma.category.findOne(args)
    },
    findFirstCategory: (_parent, args, { prisma }) => {
      return prisma.category.findFirst(args)
    },
    findManyCategory: (_parent, args, { prisma }) => {
      return prisma.category.findMany(args)
    },
    findManyCategoryCount: (_parent, args, { prisma }) => {
      return prisma.category.count(args)
    },
    aggregateCategory: (_parent, args, { prisma }) => {
      return prisma.category.aggregate(args)
    },
  },
  Mutation: {
    createOneCategory: (_parent, args, { prisma }) => {
      return prisma.category.create(args)
    },
    updateOneCategory: (_parent, args, { prisma }) => {
      return prisma.category.update(args)
    },
    deleteOneCategory: async (_parent, args, { prisma }) => {
      return prisma.category.delete(args)
    },
  },
}

module.exports = {
  Category,
}
