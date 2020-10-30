const Template = {
  Query: {
    findOneTemplate: (_parent, args, { prisma }) => {
      return prisma.template.findOne(args)
    },
    findFirstTemplate: (_parent, args, { prisma }) => {
      return prisma.template.findFirst(args)
    },
    findManyTemplate: (_parent, args, { prisma }) => {
      return prisma.template.findMany(args)
    },
    findManyTemplateCount: (_parent, args, { prisma }) => {
      return prisma.template.count(args)
    },
    aggregateTemplate: (_parent, args, { prisma }) => {
      return prisma.template.aggregate(args)
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
