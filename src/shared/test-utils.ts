export function mockRepository<T extends { id: number }>(domain: any) {
    const entities: Array<T> = [];

    return {
        reset: () => {
            entities.splice(0, entities.length);
        },
        initialize: (count: number) => {
            for (let i = 0; i < count; i++) {
                entities.push({ id: i + 1 } as T);
            }
        },
        save: jest.fn().mockImplementation((entity) => {
            entity.id = entities.length + 1;
            entities.push(entity);
            return entity;
        }),
        find: jest.fn().mockImplementation(() => {
            return entities;
        }),
        findOne: jest.fn().mockImplementation((id) => {
            return entities[id - 1];
        }),
        delete: jest.fn().mockImplementation((id) => {
            delete entities[id - 1];
        }),
        update: jest.fn().mockImplementation((id, update) => {
            entities[id - 1] = Object.assign({}, entities[id - 1], update);
        }),
    };
}
