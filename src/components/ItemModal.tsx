import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from "react-redux"
import { formClosed, getItemById, getItemToEditId, itemAdded, itemEdited } from '../store/items'
import { Word } from '../wordLists'
import { addSentenceTheme, addWordTheme } from '../store/themes'

const useStyles = makeStyles(theme => ({
    main: {
        position: 'fixed',
        width: 350,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
        padding: '45px 30px',
        borderRadius: 5,
        backgroundColor: 'white',
        boxShadow: '0px 0px 2px 0px #bbdefb'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 100
    },
    input: {
        width: 'calc(100% - 14px)',
        border: 'solid 1px black',
        marginBottom: 20,
        padding: 7,
        fontSize: 15,
        '&:focus': {
            border: 'solid 2px black',
            padding: 6,
            outline: 'none'
        }
    },
    radioContainer: {
        marginBottom: 30,
        display: 'flex',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    submitButton: {
        padding: 6,
        backgroundColor: 'white',
        border: 'solid 1.5px black',
        borderRadius: 5,
        cursor: 'pointer',
        fontSize: 16,
        transition: 'transform .3s',
        '&:hover': {
            transform: 'scale(1.05)',
        }
    },
    cancelButton: {
        marginRight: 10,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: 16,
        color: '#757575',
        transition: 'color .3s',
        '&:hover': {
            color: '#212121',
        }
    },
}))

export default function ItemModal(props: {
    isOpen: boolean
    isAdding: boolean
}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const itemToEditId = useSelector(getItemToEditId)
    const itemToEdit = useSelector(getItemById(itemToEditId))

    const portalContainer = document.getElementById("modal")!

    const [nativeWord, setNativeWord] = useState('')
    const [foreignWordPhonetic, setForeignWordPhonetic] = useState('')
    const [foreignWordWritten, setForeignWordWritten] = useState('')
    const [theme, setTheme] = useState('')
    const [isAWord, setIsAWord] = useState(true)

    useEffect(() => {
        if (itemToEdit) {
            setNativeWord(itemToEdit.nativeWord)
            setForeignWordPhonetic(itemToEdit.foreignWordPhonetic)
            setForeignWordWritten(itemToEdit.foreignWordWritten)
            setTheme(itemToEdit.theme)
            setIsAWord(itemToEdit.isAWord)
        }

    }, [itemToEdit])

    function generateId() {
        if (itemToEdit) {
            return itemToEditId
        } else {
            return `${nativeWord} - ${new Date()}`
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault()

        const id = generateId()
        const item: Word = {
            nativeWord,
            foreignWordPhonetic,
            foreignWordWritten,
            theme,
            isAWord,
            id
        }
        setNativeWord('')
        setForeignWordPhonetic('')
        setForeignWordWritten('')
        setTheme('')
        setIsAWord(true)

        if (itemToEdit) {
            dispatch(itemEdited(item))
        } else {
            dispatch(itemAdded(item))
        }
        if (isAWord) {
            if (theme) dispatch(addWordTheme(theme))

        } else {
            if (theme) dispatch(addSentenceTheme(theme))
        }
        dispatch(formClosed())
    }

    function displaySubmitButtonText() {
        if (!itemToEdit) {
            return 'Create new item'
        } else {
            return `Edit this ${itemToEdit.isAWord ? 'word' : 'sentence'}`
        }
    }

    if (!props.isOpen) return null

    return ReactDOM.createPortal(
        <>
            <div className={classes.modalOverlay}>
            </div>
            <form className={classes.main} onSubmit={handleSubmit}>
                <input
                    className={classes.input}
                    placeholder="Native word/sentence"
                    value={nativeWord}
                    required
                    onChange={(event) => setNativeWord(event.target.value)}
                />
                <input
                    className={classes.input}
                    placeholder="Foreign word/sentence phonetics"
                    value={foreignWordPhonetic}
                    onChange={(event) => setForeignWordPhonetic(event.target.value)}
                />
                <input
                    className={classes.input}
                    placeholder="Foreign word/sentence"
                    value={foreignWordWritten}
                    required
                    onChange={(event) => setForeignWordWritten(event.target.value)}
                />
                <input
                    className={classes.input}
                    placeholder="Theme"
                    value={theme}
                    onChange={(event) => setTheme(event.target.value)}
                />
                <div className={classes.radioContainer}>
                    <div>Choose your item type:</div>
                    <div style={{ margin: '0 12px' }}>
                        <input type="radio" checked={isAWord} onChange={() => setIsAWord(true)} />
                        <label>Word</label>
                    </div>
                    <div>
                        <input type="radio" checked={!isAWord} onChange={() => setIsAWord(false)} />
                        <label>Sentence</label>
                    </div>
                </div>
                <div className={classes.buttonContainer}>
                    <button
                        className={classes.cancelButton}
                        onClick={() => dispatch(formClosed())}
                    >
                        Cancel
                    </button>
                    <button className={classes.submitButton} type="submit">
                        {displaySubmitButtonText()}
                    </button>
                </div>
            </form></>,
        portalContainer
    )
}
