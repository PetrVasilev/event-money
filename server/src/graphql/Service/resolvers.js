const Service = {
  Query: {
    findManyService: async (_parent, args, { prisma, access }) => {
      await access.or('user', 'admin')
      return prisma.service.findMany(args)
    },
    findManyServiceCount: async (_parent, args, { prisma, access }) => {
      await access.or('user', 'admin')
      return prisma.service.count(args)
    },
  },
  Mutation: {
    createOneService: async (_parent, args, { prisma, access }) => {
      await access.or('user', 'admin')
      return prisma.service.create(args)
    },
    updateOneService: async (_parent, args, { prisma, access }) => {
      await access.or('user', 'admin')
      return prisma.service.update(args)
    },
    deleteOneService: async (_parent, args, { prisma, access }) => {
      await access.or('user', 'admin')
      return prisma.service.delete(args)
    },
  },
}

module.exports = {
  Service,
}
