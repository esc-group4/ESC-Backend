// Requied sync to be in order as certain table is reqired first before another
export const sync = async () => {
    const modelsOrder = [
        'department',
        'designation',
        'staff',
        'skill'
    ];

    for (const modelName of modelsOrder) {
        await import(`../models/${modelName}.js`).then(({ table }) => table.sync());
    }
}
