const Event = {
    Query: {
        findManyEvent: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.event.findMany(args)
        },
        findManyEventCount: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.event.count(args)
        }
    },
    Mutation: {
        createOneEvent: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.event.create(args)
        },
        updateOneEvent: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.event.update(args)
        },
        deleteOneEvent: async (_parent, args, { prisma, access }) => {
            await access.or('user', 'admin')
            return prisma.event.delete(args)
        }
    }
}

module.exports = {
    Event
}
