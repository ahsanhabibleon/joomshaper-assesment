import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { fetchPhotos } from '../../../redux/actions/photoActions'
import { createUseStyles } from 'react-jss'
import PhotoBox from '../PhotoBox/PhotoBox'
import { replaceImgSrc, _handleChangePhoto } from '../../../redux/actions/addNewPhotoToCanvasActions'


const useStyles = createUseStyles({
    photoBuffet: {
        width: '100%',
        height: 'calc(100% - 98px)',
        overflowX: 'hidden',
        padding: '0 2rem'
    },
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
    },
})

function PhotoBuffet({ galleryPhotos, fetchPhotos }) {
    const classes = useStyles()
    const photoBuffetRef = useRef()
    const dispatch = useDispatch()
    const changePhotoOption = useSelector(state => state.changePhotoOption)

    useEffect(() => {
        addEventListenerToBuffet()
    }, [changePhotoOption])

    useEffect(() => {
        fetchPhotos()
    }, [])

    const addChangePhotoEventListener = (e) => {
        dispatch(replaceImgSrc(changePhotoOption.imgSrc, e.target.src))
        dispatch(_handleChangePhoto(false, changePhotoOption.imgSrc))
    }
    const addEventListenerToBuffet = () => {
        changePhotoOption.status === true ? (
            photoBuffetRef.current.addEventListener('click', addChangePhotoEventListener)
        ) : (
                photoBuffetRef.current.removeEventListener('click', addChangePhotoEventListener)
            )
    }

    return <div className={classes.photoBuffet} ref={photoBuffetRef}>
        {galleryPhotos.photos.map(photo => (
            <PhotoBox name="Glass" key={photo.char_id} imgSrc={photo.img} imgAlt={photo.name} imgId={photo.char_id} imgIndex={photo.char_id - 1} />
        ))}
    </div>
}

const mapStateToProps = state => {
    return {
        galleryPhotos: state.photos
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchPhotos: () => dispatch(fetchPhotos())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhotoBuffet)
