import React from 'react'
import DropZone from '../../Global/DropZone/DropZone'
import PhotoContainer from '../../Global/PhotoContainer/PhotoContainer'
import { createUseStyles } from 'react-jss'
// import DropZone from '../../Global/DropZone/DropZone'

const useStyles = createUseStyles({
    canvas: {
        width: '100%',
        background: "#F4F7FA",
        padding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 390,
        }
    },
    canvasInner: {
        background: '#fff',
        borderRadius: 8,
        padding: 35,
    }
})

function Canvas() {
    const classes = useStyles()
    return (
        <div className={classes.canvas}>
            <div className={classes.canvasInner}>
                <DropZone>
                    <PhotoContainer />
                </DropZone>
            </div>
        </div>
    )
}

export default Canvas
