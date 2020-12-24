import React from 'react';
import { useSelector } from 'react-redux'
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../itemTypes';
import './DropZone.scss'

const DropZone = (props) => {
    const canvasPhotos = useSelector(state => state.canvasPhotos)
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: () => {
            return { name: 'DropZone' }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = canDrop && isOver;
    return (
        <div data-test="DropZone" ref={drop} className={"dropzone" + (isActive ? ' is-active' : '')}>

            {canvasPhotos.length > 0 ? (
                <>
                    <div className="dropzone__album-wrapper">
                        {props.children}
                    </div>
                    <div className={"dropbox" + (isActive ? ' is-active' : '')}>
                        <div className="dropbox__imgContainer">
                            <img src="/img/dropzone-icon.svg" alt="..." />
                        </div>
                        <p>Release to drop</p>
                    </div>
                </>

            ) : (
                    <div className={"dropbox__initial" + (isActive ? ' is-active' : '')}>
                        <div className="dropbox__imgContainer">
                            <img src="/img/dropzone-icon.svg" alt="..." />
                        </div>
                        <p>Drop an image from Media Panel</p>
                    </div>
                )}
        </div>
    );
};

export default DropZone
