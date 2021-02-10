const deleteItemList = (itemList, saveItemList) => store => next => action => {
    if (action.type === "items/itemDeleted") {
        const newItemList = itemList.filter(item => item.id !== action.payload)
        saveItemList('itemList', newItemList)
    }
    return next(action)
}

export default deleteItemList
