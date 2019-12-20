export function notifications(state = {}, action) {
    switch (action.type) {
        case 'SHOW_ALERT': {
            return {
                title: action.title,
                text: action.text,
                active: true,
                level: action.level
            }
        }
        case 'HIDE_ALERT': {
            return {
                active: false
            }
        }
        default:
            return state
    }
}