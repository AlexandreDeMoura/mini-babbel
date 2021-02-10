import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import CheckIcon from '@material-ui/icons/Check'
import { makeStyles } from '@material-ui/core'
import { getItemType } from '../store/items'
import { closeThemeForm, getSentenceThemes, getWordThemes, submitSelectedThemes } from '../store/themes'

const useStyles = makeStyles(theme => ({
    main: {
        position: 'absolute',
        top: 80,
        left: '50%',
        transform: 'translate(-50%)',
        minWidth: 300,
        maxWidth: 500,
        minHeight: 200,
        padding: 15,
        boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.75)',
        backgroundColor: 'white'
    },
    themeContainer: {
        minHeight: 175,
        height: '80%',
        display: 'flex',
        flexWrap: 'wrap'
    },
    theme: {
        position: 'relative',
        marginRight: 10,
        width: 85,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        textOverflow: 'ellipsis',
        border: '2px solid black',
        cursor: 'pointer'
    },
    selectedTheme: {
        color: '#4caf50',
        border: '2px solid #4caf50'
    },
    icon: {
        position: 'absolute',
        left: 68,
        top: 20,
        fontSize: 16,
        color: '#4caf50'
    },
    buttonsContainer: {
        height: '20%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cancelButton: {
        marginRight: 10,
        fontSize: 16,
        border: 'none',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    submitButton: {
        padding: 5,
        fontSize: 16,
        border: 'solid 1.75px black',
        borderRadius: 2,
        backgroundColor: 'white',
        cursor: 'pointer'
    }
}))

export default function ThemesForm(props: {
    isOpen: boolean
}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isWord = useSelector(getItemType)
    const wordList = useSelector(getWordThemes)
    const sentenceList = useSelector(getSentenceThemes)
    const [themeList, setThemeList] = useState([])

    useEffect(() => {
        if (isWord) {
            setThemeList([...wordList.map(word => {
                return {
                    isSelected: false,
                }
            })])
        } else {
            setThemeList([...sentenceList.map(sentence => {
                return {
                    isSelected: false,
                }
            })])
        }
    }, [isWord, wordList, sentenceList])

    function displayThemesList() {
        if (isWord) {
            return wordList.map((theme, index) => <div
                className={`${classes.theme} ${themeList[index].isSelected ? `${classes.selectedTheme}` : ''}`}
                onClick={() => handleThemeSelection(index)}>
                {theme}
                {themeList[index].isSelected ? <CheckIcon className={classes.icon} /> : ''}
            </div>)
        } else {
            return sentenceList.map((theme, index) => <div
                className={`${classes.theme} ${themeList[index].isSelected ? `${classes.selectedTheme}` : ''}`}
                onClick={() => handleThemeSelection(index)}>
                {theme}
                {themeList[index].isSelected ? <CheckIcon className={classes.icon} /> : ''}
            </div>)
        }
    }

    function handleThemeSelection(index: number) {
        let newThemesList = themeList
        newThemesList[index].isSelected = !newThemesList[index].isSelected
        setThemeList([...newThemesList])
    }

    function handleSubmit() {
        let selectedThemes
        if (isWord) {
            selectedThemes = wordList.filter((wordTheme, index) => themeList[index].isSelected)
        } else {
            selectedThemes = sentenceList.filter((sentenceTheme, index) => themeList[index].isSelected)
        }

        dispatch(submitSelectedThemes([...selectedThemes]))
        dispatch(closeThemeForm())
    }

    if (!props.isOpen) return null
    return (
        <div className={classes.main}>
            <div className={classes.themeContainer}>
                {displayThemesList()}

            </div>
            <div className={classes.buttonsContainer}>
                <button
                    onClick={() => dispatch(closeThemeForm())}
                    className={classes.cancelButton}
                >
                    cancel
            </button>
                <button
                    onClick={handleSubmit}
                    className={classes.submitButton}
                >
                    Submit
            </button>
            </div>

        </div>
    )
}
