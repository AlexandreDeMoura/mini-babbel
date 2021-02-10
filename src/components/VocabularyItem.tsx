import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Word } from '../wordLists'
import { Edit, VolumeUp, Delete } from '@material-ui/icons'
import { getItemSelectionStatus, itemDeleted, itemSelected, itemUnselected, openEditForm } from '../store/items'

const useStyles = makeStyles(theme => ({
    main: {
        marginBottom: 30,
        marginRight: 10,
        height: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        border: 'solid 1.75px black',
        fontWeight: 400,
        fontSize: 17,
        transition: 'height .3s'
    },
    hoveredItem: {
        height: 53
    },
    iconsContainer: {
        display: 'flex'
    }
}))

export default function VocabularyItem(props: {
    itemData: Word
}) {
    const classes = useStyles()
    const isSelected = useSelector(getItemSelectionStatus(props.itemData.id))
    const dispatch = useDispatch()

    function displayVocabulary() {
        const { nativeWord, foreignWordPhonetic, foreignWordWritten } = props.itemData

        let stringToReturn = `${nativeWord} -> `
        if (foreignWordPhonetic) {
            stringToReturn += foreignWordPhonetic
            if (foreignWordWritten) stringToReturn += ' -> '
        }
        if (foreignWordWritten) stringToReturn += foreignWordWritten
        return stringToReturn
    }

    return (
        <div
            onMouseEnter={() => dispatch(itemSelected({ id: props.itemData.id }))}
            onMouseLeave={() => dispatch(itemUnselected({ id: props.itemData.id }))}
            className={`${classes.main} ${isSelected ? classes.hoveredItem : ''}`}
        >
            {displayVocabulary()}
            {isSelected ? <div className={classes.iconsContainer}>
                <Edit
                    onClick={() => dispatch(openEditForm(props.itemData.id))}
                    style={{ marginRight: 10, cursor: 'pointer' }}
                />
                <VolumeUp style={{ marginRight: 10, cursor: 'pointer' }} />
                <Delete
                    onClick={() => dispatch(itemDeleted(props.itemData.id))}
                    style={{ cursor: 'pointer' }}
                />
            </div> : undefined}

        </div>
    )
}
