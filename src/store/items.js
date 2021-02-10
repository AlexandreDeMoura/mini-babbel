import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect"


const slice = createSlice({
    name: "items",
    initialState: {
        list: [],
        itemForm: {
            isFormOpen: false,
            isAdding: null,
            itemToEditId: null
        },
        isWord: true
    },
    reducers: {
        itemAdded: (items, action) => {
            items.list.push(action.payload)
        },
        itemEdited: (items, action) => {
            const { id: itemId } = action.payload
            const itemIndex = items.list.findIndex(item => item.id === itemId)
            items.list[itemIndex] = action.payload
        },
        itemDeleted: (items, action) => {
            //const { id: itemId } = action.payload
            const wordIndex = items.list.findIndex(item => item.id === action.payload)
            items.list.splice(wordIndex, 1)
        },
        itemSelected: (items, action) => {
            const { id: itemId } = action.payload
            const indexToSelect = items.list.findIndex(item => item.id === itemId)
            items.list[indexToSelect].isSelected = true
        },
        itemUnselected: (items, action) => {
            const { id: itemId } = action.payload
            const indexToUnSelect = items.list.findIndex(item => item.id === itemId)
            items.list[indexToUnSelect].isSelected = false
        },
        formOpened: items => {
            items.itemForm.isFormOpen = true
        },
        formClosed: items => {
            items.itemForm = {
                isFormOpen: false,
                isAdding: null,
                itemToEditId: null
            }
        },
        itemTypeChanged: (items, action) => {
            items.isWord = action.payload

        },
        openEditForm: (items, action) => {
            items.itemForm = {
                isFormOpen: true,
                isAdding: true,
                itemToEditId: action.payload
            }
        }
    }
})

export const {
    intializeItemList,
    itemAdded,
    itemDeleted,
    itemEdited,
    itemSelected,
    itemUnselected,
    formOpened,
    formClosed,
    itemTypeChanged,
    openEditForm
} = slice.actions
export default slice.reducer

export const getListItemByTheme = (theme, isAWord) =>
    createSelector(
        state => state.items,
        items => items.list.filter(item => item.isAWord === isAWord && (theme.includes(item.theme) || theme.length === 0))
    )
export const getFormState = createSelector(
    state => state.items,
    items => items.itemForm
)
export const getItemType = createSelector(
    state => state.items,
    items => items.isWord
)
export const getItemSelectionStatus = itemId =>
    createSelector(
        state => state.items,
        items => items.list.find(item => item.id === itemId).isSelected
    )
export const getItemById = itemId =>
    createSelector(
        state => state.items,
        items => items.list.find(item => item.id === itemId)
    )
export const getItemToEditId = createSelector(
    state => state.items,
    items => items.itemForm.itemToEditId
)