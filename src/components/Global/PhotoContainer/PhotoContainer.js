import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';
import { Card } from './Card';
import { useSelector } from 'react-redux'

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
})
const PhotoContainer = () => {
    const classes = useStyles()
    const canvasPhotos = useSelector(state => state.canvasPhotos)

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

    return (
        <div className={classes.photoContainer}>
            {cards.map((card, i) =>
                <div key={card.id} className={classes.photoSingle}>
                    <Card className={classes.sortableCard} index={i} id={card.id} imgSrc={card.imgSrc} moveCard={moveCard} /></div>
            )}
        </div>
    );
};

export default PhotoContainer
