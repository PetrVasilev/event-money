const Category = {
    Query: {
        findManyCategory: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.category.findMany(args)
        },
        findManyCategoryCount: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.category.count(args)
        }
    },
    Mutation: {
        createOneCategory: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            const exist = await prisma.category.findOne({ where: { name: args.data.name } })
            if (exist) throw new Error('exist')
            return prisma.category.create(args)
        },
        updateOneCategory: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.category.update(args)
        },
        deleteOneCategory: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.category.delete(args)
        }
    }
}

module.exports = {
    Category
}
