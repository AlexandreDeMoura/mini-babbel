import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    main: {
        padding: 10,
        border: 'solid 2px black',
        cursor: 'pointer',
    },
}))

export default function SessionMenu(props: {
    sessionInfo: string[]
}) {
    const classes = useStyles()
    return (
        <div className={classes.main}>
            {`${props.sessionInfo[0]} -> ${props.sessionInfo[1]}`}
        </div>
    )
}
