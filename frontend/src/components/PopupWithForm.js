import React from 'react';

function PopupWithForm({ title, name, children, onClose, isOpen, buttonText, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>

                <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__button popup__button_type_save" type="submit">{buttonText}</button>
                </form>

                <button className="popup__button popup__button_type_close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;