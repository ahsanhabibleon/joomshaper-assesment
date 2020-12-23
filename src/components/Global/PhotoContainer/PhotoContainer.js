import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';
import CanvasImgCard from './CanvasImgCard';
import { useSelector } from 'react-redux'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    photoContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        margin: -15
    },
    photoSingle: {
        width: 333,
        padding: 15
    },
})

const PhotoContainer = () => {
    const classes = useStyles()
    const canvasPhotos = useSelector(state => state.canvasPhotos)
    const [cards, setCards] = useState(canvasPhotos);

    useEffect(() => {
        setCards(canvasPhotos)
    }, [canvasPhotos])

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [cards]);

    return (
        <div className={classes.photoContainer}>
            {cards.map((card, i) =>
                <div key={card.id} className={classes.photoSingle}>
                    <CanvasImgCard index={i} imgIndex={i} id={card.id} imgSrc={card.imgSrc} filterSettings={card.filterSettings} moveCard={moveCard} />
                </div>
            )}
        </div>
    );
};

export default PhotoContainer
