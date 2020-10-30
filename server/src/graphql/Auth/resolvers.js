const Auth = {
  Query: {
    admin: (_parent, args, { prisma }) => {
      return prisma.admin.findFirst(args)
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
