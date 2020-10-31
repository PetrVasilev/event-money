const Template = {
  Query: {
    findManyTemplate: (_parent, args, { prisma }) => {
      return prisma.template.findMany(args)
    },
    findManyTemplateCount: (_parent, args, { prisma }) => {
      return prisma.template.count(args)
    },
  },
  Mutation: {
    createOneTemplate: (_parent, args, { prisma }) => {
      return prisma.template.create(args)
    },
    updateOneTemplate: (_parent, args, { prisma }) => {
      return prisma.template.update(args)
    },
    deleteOneTemplate: async (_parent, args, { prisma }) => {
      return prisma.template.delete(args)
    },
  },
}

module.exports = {
  Template,
}
