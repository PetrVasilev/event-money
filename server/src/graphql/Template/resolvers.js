const Template = {
  Query: {
    findManyTemplate: async (_parent, args, { prisma, access }) => {
      await access.or('user', 'admin')
      return prisma.template.findMany(args)
    },
    findManyTemplateCount: async (_parent, args, { prisma, access }) => {
      await access.or('user', 'admin')
      return prisma.template.count(args)
    },
  },
  Mutation: {
    createOneTemplate: async (_parent, args, { prisma, access }) => {
      await access.or('user', 'admin')
      return prisma.template.create(args)
    },
    updateOneTemplate: async (_parent, args, { prisma, access }) => {
      await access.or('user', 'admin')
      return prisma.template.update(args)
    },
    deleteOneTemplate: async (_parent, args, { prisma, access }) => {
      await access.or('user', 'admin')
      return prisma.template.delete(args)
    },
  },
}

module.exports = {
  Template,
}
