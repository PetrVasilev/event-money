const Service = {
  Query: {
    findOneService: (_parent, args, { prisma }) => {
      return prisma.service.findOne(args)
    },
    findFirstService: (_parent, args, { prisma }) => {
      return prisma.service.findFirst(args)
    },
    findManyService: (_parent, args, { prisma }) => {
      return prisma.service.findMany(args)
    },
    findManyServiceCount: (_parent, args, { prisma }) => {
      return prisma.service.count(args)
    },
    aggregateService: (_parent, args, { prisma }) => {
      return prisma.service.aggregate(args)
    },
  },
  Mutation: {
    createOneService: (_parent, args, { prisma }) => {
      return prisma.service.create(args)
    },
    updateOneService: (_parent, args, { prisma }) => {
      return prisma.service.update(args)
    },
    deleteOneService: async (_parent, args, { prisma }) => {
      return prisma.service.delete(args)
    },
  },
}

module.exports = {
  Service,
}
