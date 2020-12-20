import React, { useState, useCallback, useEffect } from 'react';
import { Card } from './Card';
import update from 'immutability-helper';
import { useSelector, useDispatch } from 'react-redux'
import { removePhotoFromCanvas } from '../../../redux/actions/addNewPhotoToCanvasActions'

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    photoContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    sortableCard: {
        width: "100%",
        maxWidth: 300,
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
    photoSingle: {
        position: 'relative',
        '&:hover $btnContainer': {
            opacity: 1,
            visibility: 'visible',
        }
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
    }
})
const PhotoContainer = () => {
    const classes = useStyles()
    const canvasPhotos = useSelector(state => state.canvasPhotos)

    const dispatch = useDispatch()

    useEffect(() => {
        setCards(canvasPhotos)
    }, [canvasPhotos])

    const [cards, setCards] = useState(canvasPhotos);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [cards]);

    const deletePhoto = (id) => {
        if (window.confirm("Do you realy want to delete this photo?")) {
            dispatch(removePhotoFromCanvas(id))
        }
    }
    const editPhotoSettings = (id) => {
        console.log(id)
    }

    return (
        <div className={classes.photoContainer}>
            {cards.map((card, i) =>
                <div key={card.id} className={classes.photoSingle}>
                    <Card className={classes.sortableCard} index={i} id={card.id} imgSrc={card.imgSrc} moveCard={moveCard} />

                    <div className={classes.btnContainer}>
                        <button className={classes.btn} onClick={() => editPhotoSettings(card.id)}>
                            <img src="/settings.svg" alt="" />
                        </button>
                        <button className={classes.btn} onClick={() => deletePhoto(card.id)}>
                            <img src="/delete.svg" alt="" />
                        </button>
                    </div>

                </div>

            )}

        </div>
    );
};

export default PhotoContainer
