import { fastify } from 'fastify';
import { DatabaseMemory } from "./database-memory.js";
import constants from './constants.js';

const server = fastify();
const database = new DatabaseMemory();

server.post('/todo', (request, reply) => {
    const { description, checked } = request.body

    if (!description || typeof checked === 'undefined'){
        return reply.status(400).send({
            error: constants.MISSING_VARIABLES
        });
    }

    const newItem ={
        description,
        checked
    };

    const itemId = database.create(newItem)

    return reply.status(201).send({
        id: itemId,
        ...newItem
    });
});

server.get('/todo', (request) => {
    const id = request.query.id;
    const items = database.list(id);
    return items;
})

server.put('/todo/:id', (request, reply) => {
    const itemId = request.params.id

    if (!itemId) {
        return reply.status(400).send({
            error: constants.MISSING_ID
        });
    }

    const { description, checked } = request.body;
    const currentItem = database.list(itemId);

    const updatedDescription = description !== undefined ? description : currentItem.description;
    const updatedChecked = checked !== undefined ? checked : currentItem.checked;

    database.update(itemId, {
        updatedDescription,
        updatedChecked
    })

    return reply.status(200).send({
        id: itemId,
        message: constants.CHANGED_TASK
    });
})

server.delete('/todo/:id', (request, reply) => {
    const itemId = request.params.id

    if (!itemId) {
        return reply.status(400).send({
            error: constants.MISSING_ID
        });
    }

    database.delete(itemId);

    return reply.status(200).send({
        id: itemId,
        message: constants.DELETED_TASK
    });
})

server.listen({
    port: 3333
});
