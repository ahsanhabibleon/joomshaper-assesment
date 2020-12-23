import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter, _handleChangePhoto } from '../../../redux/actions/addNewPhotoToCanvasActions'
import './PhotoSettings.scss'

function PhotoSettings({ imgIndex, imgSrc, isModalOpen, getModalStatus }) {
    const [open, setOpen] = useState(isModalOpen);
    const [activeTab, setActiveTab] = useState('changeImg')
    const node = useRef();
    const dispatch = useDispatch();
    const canvasPhotos = useSelector(state => state.canvasPhotos)

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleChangePhoto = () => {
        dispatch(_handleChangePhoto(true, imgSrc))
    }
    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        setOpen(false);
        getModalStatus(false);
        dispatch(_handleChangePhoto(false, imgSrc))
    };
    const handleActiveTab = (payload) => {
        setActiveTab(payload)
    }
    const changeSettings = (payload, filterType, imgIndex) => {
        dispatch(changeFilter(payload, filterType, imgIndex))
    }

    return (
        <div className="photoSettings" ref={node}>
            <div className="photoSettings__tabNav">
                <button className={'tabBtn' + (activeTab === 'changeImg' ? ' is-active' : '')} onClick={() => handleActiveTab('changeImg')}>Image</button>
                <button className={'tabBtn' + (activeTab === 'filter' ? ' is-active' : '')} onClick={() => handleActiveTab('filter')}>Filter</button>
            </div>
            <div className="photoSettings__tabPanel">
                {activeTab === 'changeImg' && (
                    <div className="photoSettings__tab__changeImg">
                        <img className="photoSettings__imgThumb" src={imgSrc} alt="..." />
                        <button className="changeImgBtn" onClick={handleChangePhoto}>Change Photo</button>
                    </div>
                )}

                {activeTab === 'filter' && (
                    <div className="photoSettings__tab__changeFilter">
                        <div className="filter">
                            <label htmlFor="invert"><img src="/img/invert.svg" alt="" /></label>
                            <input type="range" id="invert" onChange={(e) => changeSettings(e.target.value, 'invert', imgIndex)} value={canvasPhotos[imgIndex].filterSettings.invert} min="0" max="100" step="1" />
                            <div className="filterVal">
                                {canvasPhotos[imgIndex].filterSettings.invert} %
                            </div>
                        </div>

                        <div className="filter">
                            <label htmlFor="contrast"><img src="/img/contrast.svg" alt="" /></label>
                            <input type="range" id="contrast" onChange={(e) => changeSettings(e.target.value, 'contrast', imgIndex)} value={canvasPhotos[imgIndex].filterSettings.contrast} min="0" max="500" step="1" />
                            <div className="filterVal">
                                {canvasPhotos[imgIndex].filterSettings.contrast} %
                            </div>
                        </div>

                        <div className="filter">
                            <label htmlFor="brightness"><img src="/img/brightness.svg" alt="" /></label>
                            <input type="range" id="brightness" onChange={(e) => changeSettings(e.target.value, 'brightness', imgIndex)} value={canvasPhotos[imgIndex].filterSettings.brightness} min="0" max="5" step="0.01" />
                            <div className="filterVal">
                                {Math.floor(canvasPhotos[imgIndex].filterSettings.brightness * 100)} %
                            </div>
                        </div>

                        <div className="filter">
                            <label htmlFor="grayscale"><img src="/img/grayscale.svg" alt="" /></label>
                            <input type="range" id="grayscale" onChange={(e) => changeSettings(e.target.value, 'grayscale', imgIndex)} value={canvasPhotos[imgIndex].filterSettings.grayscale} min="0" max="100" step="1" />
                            <div className="filterVal">
                                {canvasPhotos[imgIndex].filterSettings.grayscale} %
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PhotoSettings
