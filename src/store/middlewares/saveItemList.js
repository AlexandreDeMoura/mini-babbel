const saveItemList = (itemList, saveItemList) => store => next => action => {
    if (action.type === "items/itemAdded") {
        const newItemList = [...itemList, action.payload]
        saveItemList('itemList', newItemList)
    }
    return next(action)
}

export default saveItemList
