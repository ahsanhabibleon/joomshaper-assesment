import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemCard } from '../../../itemTypes';
import { createUseStyles } from 'react-jss'
import PotoSettings from './PhotoSettings'
import { useDispatch } from 'react-redux'
import { removePhotoFromCanvas } from '../../../redux/actions/addNewPhotoToCanvasActions'

const useStyles = createUseStyles({
    imgContainer: {
        width: '100%',
        maxWidth: 300
    },
    img: {
        width: '100%'
    },
    btnContainer: {
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(74,82,87, .8)',
        padding: '1rem 0',
        borderRadius: 20,
        position: 'absolute',
        top: 20,
        left: 20,
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity .5s',
    },
    btn: {
        padding: " 0 2rem",
        background: 'transparent',
        border: 'none',
        display: 'block',
        outline: 'none',
        cursor: 'pointer',
        '& img': {
            display: 'block'
        },
        '&:first-child': {
            borderRight: '1px solid white'
        }
    },
    photoSettingsModal: {
        position: 'absolute',
        top: 80,
        left: 50
    },
    editableImageBlock: {
        position: 'relative',
        '&:hover $btnContainer': {
            opacity: 1,
            visibility: 'visible',
        }
    },
})
export const Card = ({ id, imgSrc, index, moveCard }) => {
    const classes = useStyles()
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemCard.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemCard.CARD, id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));


    const dispatch = useDispatch()

    const deletePhoto = (id) => {
        if (window.confirm("Do you realy want to delete this photo?")) {
            dispatch(removePhotoFromCanvas(id))
        }
    }
    const openPhotoSettings = (id) => {
        setModalOpen(!modalOpen)
    }

    const [modalOpen, setModalOpen] = useState(false)

    const setModalStatus = (payload) => {
        setModalOpen(payload)
    }

    return (
        <div className={classes.editableImageBlock}>
            <div className={classes.imgContainer} ref={ref} style={{ opacity }}>
                <img className={classes.img} src={imgSrc} alt="" />
            </div>
            <div className={classes.btnContainer}>
                <button className={classes.btn} onClick={() => openPhotoSettings(id)}>
                    <img src="/settings.svg" alt="" />
                </button>
                <button className={classes.btn} onClick={() => deletePhoto(id)}>
                    <img src="/delete.svg" alt="" />
                </button>
            </div>

            {
                modalOpen && <PotoSettings isModalOpen={modalOpen} getModalStatus={setModalStatus} />
            }

        </div>
    );
};
