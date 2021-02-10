export const loadState = key => {
    try {
        const serializedState = localStorage.getItem(key)
        if (serializedState === null) {
            return []
        }
        return JSON.parse(serializedState)
    } catch (error) {
        return []
    }
}

export const saveState = (key, state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(key, serializedState)
    } catch (error) {
        console.log('saveState to local storage didnt work')
    }
}