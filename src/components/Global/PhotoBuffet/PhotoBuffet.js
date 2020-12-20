import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPhotos } from '../../../redux/actions/photoActions'
import { createUseStyles } from 'react-jss'
import PhotoBox from '../PhotoBox/PhotoBox'

const useStyles = createUseStyles({
    photoBuffet: {
        width: '100%',
        height: '100%',
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
    }
})

function PhotoBuffet({ galleryPhotos, fetchPhotos }) {
    const classes = useStyles()
    useEffect(() => {
        fetchPhotos()
    }, [fetchPhotos])

    return galleryPhotos.loading ? (
        <h2>Loading</h2>
    ) : galleryPhotos.error ? (
        <h2>{galleryPhotos.error}</h2>
    ) : (
                <div className={classes.photoBuffet}>
                    { galleryPhotos.photos.map(photo => (
                        <PhotoBox name="Glass" key={photo.char_id} imgSrc={photo.img} imgAlt={photo.name} imgId={photo.char_id} />
                    ))}
                </div>
            )
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
