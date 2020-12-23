import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import DropZone from '../../Global/DropZone/DropZone'
import PhotoContainer from '../../Global/PhotoContainer/PhotoContainer'
import './Canvas.scss'

function Canvas() {
    const changePhotoOption = useSelector(state => state.changePhotoOption)
    return (
        <div className={"canvas" + (changePhotoOption.status ? ' photoChangeOptionactive' : '')} >
            <div className="canvas__inner">
                <DropZone>
                    <PhotoContainer />
                </DropZone>
            </div>
        </div>
    )
}

export default Canvas
