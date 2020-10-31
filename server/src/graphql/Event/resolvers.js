const Event = {
  Query: {
    findManyEvent: (_parent, args, { prisma }) => {
      return prisma.event.findMany(args)
    },
    findManyEventCount: (_parent, args, { prisma }) => {
      return prisma.event.count(args)
    }
  },
  Mutation: {
    createOneEvent: (_parent, args, { prisma }) => {
      return prisma.event.create(args)
    },
    updateOneEvent: (_parent, args, { prisma }) => {
      return prisma.event.update(args)
    },
    deleteOneEvent: async (_parent, args, { prisma }) => {
      return prisma.event.delete(args)
    },
  },
}

module.exports = {
  Event,
}
