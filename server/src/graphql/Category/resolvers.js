const Category = {
  Query: {
    findManyCategory: (_parent, args, { prisma }) => {
      return prisma.category.findMany(args)
    },
    findManyCategoryCount: (_parent, args, { prisma }) => {
      return prisma.category.count(args)
    },
  },
  Mutation: {
    createOneCategory: async (_parent, args, { prisma }) => {
      const exist = await prisma.category.findOne({ where: { name: args.data.name } })
      if (exist) throw new Error('exist')
      return prisma.category.create(args)
    },
    updateOneCategory: (_parent, args, { prisma }) => {
      return prisma.category.update(args)
    },
    deleteOneCategory: async (_parent, args, { prisma }) => {
      return prisma.category.delete(args)
    },
  },
}

module.exports = {
  Category,
}
