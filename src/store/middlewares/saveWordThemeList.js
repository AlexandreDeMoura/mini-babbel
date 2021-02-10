const saveWordThemeList = (itemWordTheme, saveWordThemeList) => store => next => action => {
    if (action.type === "themes/addWordTheme") {
        const newWordThemeList = [...itemWordTheme, action.payload]
        saveWordThemeList('wordThemeList', newWordThemeList)
    }
    return next(action)
}

export default saveWordThemeList
