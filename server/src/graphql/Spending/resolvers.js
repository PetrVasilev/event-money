const Spending = {
  Query: {
    findManySpending: (_parent, args, { prisma }) => {
      return prisma.spending.findMany(args)
    },
    findManySpendingCount: (_parent, args, { prisma }) => {
      return prisma.spending.count(args)
    },
  },
  Mutation: {
    createOneSpending: (_parent, args, { prisma }) => {
      return prisma.spending.create(args)
    },
    updateOneSpending: (_parent, args, { prisma }) => {
      return prisma.spending.update(args)
    },
    deleteOneSpending: async (_parent, args, { prisma }) => {
      return prisma.spending.delete(args)
    },
  },
}

module.exports = {
  Spending,
}
