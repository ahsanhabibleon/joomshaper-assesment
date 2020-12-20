import React from 'react';
import { addNewPhotoToCanvas } from '../../../redux/actions/addNewPhotoToCanvasActions'
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../itemTypes';
import { createUseStyles } from 'react-jss'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = createUseStyles({
    photoSingle: {
        margin: {
            bottom: 10
        },
        cursor: 'grab'
    },
    figure: {
        margin: 0,
        borderRadius: 8,
        border: '2px solid #DDE2E8',
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        display: 'block'
    }
})
const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
};
const Box = ({ name, imgSrc, imgId, imgAlt }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [{ isDragging }, drag] = useDrag({
        item: { name, type: ItemTypes.BOX },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                // alert(`You dropped ${imgSrc} into ${dropResult.name}!`);
                dispatch(addNewPhotoToCanvas(imgSrc))
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} style={{ ...style, opacity }}>
            <div className={classes.photoSingle}>
                <figure className={classes.figure}>
                    <img className={classes.img} src={imgSrc} alt={imgAlt} />
                </figure>
            </div>
        </div>
    );
};

export default Box
