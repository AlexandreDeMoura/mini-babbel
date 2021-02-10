import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import ItemModal from './ItemModal'
import VocabularyItem from './VocabularyItem'
import { formOpened, getFormState, getItemType, getListItemByTheme, intializeItemList } from '../store/items'
import { getIsThemeFormOpened, getSelectedThemes, openThemeForm } from '../store/themes'
import ThemesForm from './ThemesForm'

const useStyles = makeStyles(theme => ({
    main: {
        position: 'relative',
        width: '70%',
        height: '70%',
        border: '2px solid black',
        overflowY: 'scroll'
    },
    add: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 40,
        cursor: 'pointer'
    },
    theme: {
        marginTop: 10,
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translate(-50%)',
        padding: 10,
        border: '2px solid black',
        fontWeight: 500,
        cursor: 'pointer'
    },
    itemsContainer: {
        padding: 60,
        paddingTop: 80,
        paddingBottom: 30,
        display: 'flex',
        flexWrap: 'wrap',
    }
}))

export default function VocabularyContainer() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const themes = useSelector(getSelectedThemes)
    const isWord = useSelector(getItemType)
    const listOfItems = useSelector(getListItemByTheme(themes, isWord))
    const itemForm = useSelector(getFormState)
    const isThemeFormOpened = useSelector(getIsThemeFormOpened)

    function displaySelectedThemes() {
        let textToDisplay = ''

        switch (themes.length) {
            case 0:
                textToDisplay = 'All'
                break
            case 1:
                textToDisplay = `${themes[0]}`
                break
            case 2:
                textToDisplay = `${themes[0]}, ${themes[1]}`
                break
            default:
                textToDisplay = `${themes[0]}, ${themes[1]} and ${themes.length - 2} more`
                break
        }
        return textToDisplay
    }

    return (
        <div className={classes.main}>
            <Add className={classes.add} onClick={() => dispatch(formOpened())} />
            <div
                className={classes.theme}
                onClick={() => dispatch(openThemeForm())}
            >
                {displaySelectedThemes()}
            </div>
            <div className={classes.itemsContainer}>
                {listOfItems.map(item => <VocabularyItem itemData={item} />)}
            </div>
            <ItemModal isOpen={itemForm.isFormOpen} isAdding={itemForm.isAdding} />
            <ThemesForm isOpen={isThemeFormOpened} />
        </div>
    )
}
