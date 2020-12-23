import React from 'react';
import { addNewPhotoToCanvas } from '../../../redux/actions/addNewPhotoToCanvasActions'
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../itemTypes';
import { createUseStyles } from 'react-jss'
import { useDispatch } from 'react-redux'
import './PhotoBox.scss'

const useStyles = createUseStyles({
    photoSingle: {
        borderRadius: 8,
        border: '2px solid #DDE2E8',
        overflow: 'hidden',
        margin: {
            bottom: 10
        },
        cursor: 'grab'
    },
    figure: {
        margin: 0,
    },
    img: {
        width: '100%',
        display: 'block'
    }
})

const Box = ({ name, imgSrc, imgId, imgIndex, imgAlt }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [{ isDragging }, drag] = useDrag({
        item: { name, type: ItemTypes.BOX },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                // alert(`You dropped ${imgSrc} into ${dropResult.name}!`);
                dispatch(addNewPhotoToCanvas(imgSrc, imgIndex))
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div className={classes.photoSingle}>
            <div ref={drag} className={"boxDraggable" + (isDragging ? ' is-dragging' : '')}>
                <figure className={classes.figure}>
                    <img className={classes.img} src={imgSrc} alt={imgAlt} width="280" height="400" />
                </figure>
            </div>
        </div>
    );
};

export default Box
