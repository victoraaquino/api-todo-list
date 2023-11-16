import { fastify } from 'fastify'
import { DatabaseMemory } from "./database-memory.js";

const server = fastify()
const database = new DatabaseMemory();

server.post('/todo', (request, reply) => {
    const { description, checked } = request.body

    database.create({
        description,
        checked
    })

    return reply.status(201).send()
})

server.get('/todo', (request) => {
    const id = request.query.id
    const items = database.list(id)
    return items
})

server.put('/todo/:id', (request, reply) => {
    const itemId = request.params.id
    const { description, checked } = request.body

    database.update(itemId, {
        description,
        checked
    })

    return reply.status(204).send()
})

server.delete('/todo/:id', (request, reply) => {
    const itemId = request.params.id
    database.delete(itemId)

    return reply.status(204).send()
})

server.listen({
    port: 3333
})