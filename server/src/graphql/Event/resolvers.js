const Event = {
  Query: {
    findOneEvent: (_parent, args, { prisma }) => {
      return prisma.event.findOne(args)
    },
    findFirstEvent: (_parent, args, { prisma }) => {
      return prisma.event.findFirst(args)
    },
    findManyEvent: (_parent, args, { prisma }) => {
      return prisma.event.findMany(args)
    },
    findManyEventCount: (_parent, args, { prisma }) => {
      return prisma.event.count(args)
    },
    aggregateEvent: (_parent, args, { prisma }) => {
      return prisma.event.aggregate(args)
    },
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
