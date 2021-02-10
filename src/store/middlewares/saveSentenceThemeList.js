const saveSentenceThemeList = (itemSentenceTheme, saveSentenceThemeList) => store => next => action => {
    if (action.type === "themes/addSentenceTheme") {
        const newSentenceThemeList = [...itemSentenceTheme, action.payload]
        saveSentenceThemeList('sentenceThemeList', newSentenceThemeList)
    }
    return next(action)
}

export default saveSentenceThemeList
