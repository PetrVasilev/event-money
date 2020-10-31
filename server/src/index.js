const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const express = require('express')

const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const { PrismaSelect } = require('@paljs/plugins')

const { typeDefs } = require('./graphql/typeDefs')
const { resolvers } = require('./graphql/resolvers')
const { checkRole } = require('./utils/auth')

dotenv.config()

const prisma = new PrismaClient()

const middleware = async (resolve, root, args, context, info) => {
    const result = new PrismaSelect(info).value
    if (Object.keys(result.select).length > 0) {
        args = {
            ...args,
            ...result
        }
    }
    return resolve(root, args, context, info)
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: ({ request, response }) => {
        const { authorization, id } = request.headers
        const access = {
            admin: () => checkRole(authorization, 'admin'),
            user: () => {
                if (id) {
                    return id
                } else {
                    throw new Error('not access')
                }
            },
            or: async (...roles) => {
                const checks = await Promise.all(roles.map(async role => {
                    if (id) {
                        return id
                    }
                    const cheking = await checkRole(authorization, role, false)
                    return cheking
                }))
                const find = checks.find(object => object)
                if (find) {
                    return find
                } else {
                    throw new Error('Not access')
                }
            }
        }
        return {
            request,
            response,
            prisma,
            access
        }
    },
    middlewares: [middleware]
})

server.express.use('/uploads', express.static(__dirname + '/../../uploads'))

server.start(
    {
        port: process.env.PORT,
        endpoint: '/graphql',
        playground: '/playground',
    },
    async ({ port }) => {
        console.log(`Server ready at: http://localhost:${port}`)
        const [adminsCount] = await Promise.all([prisma.admin.count()])
        if (adminsCount === 0) {
            const password = await bcrypt.hash('eventmoney', 10)
            await prisma.admin.create({
                data: {
                    login: 'admin',
                    password
                }
            })
        }
    }
)
