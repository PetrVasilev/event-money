const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Auth = {
  Query: {
    admin: async (_parent, args, { prisma, access }) => {
      const { id } = await access.admin()
      args.where = {
        id
      }
      return prisma.admin.findOne(args)
    },
    user: async (_parent, args, { prisma, access }) => {
      if (!args.where) {
        const userId = await access.user()
        if (userId) {
          args.where = {
            id: userId
          }
        }
      }
      const exist = await prisma.user.findOne({ where: args.where, select: args.select })
      if (exist) {
        if (!exist.name) {
          await prisma.user.update({
            where: args.where,
            data: args.data
          })
        }
        return exist
      }
      return prisma.user.create({
        data: {
          id: args.where.id,
          ...args.data
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
      return {
        token,
        admin: exist
      }
    },
    addUsers: async (_parent, { data: { users }, where }, { prisma, access }) => {
      const ids = users.map(obj => obj.id)

      const exists = await prisma.user.findMany({
        where: {
          id: {
            in: ids
          }
        }
      })

      if (exists && exists.length > 0) {
        const connect = exists.map(obj => ({
          id: obj.id
        }))
        await prisma.event.update({
          where,
          data: {
            users: {
              connect
            }
          }
        })
      }

      const create = users.filter(obj => !exists.find(exist => exist.id === obj))

      if(create && create.length > 0) {
        await prisma.event.update({
          where,
          data: {
            users: {
              create
            }
          }
        })
      }
      return prisma.event.findOne({where}).users()
    },
  },
}

module.exports = {
  Auth,
}
