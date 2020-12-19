import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPhotos } from '../../../redux/actions/photoActions'

function PhotoBuffet({ galleryPhotos, fetchPhotos }) {
    useEffect(() => {
        fetchPhotos()
    }, [fetchPhotos])

    return galleryPhotos.loading ? (
        <h2>Loading</h2>
    ) : galleryPhotos.error ? (
        <h2>{galleryPhotos.error}</h2>
    ) : (
                <div className="PhotoBuffet">
                    { galleryPhotos.photos.map(photo => (
                        <div className="PhotoBuffet__photo" key={photo.char_id}>
                            <figure className="PhotoBuffet__figure">
                                <img src={photo.img} alt={photo.name} />
                            </figure>
                        </div>
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
