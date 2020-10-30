const { Generator } = require('@paljs/generator')
const excludeQueriesAndMutations = ['upsertOne', 'updateMany', 'deleteMany']
new Generator(
    { name: 'sdl', schemaPath: './prisma/schema.prisma' },
    { javaScript: true, excludeQueriesAndMutations }
).run()
