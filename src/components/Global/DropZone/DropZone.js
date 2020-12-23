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
        <div ref={drop} className={"dropzone" + (isActive ? ' is-active' : '')}>
            <div className="dropzone__album-wrapper">
                {props.children}
            </div>
            {canvasPhotos.length > 0 ? (
                <div className={"dropbox" + (isActive ? ' is-active' : '')}>
                    Release to drop
                </div>

            ) : (
                    <div className="dropbox__initial">
                        dragg photos here
                    </div>
                )}
        </div>
    );
};

export default DropZone
