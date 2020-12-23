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
        zIndex: 9
    },
    title: {
        fontSize: 20,
        lineHeight: "2.3rem",
        color: '#4A5257',
        padding: {
            top: 50,
            right: 20,
            bottom: 25,
            left: 20
        },
        margin: 0
    }
})

function LeftSidebar() {
    const classes = useStyles();
    return (
        <div className={classes.leftSidebar}>
            <h3 className={classes.title}>Media Panel</h3>
            <PhotoBuffet />
        </div>
    )
}

export default LeftSidebar
