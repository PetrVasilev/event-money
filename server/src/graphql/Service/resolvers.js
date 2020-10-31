const Service = {
  Query: {
    findManyService: (_parent, args, { prisma }) => {
      return prisma.service.findMany(args)
    },
    findManyServiceCount: (_parent, args, { prisma }) => {
      return prisma.service.count(args)
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
