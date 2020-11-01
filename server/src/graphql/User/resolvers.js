const User = {
    Query: {
        findManyUser: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.user.findMany(args)
        },
        findManyUserCount: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.user.count(args)
        }
    },
    Mutation: {
        createOneUser: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.user.create(args)
        },
        updateOneUser: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.user.update(args)
        },
        deleteOneUser: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.user.delete(args)
        }
    }
}

module.exports = {
    User
}
