import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect"

const slice = createSlice({
    name: "themes",
    initialState: {
        wordList: [],
        sentenceList: [],
        selectedThemes: [],
        isThemeFormOpened: false
    },
    reducers: {
        addWordTheme: (themes, action) => {
            if (!themes.wordList.includes(action.payload)) themes.wordList.push(action.payload)
        },
        addSentenceTheme: (themes, action) => {
            if (!themes.sentenceList.includes(action.payload)) themes.sentenceList.push(action.payload)
        },
        openThemeForm: themes => {
            themes.isThemeFormOpened = true
        },
        closeThemeForm: themes => {
            themes.isThemeFormOpened = false
        },
        submitSelectedThemes: (themes, action) => {
            themes.selectedThemes = action.payload
        }
    }
})

export const {
    initializeWordTheme,
    initializeSentenceTheme,
    addWordTheme,
    addSentenceTheme,
    openThemeForm,
    closeThemeForm,
    submitSelectedThemes
} = slice.actions
export default slice.reducer

export const getWordThemes = createSelector(
    state => state.themes,
    themes => themes.wordList
)
export const getSentenceThemes = createSelector(
    state => state.themes,
    themes => themes.sentenceList
)
export const getSelectedThemes = createSelector(
    state => state.themes,
    themes => themes.selectedThemes
)
export const getIsThemeFormOpened = createSelector(
    state => state.themes,
    themes => themes.isThemeFormOpened
)