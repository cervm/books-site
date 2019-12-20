export function categories(state = [], action) {
    switch (action.type) {
        case 'ADD_CATEGORY': {
            const category = {
                alias: action.alias,
                name: action.name,
            };
            return [...state, category];
        }
        default:
            return state;
    }
}