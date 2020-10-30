const Spending = {
  Query: {
    findOneSpending: (_parent, args, { prisma }) => {
      return prisma.spending.findOne(args)
    },
    findFirstSpending: (_parent, args, { prisma }) => {
      return prisma.spending.findFirst(args)
    },
    findManySpending: (_parent, args, { prisma }) => {
      return prisma.spending.findMany(args)
    },
    findManySpendingCount: (_parent, args, { prisma }) => {
      return prisma.spending.count(args)
    },
    aggregateSpending: (_parent, args, { prisma }) => {
      return prisma.spending.aggregate(args)
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
