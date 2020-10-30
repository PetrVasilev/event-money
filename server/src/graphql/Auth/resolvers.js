const Auth = {
  Query: {
    admin: (_parent, args, { prisma }) => {
      return prisma.admin.findFirst(args)
    },
    user: async (_parent, args, { prisma, access }) => {
      if (!args.where) {
        const userId = await access.user()
        if(userId) {
          args.where = {
            id: userId
          }
        }
      }
      const exist = await prisma.user.findOne(args)
      if (exist) {
        return exist
      }
      return prisma.user.create({
        data: {
          id: args.where.id
        }
      })
    },
  },
  Mutation: {
    signInAdmin: async (_parent, { data: { login, password } }, { prisma, response }) => {
      const exist = await prisma.admin.findOne({
        where: {
          login
        }
      })
      if (!exist) throw new Error('not exist')
      const compare = bcrypt.compareSync(password, exist.password)
      if (!compare) throw new Error('password incorrect')
      const token = jwt.sign({ id: exist.id }, process.env.ADMIN_ACCESS_TOKEN_SECRET)
      return token
    },
  },
}

module.exports = {
  Auth,
}
