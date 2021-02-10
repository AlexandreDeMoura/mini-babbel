import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getItemType, itemTypeChanged } from '../store/items'
import { submitSelectedThemes } from '../store/themes'

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        marginBottom: 10,
        fontSize: 17
    },
    separation: {
        margin: '0 10px',
        fontSize: 17
    },
    selected: {
        fontWeight: 500
    },
    word: {
        cursor: 'pointer',
    }
}))

export default function VocabularyMenu() {
    const classes = useStyles()
    const itemType = useSelector(getItemType)
    const dispatch = useDispatch()

    function handleClick(isWord: boolean) {
        dispatch(itemTypeChanged(isWord))
        dispatch(submitSelectedThemes([]))
    }

    return (
        <div className={classes.main}>
            <div
                onClick={() => handleClick(true)}
                className={`${classes.word} ${itemType ? classes.selected : ''}`}
            >
                Words
            </div>
            <div className={classes.separation}> | </div>
            <div
                onClick={() => handleClick(false)}
                className={`${classes.word} ${itemType ? '' : classes.selected}`}
            >
                Sentences
            </div>
        </div>
    )
}
