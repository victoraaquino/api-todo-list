import { randomUUID } from "node:crypto";

export class DatabaseMemory {
    #items = new Map()

    list(id) {
        return Array.from(this.#items.entries())
            .map((itens) => {
                const id = itens[0]
                const data = itens[1]

                return {
                    id,
                    ...data
                }
            })
            .filter((item) => {
                if (id) {
                    return item.id === id
                }

                return true
            })
    }

    create(item) {
        const itemId = randomUUID()
        this.#items.set(itemId, item)
        return itemId;
    }

    update(id, item) {
        this.#items.set(id, item)
    }

    delete(id) {
        this.#items.delete(id)
    }
}