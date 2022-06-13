import React from 'react';
import './style.css';
import '../../style/main.css';

const GalleryItem = (props) => {
    const {
        img,
    } = props;

    return <div className={'galleryItem'}>
        <img src={img} alt="" />
    </div>;
};

export default GalleryItem;
