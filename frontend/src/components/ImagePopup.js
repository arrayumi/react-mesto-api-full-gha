import React from 'react';

function ImagePopup(props) {
    
    return (
        <div className={`popup popup_type_image ${props.card.name ? "popup_opened" : ""}`}>
            <div className="popup__image-container">
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <p className="popup__image-caption">{props.card.name}</p>
                <button className="popup__button popup__button_type_close" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;