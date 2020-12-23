import React from 'react';
import { addNewPhotoToCanvas } from '../../../redux/actions/addNewPhotoToCanvasActions'
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../itemTypes';
import { useDispatch } from 'react-redux'
import './PhotoBox.scss'

const Box = ({ name, imgSrc, imgIndex, imgAlt }) => {
    const dispatch = useDispatch()

    const [{ isDragging }, drag] = useDrag({
        item: { name, type: ItemTypes.BOX },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                dispatch(addNewPhotoToCanvas(imgSrc, imgIndex))
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div className="photoSingle">
            <div ref={drag} className={"boxDraggable" + (isDragging ? ' is-dragging' : '')}>
                <figure>
                    <img src={imgSrc} alt={imgAlt} width="280" height="400" />
                </figure>
            </div>
        </div>
    );
};

export default Box
