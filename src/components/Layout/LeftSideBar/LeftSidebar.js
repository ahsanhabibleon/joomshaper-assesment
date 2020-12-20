import React from 'react'
import PhotoBuffet from '../../Global/PhotoBuffet/PhotoBuffet'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    leftSidebar: {
        width: 340,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#fff',
        padding: '5rem 0'
    }
})

function LeftSidebar() {
    const classes = useStyles();
    return (
        <div className={classes.leftSidebar}>
            <PhotoBuffet />
        </div>
    )
}

export default LeftSidebar
