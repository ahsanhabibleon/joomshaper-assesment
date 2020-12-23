import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemCard } from '../../../itemTypes';
import PotoSettings from './PhotoSettings'
import { useDispatch } from 'react-redux'
import { removePhotoFromCanvas } from '../../../redux/actions/addNewPhotoToCanvasActions'
import './CanvasImgCard.scss'

const CanvasImgCard = ({ id, imgSrc, filterSettings, imgIndex, index, moveCard }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemCard.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [forbidDrag, setForbidDrag] = useState(false);
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemCard.CARD, id, index },
        canDrag: !forbidDrag,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                localStorage.setItem("monitor", JSON.stringify(monitor))
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));


    const dispatch = useDispatch()

    const [modalOpen, setModalOpen] = useState(false)

    const deletePhoto = (id) => {
        if (window.confirm("Do you realy want to delete this photo?")) {
            dispatch(removePhotoFromCanvas(id))
        }
    }

    const openPhotoSettings = () => {
        setModalOpen(!modalOpen)
    }

    const setModalStatus = (payload) => {
        setModalOpen(payload)
    }

    const onToggleForbidDrag = useCallback(() => {
        !modalOpen ? setForbidDrag(false) : setForbidDrag(true)
    }, [modalOpen]);

    useEffect(() => {
        onToggleForbidDrag()
    }, [modalOpen])

    return (
        <div className={"canvasImgCard" + (modalOpen ? ' modalOpen' : '')} id={imgIndex}>
            <div id={imgIndex}>
                <div className="canvasImgCard__imgContainer" ref={ref} className={'canvasImgCard__draggableImg' + (isDragging ? ' isActive' : '')}>
                    <img style={{ filter: `brightness(${filterSettings.brightness}) contrast(${filterSettings.contrast}%) invert(${filterSettings.invert}%) grayscale(${filterSettings.grayscale}%)` }} src={imgSrc} alt="..." width="278" height="400" />
                </div>

                <div className="canvasImgCard__btnContainer">
                    <button className="canvasImgCard__btnSettings" onClick={openPhotoSettings}>
                        <img src="/settings.svg" alt="" />
                    </button>
                    <button className="canvasImgCard__btnSettings" onClick={() => deletePhoto(id)}>
                        <img src="/delete.svg" alt="" />
                    </button>
                </div>
                {
                    modalOpen && <PotoSettings imgSrc={imgSrc} isModalOpen={modalOpen} getModalStatus={setModalStatus} imgIndex={imgIndex} />
                }
            </div>
        </div>
    );
};

export default CanvasImgCard
