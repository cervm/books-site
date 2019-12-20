export function user(state = {}, action) {
    switch (action.type) {
        case 'ADD_USER_CRED': {
            return {username: action.username};
        }
        case 'REMOVE_USER_CRED': {
            return {username: ""};
        }
        default:
            return state
    }
}