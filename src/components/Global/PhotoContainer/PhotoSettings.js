import React, { useEffect, useState, useRef } from "react";
import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter, _handleChangePhoto } from '../../../redux/actions/addNewPhotoToCanvasActions'
import './PhotoSettings.scss'

const useStyles = createUseStyles({
    photoSettings: {
        width: 300,
        height: 400,
        padding: 20,
        background: '#fff',
        borderRadius: 8,
        position: 'absolute',
        top: 70,
        boxShadow: '0px 14px 40px rgba(15, 44, 71, 0.3)',
        zIndex: 99
    },
    tabImg: {
        width: '100%'
    }
})

function PhotoSettings({ imgIndex, imgSrc, isModalOpen, getModalStatus }) {
    const [open, setOpen] = useState(isModalOpen);
    const [activeTab, setActiveTab] = useState('changeImg')
    const node = useRef();
    const dispatch = useDispatch();
    const classes = useStyles()
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
        console.log(imgSrc)
    }
    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        setOpen(false);
        getModalStatus(false);
    };
    const handleActiveTab = (payload) => {
        setActiveTab(payload)
    }
    const changeSettings = (payload, filterType, imgIndex) => {
        dispatch(changeFilter(payload, filterType, imgIndex))
    }

    return (
        <div className={classes.photoSettings} ref={node}>
            <div className={classes.tabNav}>
                <button className={'tabBtn' + (activeTab === 'changeImg' ? ' is-active' : '')} onClick={() => handleActiveTab('changeImg')}>Image</button>
                <button className={'tabBtn' + (activeTab === 'filter' ? ' is-active' : '')} onClick={() => handleActiveTab('filter')}>Filter</button>
            </div>
            <div className={classes.tabBody}>
                {activeTab === 'changeImg' && (
                    <div className={classes.tabChageImg}>
                        <img className={classes.tabImg} src={imgSrc} alt="..." />
                        <button className={classes.changeImgBtn} onClick={handleChangePhoto}>Change Photo</button>
                    </div>
                )}

                {activeTab === 'filter' && (
                    <div className={classes.tabChangeFilter}>
                        <h2>Change Filter {imgIndex}</h2>
                        <div className="filter">
                            <label>Invert:</label>
                            <input type="range" id="invert" onChange={(e) => changeSettings(e.target.value, 'invert', imgIndex)} value={canvasPhotos[imgIndex].filterSettings.invert} min="0" max="100" step="1" />
                        </div>

                        <div className="filter">
                            <label>Contrast:</label>
                            <input type="range" id="contrast" onChange={(e) => changeSettings(e.target.value, 'contrast', imgIndex)} value={canvasPhotos[imgIndex].filterSettings.contrast} min="0" max="500" step="1" />
                        </div>

                        <div className="filter">
                            <label>Brightness:</label>
                            <input type="range" id="brightness" onChange={(e) => changeSettings(e.target.value, 'brightness', imgIndex)} value={canvasPhotos[imgIndex].filterSettings.brightness} min="0" max="6" step="0.01" />
                        </div>

                        <div className="filter">
                            <label>Grayscale:</label>
                            <input type="range" id="grayscale" onChange={(e) => changeSettings(e.target.value, 'grayscale', imgIndex)} value={canvasPhotos[imgIndex].filterSettings.grayscale} min="0" max="100" step="1" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PhotoSettings
