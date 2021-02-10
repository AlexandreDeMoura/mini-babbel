/* eslint-disable import/no-anonymous-default-export */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { loadState, saveState } from "../localStorage"
import saveItemList from "./middlewares/saveItemList"
import saveWordThemeList from "./middlewares/saveWordThemeList"
import saveSentenceThemeList from "./middlewares/saveSentenceThemeList"
import deleteItemList from "./middlewares/deleteItemList"
import reducer from "./reducer"


export default function () {
    const itemList = loadState('itemList')
    const wordThemeList = loadState('wordThemeList')
    const sentenceThemeList = loadState('sentenceThemeList')
    return configureStore({
        reducer,
        preloadedState: {
            items: {
                list: itemList,
                itemForm: {
                    isFormOpen: false,
                    isAdding: null,
                    itemToEditId: null
                },
                isWord: true
            },
            themes: {
                wordList: wordThemeList,
                sentenceList: sentenceThemeList,
                selectedThemes: [],
                isThemeFormOpened: false
            }
        },
        middleware: [
            ...getDefaultMiddleware(),
            saveItemList(itemList, saveState),
            saveWordThemeList(wordThemeList, saveState),
            saveSentenceThemeList(sentenceThemeList, saveState),
            deleteItemList(itemList, saveState)
        ]
    })
}