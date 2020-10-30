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
        const { authorization } = request.headers
        const access = {
            admin: () => checkRole(authorization, 'admin'),
            user: () => checkRole(authorization, 'user')
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
        cors: {
            credentials: true,
            origin: ['http://localhost:5000', 'http://localhost:8000']
        }
    },
    async ({ port }) => {
        console.log(`Server ready at: http://localhost:${port}`)
        const [adminsCount] = await Promise.all([prisma.admin.count()])
        if (adminsCount === 0) {
            const password = await bcrypt.hash('lottery', 10)
            await prisma.admin.create({
                data: {
                    email: 'info@itkitchen.su',
                    password
                }
            })
        }
    }
)
