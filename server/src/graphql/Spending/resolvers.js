const Spending = {
    Query: {
        findManySpending: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.spending.findMany(args)
        },
        findManySpendingCount: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.spending.count(args)
        }
    },
    Mutation: {
        createOneSpending: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.spending.create(args)
        },
        updateOneSpending: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.spending.update(args)
        },
        deleteOneSpending: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.spending.delete(args)
        }
    }
}

module.exports = {
    Spending
}
