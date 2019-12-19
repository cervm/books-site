export function books(state = [], action) {
    switch (action.type) {
        case 'ADD_BOOK': {
            const book = {
                id: action.id,
                title: action.title,
                author: action.author,
                category: action.category,
                price: action.price,
                seller: action.seller,
            };
            return [...state, book];
        }
        default:
            return state;
    }
}